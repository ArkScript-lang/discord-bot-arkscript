'use strict';

exports.run = (client, msg, args) => {
    if (args.length < 1)
        return;

    const authorized = [
        'PLAYING',
        'STREAMING',
        'LISTENING',
        'WATCHING',
        'CUSTOM_STATUS',
        'COMPETING',
    ];

    let type = 'PLAYING';
    if (args[0].startsWith('type=')) {
        type = args[0].substr('type='.length, args[0].length - 'type='.length);
        if (!authorized.includes(type))
            return msg.channel.send(`:x: Invalid activity type: ${type}`);
        args.shift(); // remove first element of args
    }

    if (args.length < 1 || !authorized.includes(type))
        return;

    client.user.setActivity(args.join(' '), { 'type': type });
};

exports.help = {
    description: 'Set the bot activity message, type in [PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS, COMPETING]',
    usage: 'activity [type=value] <msg...>',
};