'use strict';

require('dotenv').config();

const { loadCommands } = require('../../utils.js');

exports.run = (client, msg, args) => {
    let start = +new Date();
    loadCommands(client);
    msg.channel.send(`:v: Commands reloaded in ${+new Date() - start}ms`);
};

exports.help = {
    description: 'Reload all commands',
    usage: 'reload',
};