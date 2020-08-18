'use strict';

const config = require('./config.js');

function isCommand(msg) {
    if (msg.author.bot || !msg.content.startsWith(config.prefix))
        return false;
    return true;
}

function getCmdArgs(msg) {
    return msg.content.slice(config.prefix.length).trim().split(/ +/g);
}

exports.isCommand = isCommand;
exports.getCmdArgs = getCmdArgs;
