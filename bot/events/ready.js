'use strict';

require('dotenv').config();

const { safeExecAsync } = require('../utils.js');

// launch bot and perform some operations, like downloading the latest docker image for arkscript
module.exports = client => {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
        console.log('================================');
        console.log('Downloading latest docker image');

        safeExecAsync(
            'docker pull arkscript/nightly:latest',
            (error, stdout, stderr) => {
                if (error)
                    console.log(error.message);
                if (stderr)
                    console.log(stderr);
                console.log(stdout);
                console.log('================================');
                console.log('Update done');
            },
        );
    });

    client.user.setActivity(`${process.env.PREFIX}help`, {type: 'PLAYING'});
};