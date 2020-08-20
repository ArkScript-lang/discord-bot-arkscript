'use strict';

require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');

module.exports = client => {
    client.commands = new Discord.Collection();

    fs.readdirSync('./bot/commands/').forEach(dir => {
        const commands = fs.readdirSync(`./bot/commands/${dir}/`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            const pull = require(`../commands/${dir}/${file}`);
            pull.help.category = dir;
            pull.help.name = file.split('.')[0];
            if (pull.help.name)
                client.commands.set(pull.help.name, pull);
        }
    });

    console.log('Commands registered');
};