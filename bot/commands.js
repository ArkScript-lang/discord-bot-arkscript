'use strict';

require('dotenv').config();

const utils = require('./utils.js');
const admin = require('./admin.js');
const tutos = require('./tutorials.js');
const fs = require('fs');

/**
 * Help message on all the available commands
 */
function help() {
    return {
        embed: {
            color: 0x6666ff,
            title: 'Help',
            description: 'Everyone loves documentation!',
            fields: [
            {
                name: 'Prefix',
                value: process.env.PREFIX,
            },
            {
                name: 'run',
                value: 'Will run a piece of code, which can fit on multiple lines',
            },
            {
                name: 'tutorials',
                value: 'display a list of avaialable tutorials',
            },
            {
                name: 'arkscript',
                value: 'Get details about the project',
            }],
            footer: {
                text: 'Made by SuperFola#5854',
            }
        }
    };
}

/**
 * Running ArkScript code through docker
 * Each message is saved in a specific file under /tmp/tmp{msg id}.ark, then sent to the container
 * The return values (error code, stderr, stdout) are then sent back on discord
 * 
 * @param {*} msg 
 */
function runCode(msg) {
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
                    icon_url: msg.author.avatarURL()
                },
            }});
    });

    utils.safeExecAsync(
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
                }],
                footer: {
                    text: `Requested by ${msg.author.tag}`,
                    icon_url: msg.author.avatarURL()
                },
            }});

            // remove temp file
            fs.unlinkSync(filename);
        });
}

function arkscript() {
    return {
        embed: {
            title: 'ArkScript',
            description: 'A small, fast, functional and scripting language for video games',
            color: 0x6666ff,
            fields: [
                {
                    name: 'GitHub',
                    value: 'https://github.com/ArkScript-lang',
                },
                {
                    name: 'Website',
                    value: 'https://arkscript-lang.github.io',
                },
            ],
            footer: {
                text: 'Made by SuperFola#5854',
            }
        }
    };
}

module.exports = client => {
    client.on('message', msg => {
        if (!utils.isCommand(msg))  // check if it starts with our prefix
            return;

        const args = utils.getCmdArgs(msg);
        const cmd  = args.shift().toLowerCase();

        if (utils.isOwner(msg.author) && admin.checkAndRunAdminCmds(client, msg, cmd, args)) ;
        else if (cmd === 'help')          msg.channel.send(help());
        else if (cmd.startsWith('tuto'))  tutos.handle(client, msg, cmd, args);
        else if (cmd === 'run')           runCode(msg);
        else if (cmd === 'arkscript')     msg.channel.send(arkscript());
    });
};
