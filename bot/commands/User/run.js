'use strict';

require('dotenv').config();

const { safeExecAsync } = require('../../utils.js');
const fs = require('fs');

exports.run = (client, msg, args) => {
    // get code content
    let content = msg.content.substring(process.env.PREFIX.length + 3);

    // if no code, return an error
    if (content.trim().length === 0) {
        msg.channel.send({embed: {
            title: 'Error',
            description: 'No code provided',
            color: 0xff0000,
        }});
        return;
    }

    // generate file for the code
    let filename = `/tmp/tmp${msg.id}.ark`;
    let cidfile  = `/tmp/cid${msg.id}`;

    fs.writeFileSync(filename, content, function (err) {
        if (err)
            msg.channel.send({embed: {
                color: 0xff0000,
                title: 'IO error',
                description: 'Could save to temp file',
                footer: {
                    text: `Requested by ${msg.author.tag}`,
                    icon_url: msg.author.avatarURL(),
                },
            }});
    });

    safeExecAsync(
        `docker run -v ${filename}:/tmp/tmp.ark:z -i --cidfile ${cidfile} arkscript/nightly:latest /tmp/tmp.ark`,

        async (error, stdout, stderr) => {
            if (error && error.message.startsWith('Command failed:'))
                error.message = 'Script was abruptly stopped, probably because it met a timeout error';

            // check if container is still running
            safeExecAsync(
                `docker ps -q | grep $(cat ${cidfile} | head -c 12)`,
                (error, stdout, stderr) => {
                    if (error) msg.channel.send(`:x: Error while checking if container was still running: ${error.message}`);
                    if (stderr) msg.channel.send(`:x: stderr: ${stderr}`);
                    if (stdout.trim().length === 0)  // no container found
                        return;
                    else
                        safeExecAsync(`docker kill $(cat ${cidfile})`, (error, stdout, stderr) => {
                            if (error || stderr) msg.channel.send(`:x: Container still running, couldn't kill it`);
                            else msg.channel.send(`:white_check_mark: Container was still running but luckily we managed to catch it and imprison it`);
                        });
                });

            msg.channel.send({embed: {
                color: 0x6666ff,
                title: 'Result',
                // description: `Your script ran for ${(Date.now() - ts) * 1000}s`,
                fields: [
                    {
                        name: 'Error',
                        value: `${error ? error.message : 'none'}`,
                    },
                    {
                        name: 'stderr',
                        value: `${stderr ? stderr : 'none'}`,
                    },
                    {
                        name: 'stdout',
                        value: `${stdout.trim().length !== 0 ? stdout : 'none'}`,
                    }
                ],
                footer: {
                    text: `Requested by ${msg.author.tag}`,
                    icon_url: msg.author.avatarURL(),
                },
            }});

            // remove temp file
            fs.unlinkSync(filename);
            fs.unlinkSync(cidfile);
        });
};

exports.help = {
    description: 'Run ArkScript code using docker containers',
    usage: 'run <code>',
};