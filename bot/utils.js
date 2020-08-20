'use strict';

require('dotenv').config();
const { exec } = require('child_process');

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

exports.safeExecAsync = safeExecAsync;