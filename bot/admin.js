'use strict';

/**
 * Admin only command to check if the bot is running
 * @param {*} client 
 */
function ping(client) {
    return {
        embed: {
            title: 'Pong',
            description: `${Math.round(client.ws.ping)} ms`,
            color: 0x2ed32e,
        }
    };
}

/**
 * Admin only command to get the bot's uptime
 * @param {*} client 
 */
function uptime(client) {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    return {
        embed: {
            color: 0x6666ff,
            title: 'Uptime',
            description: `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`,
        }
    };
}

/**
 * Command handler for the admin/owner only commands
 * @param {*} client discord client
 * @param {*} msg the discord message object
 * @param {string} cmd the command
 * @param {Array<string>} args the arguments of the command
 */
function checkAndRunAdminCmds(client, msg, cmd, args) {
    if (cmd === 'ping') {
        msg.channel.send(ping(client));
        return true;
    } else if (cmd === 'uptime') {
        msg.channel.send(uptime(client));
        return true;
    }

    return false;  // not an admin command
}

exports.checkAndRunAdminCmds = checkAndRunAdminCmds;