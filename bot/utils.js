'use strict';

require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { exec } = require('child_process');

/**
 * Safe exec (some preconfigured options)
 * @param {*} command shell command to executed
 * @param {*} callback the callback when the command is executed, like so (error, stdout, stderr) => {}
 */
function safeExecAsync(command, callback) {
    let options = {
        cwd: '/tmp',
        env: {},
        maxBuffer: 1024,
    };

    // add a timeout
    if (command.startsWith('docker run'))
        options.timeout = 10000;  // milliseconds

    return exec(command, options, callback);
}

exports.safeExecAsync = safeExecAsync;


exports.loadCommands = function(client) {
    client.commands = new Discord.Collection();

    let save = {
        'commands': {},
        'activity': {},
    };
    if (fs.existsSync('./save.json')) {
        save = JSON.parse(fs.readFileSync('./save.json'));
    }

    fs.readdirSync('./bot/commands/').forEach(dir => {
        const commands = fs.readdirSync(`./bot/commands/${dir}/`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            const pull = require(`./commands/${dir}/${file}`);

            pull.help.category = dir;
            pull.help.name = file.split('.')[0];

            let cmd = save['commands'][pull.help.name];
            cmd = cmd === undefined || cmd === null ? {'enabled': true} : cmd;
            pull.help.enabled = cmd['enabled'];

            if (pull.help.name)
                client.commands.set(pull.help.name, pull);
        }
    });
}