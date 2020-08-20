'use strict';

require('dotenv').config();

exports.run = (client, msg, args) => {
    msg.channel.send({
        embed: {
            color: 0x6666ff,
            title: 'Tutorials',
            description: 'A list of commands to launch to get short tutorials in ArkScript',
            fields: [
                {
                    name: 'tuto0',
                    value: 'Getting started',
                },
                {
                    name: 'tuto1',
                    value: 'Program structure, printing and conditions',
                },
            ],
        }
    });
};

exports.help = {
    description: 'List the available tutorials',
    usage: 'tutorials',
};