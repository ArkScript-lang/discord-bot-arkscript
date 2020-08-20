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
        `docker run -v ${filename}:/tmp/tmp.ark:z -i arkscript/nightly:latest /tmp/tmp.ark`,

        (error, stdout, stderr) => {
            if (error && error.message.startsWith('Command failed:'))
                error.message = 'Script was abruptly stopped, probably because it met a timeout error';

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
        });
};

exports.help = {
    description: 'Run ArkScript code using docker containers',
    usage: 'run <code>',
};