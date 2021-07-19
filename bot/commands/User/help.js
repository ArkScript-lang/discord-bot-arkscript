'use strict';

require('dotenv').config();

const { MessageEmbed } = require('discord.js');

exports.run = (client, msg, args) => {
    if (args[0]) {
        let cmd = client.commands.get(args.join(' '));
        if (!cmd || !cmd.help.enabled) return msg.channel.send(`:x: Command not found with name \`${args.join(' ')}\` !`);

        let info_commands = new MessageEmbed()
            .setAuthor('Help Commands', client.user.displayAvatarURL({ format: 'png' }))
            .setDescription('<args> | mandatory\n[args] | optional')
            .addField('Name', cmd.help.name)
            .addField('Category', cmd.help.category)
            .addField('Description', cmd.help.description)
            .addField('Usage', process.env.PREFIX + cmd.help.usage);
        msg.channel.send(info_commands);
    } else {
        const categories = [];
        client.commands.forEach((command) => {
            if (!categories.includes(command.help.category)) {
                if (command.help.category === 'Owner' && msg.author.id !== process.env.OWNER) return;
                else if (command.help.category === 'Admin' && !msg.member.hasPermission('ADMINISTRATOR')) return;
                categories.push(command.help.category);
            };
        });

        let embed = new MessageEmbed()
            .setAuthor('Help Menu', client.user.displayAvatarURL({ format: 'png' }))
            .setFooter(`Need help with a command? Type: ${process.env.PREFIX}help <command name>`);

        categories.sort().forEach((category) => {
            let commands = client.commands.filter((cmd) => cmd.help.category === category && cmd.help.enabled);
            embed.addField(`${category} - (${commands.size})`, commands.map((cmd) => '`' + cmd.help.name + '`').join(', '));
        });
        msg.channel.send(embed);
    }
};

exports.help = {
    description: 'Get a manual to use the bot',
    usage: 'help',
};