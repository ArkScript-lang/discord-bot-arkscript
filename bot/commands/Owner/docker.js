'use strict';

const { exec } = require('child_process');

exports.run = (client, msg, args) => {
    let command = `docker ${args.join(' ')}`;

    exec(
        command,
        (error, stdout, stderr) => {
            msg.channel.send({
                embed: {
                    title: 'Docker',
                    description: `Command: \`${command}\``,
                    color: error ? 0xff0000 : 0x00ff00,
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
                            value: `\`\`\`${stdout.trim().length !== 0 ? stdout : 'none'}\`\`\``,
                        },
                    ],
                    footer: {
                        text: `Required by ${msg.author.tag}`,
                        icon_url: msg.author.avatarURL(),
                    }
                }
            });
        }
    );
};

exports.help = {
    description: 'play with docker',
    usage: 'docker <mode> args...',
};