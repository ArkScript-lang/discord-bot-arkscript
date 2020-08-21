'use strict';
const Discord = require("discord.js");

exports.run = (client, msg, args) => {
    msg.channel.send(new Discord.MessageEmbed({
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
    }));
};

exports.help = {
    description: 'Get information about the project',
    usage: 'arkscript'
};
