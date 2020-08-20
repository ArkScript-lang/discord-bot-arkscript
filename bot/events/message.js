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
    if (command)
        command.run(client, msg, args);
};