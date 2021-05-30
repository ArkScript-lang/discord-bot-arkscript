'use strict';

require('dotenv').config();
const Discord = require("discord.js");
exports.run = (client, msg, args) => {
    msg.channel.send(new Discord.MessageEmbed({
        color: 0x6666ff,
        title: 'Tutorials',
        description: 'A list of commands to launch to get short tutorials in ArkScript',
        fields: [
            {
                name: 'tuto 0',
                value: 'Getting started, the syntax, variables and constants',
            },
            {
                name: 'tuto 1',
                value: 'Program structure, printing and conditions',
            },
            {
                name: 'tuto 2',
                value: 'Loops and functions',
            },
            {
                name: 'tuto 3',
                value: 'Closures and importation',
            },
            {
                name: 'tuto 4',
                value: 'Macros'
            },
         ],
    }));
};

exports.help = {
    description: 'List the available tutorials',
    usage: 'tutorials',
};
