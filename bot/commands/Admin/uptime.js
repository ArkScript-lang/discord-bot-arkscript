'use strict';

require('dotenv').config();

exports.run = (client, msg, args) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    msg.channel.send({
        embed: {
            color: 0x6666ff,
            title: 'Uptime',
            description: `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`,
        }
    });
};

exports.help = {
    description: 'Get the bot uptime',
    usage: 'uptime',
};