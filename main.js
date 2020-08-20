'use strict';

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true,
});

require('./bot/handler/events.js')(client);
require('./bot/handler/commands.js')(client);

client.login(process.env.TOKEN);