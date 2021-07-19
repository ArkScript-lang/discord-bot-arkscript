'use strict';

require('dotenv').config();

exports.run = (client, msg, args) => {
    let cmd = client.commands.get(args.join(' '));

    if (!cmd || cmd.help.category === 'Owner')
        return msg.channel.send(`:x: Command not found with name \`${args.join(' ')}\` !`);
    else {
        cmd.help.enabled = false;
        return msg.channel.send(`:white_check_mark: Command '${cmd.help.name}' has been disabled`);
    }
};

exports.help = {
    description: 'Disable a command globally',
    usage: 'disable <command>',
};