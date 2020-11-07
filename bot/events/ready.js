'use strict';

require('dotenv').config();

const { safeExecAsync } = require('../utils.js');

// launch bot
module.exports = client => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`${process.env.PREFIX}help`, {type: 'PLAYING'});
};
