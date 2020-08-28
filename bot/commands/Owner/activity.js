'use strict';

exports.run = (client, msg, args) => {
    if (args.length < 1)
        return;

    let type = 'PLAYING';
    if (args[0].startsWith('type=')) {
        type = args[0].substr('type='.length, args[0].length - 'type='.length);
        args.shift();  // remove first element of args
    }

    if (args.length < 1)
        return;

    client.user.setActivity(args.join(' '), { 'type': type });
};

exports.help = {
    description: 'Set the bot activity message',
    usage: 'activity [type=value] <msg...>',
};