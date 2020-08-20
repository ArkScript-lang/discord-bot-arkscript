'use strict';

require('dotenv').config();

const fs = require('fs');

module.exports = client => {
    fs.readdirSync('./bot/events/').forEach(file => {
        if (!file.endsWith('.js'))
            return;

        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];

        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`../events/${file}`)];
    });

    console.log('Events registered');
};