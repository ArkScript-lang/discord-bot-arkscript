'use strict';

require('dotenv').config();

function isCommand(msg) {
    if (msg.author.bot || !msg.content.startsWith(process.env.PREFIX))
        return false;
    return true;
}

function getCmdArgs(msg) {
    return msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
}

exports.isCommand = isCommand;
exports.getCmdArgs = getCmdArgs;
