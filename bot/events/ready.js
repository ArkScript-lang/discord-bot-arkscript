'use strict';

require('dotenv').config();

module.exports = client => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`${process.env.PREFIX}help`, {type: 'PLAYING'});
};