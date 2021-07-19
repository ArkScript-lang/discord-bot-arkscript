'use strict';

require('dotenv').config();

exports.run = async (client, msg, args) => {
    let embed = (ping, api_ping) => {
        return {
            embed: {
                title: 'Ping',
                description: `${Math.round(ping)}ms`,
                color: 0x11dd11,
                fields: [
                    {
                        name: 'API',
                        value: `${api_ping}ms`,
                    },
                ],
            },
        };
    };

    let msg_ping = await msg.channel.send(embed(NaN, NaN));
    let ping = msg_ping.createdTimestamp - msg.createdTimestamp;

    await msg_ping.edit(embed(ping, client.ws.ping));
};

exports.help = {
    description: 'A command to ping the bot',
    usage: 'ping',
};