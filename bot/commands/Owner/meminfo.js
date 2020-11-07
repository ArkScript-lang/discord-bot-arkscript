'use strict';

const process = require('process');

exports.run = (client, msg, args) => {
    const used = process.memoryUsage();

    let embed = {
        embed: {
            title: 'Memory info',
            color: 0x8f00b3,
            fields : [],
        },
    };

    for (let key in used) {
        embed['embed']['fields'].push({
            name: key,
            value: `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`,
        });
    }

    msg.channel.send(embed);
};

exports.help = {
    description: 'List resources used by the bot',
    usage: 'meminfo',
};
