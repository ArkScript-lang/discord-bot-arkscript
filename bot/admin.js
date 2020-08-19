'use strict';

/**
 * Admin only command to check if the bot is running
 * @param {*} client 
 */
function ping(client) {
    return {
        embed: {
            color: 0x2ed32e,
            fields: [{
                name: 'Pong',
                value: `${Math.round(client.ws.ping)} ms`,
            }],
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
    }

    return false;  // not an admin command
}

exports.checkAndRunAdminCmds = checkAndRunAdminCmds;