'use strict';

require('dotenv').config();

exports.run = async (client, msg, args) => {
    let msg_ping = await msg.channel.send('...');
    let ping = msg_ping.createdTimestamp - msg.createdTimestamp;

    await msg_ping.edit({
        embed: {
            title: 'Ping',
            description: `${Math.round(ping)}ms`,
            color: 0x11dd11,
            fields: [
                {
                    name: 'API',
                    value: `${client.ws.ping}ms`,
                },
            ],
        },
    });
};

exports.help = {
    description: 'A command to ping the bot',
    usage: 'ping',
};