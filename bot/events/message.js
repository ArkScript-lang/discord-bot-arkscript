'use strict';

require('dotenv').config();

module.exports = (client, msg) => {
    // don't handle bot, DM and non commands messages
    if (msg.author.bot || msg.channel.type === 'dm' || !msg.content.startsWith(process.env.PREFIX))
        return;

    // get command and arguments after prefix
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    // if no command, abort
    if (cmd.length === 0) return;

    // run command based on its name and aliases
    let command = client.commands.get(cmd);
    if (command) {
        if (command.help.category === 'Owner' && msg.author.id !== process.env.OWNER) {
            msg.channel.send(':x: You need to be the bot owner to run this command');
        } else if (command.help.category === 'Admin' && !msg.member.hasPermission('ADMINISTRATOR')) {
            msg.channel.send(':x: You need to be an administrator to run this command');
        } else
            command.run(client, msg, args);
    }
};