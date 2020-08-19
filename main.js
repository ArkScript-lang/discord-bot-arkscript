'use strict';

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true,
});

const { safeExecAsync } = require('./bot/utils.js');

// launch bot and perform some operations, like downloading the latest docker image for arkscript
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log('================================');
    console.log('Downloading latest docker image');

    let child = safeExecAsync(
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

    child.on('close', () => {
        client.user.setActivity(`${process.env.PREFIX}help`, {type: 'PLAYING'});
    });
});

// add commands
require('./bot/commands.js')(client);

client.login(process.env.TOKEN);