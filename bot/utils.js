'use strict';

require('dotenv').config();
const { exec } = require('child_process');

/**
 * Check if a discord message starts with the bot prefix
 * @param {*} msg 
 */
function isCommand(msg) {
    if (msg.author.bot || !msg.content.startsWith(process.env.PREFIX))
        return false;
    return true;
}

/**
 * Check if a message author is our beloved owner
 * @param {*} msg 
 */
function isOwner(author) {
    return author.id === process.env.OWNER;
}

/**
 * Get command arguments from a message
 * @param {*} msg 
 */
function getCmdArgs(msg) {
    return msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
}

/**
 * Safe exec (some preconfigured options)
 * @param {*} command shell command to executed
 * @param {*} callback the callback when the command is executed, like so (error, stdout, stderr) => {}
 */
function safeExecAsync(command, callback) {
    let options = {
        cwd: '/tmp',
        env: {},
        maxBuffer: 1024,
    };

    // add a timeout
    if (command.startsWith('docker run'))
        options.timeout = 10000;  // milliseconds

    return exec(command, options, callback);
}

exports.isCommand = isCommand;
exports.getCmdArgs = getCmdArgs;
exports.isOwner = isOwner;
exports.safeExecAsync = safeExecAsync;