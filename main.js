'use strict';

require('dotenv').config();

const fs = require('fs');
const { exec } = require('child_process');
const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true,
});
const utils = require('./utils.js');


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log('================================');
    console.log('Downloading latest docker image');

    await exec(
        'docker pull arkscript/nightly:latest',
        {
            cwd: '/tmp',
            env: {},
            maxBuffer: 1024,
        },
        (error, stdout, stderr) => {
            if (error)
                console.log(error.message);
            if (stderr)
                console.log(stderr);
            console.log(stdout);
            console.log('================================');
            console.log('Update done');
        },
    );
});

client.on('message', msg => {
    if (!utils.isCommand(msg))
        return;
    
    const args = utils.getCmdArgs(msg);
    const cmd  = args.shift().toLowerCase();

    if (cmd === 'ping' && msg.author.id === process.env.OWNER) {
        msg.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: 'Pong',
                value: `${Math.round(client.ws.ping)} ms`,
            }],
        }});
    } else if (cmd === 'run') {
        let content = msg.content.substring(process.env.PREFIX.length + 3);
        if (content.trim().length === 0) {
            msg.channel.send({embed: {
                title: 'Error',
                description: 'No code provided',
                color: 0xff0000,
            }});
            return;
        }

        let filename = `/tmp/tmp${msg.id}.ark`;

        fs.writeFileSync(filename, content, function (err) {
            if (err)
                msg.channel.send({embed: {
                    color: 0xff0000,
                    title: 'IO error',
                    description: 'Could save to temp file',
                }});
        });

        exec(
            `docker run -v ${filename}:/tmp/tmp.ark:z -i arkscript/nightly:latest /tmp/tmp.ark`,
            {
                cwd: '/tmp',
                env: {},
                timeout: 10000,  // milliseconds
                maxBuffer: 1024, // bytes
            },
            async (error, stdout, stderr) => {
                if (error && error.message.startsWith('Command failed: docker run'))
                    error.message = 'Script was abruptly stopped, probably because it met a timeout error';

                try {
                    await msg.channel.send({embed: {
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
                        }],
                        footer: {
                            text: `Requested by ${msg.author.tag}`,
                            icon_url: msg.author.avatarURL()
                        },
                    }});
                    fs.unlinkSync(filename);
                } catch (e) {
                    msg.channel.send({embed: {
                        color: 0xff0000,
                        title: 'Error',
                        description: e.message,
                        fields: [{name: 'take this', value: 'it\'s dangerous to go alone'}],
                        footer: {
                            text: `Requested by ${msg.author.tag}`,
                            icon_url: msg.author.avatarURL()
                        },
                    }});
                }
            });
    }
});

client.login(process.env.TOKEN);
