'use strict';

require('dotenv').config();
const fs = require('fs');

exports.run = (client, msg, args) => {
    let config = {
        'commands': {},
        'activity': {},
    };

    client.commands.forEach((command) => {
        config['commands'][command.help.name] = {
            'enabled': command.help.enabled,
        };
    });

    config['activity'] = {
        'type': client.user.presence.activities[0].type,
        'name': client.user.presence.activities[0].name,
    }

    fs.writeFileSync('./save.json', JSON.stringify(config));
};

exports.help = {
    description: 'Save current bot configuration to disk',
    usage: 'save',
};