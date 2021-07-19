'use strict';

exports.run = (client, msg, args) => {
    let page = 0;
    if (args.length === 1 && !isNaN(parseInt(args[0])))
        page = parseInt(args[0]);

    let servers = [];
    let total_members = 0;
    client.guilds.cache.forEach(g => {
        if (g.available) {
            servers.push({
                name: `${g.name} owned by ${g.owner ? g.owner.displayName : 'unknown (not in cache)'}`,
                value: `${g.memberCount} members`,
            });
            total_members += g.memberCount;
        }
    });

    if (servers.length < page * 10) {
        msg.channel.send(`:x: Wanted page number isn't available. Maximum is ${Math.floor(servers.length / 10)}`);
        return;
    }

    let embed = {
        embed: {
            title: 'Servers',
            color: 0x8f00b3,
            description: `Currently in ${client.guilds.cache.size} servers`,
            footer: {
                text: `Total members reached: ${total_members}`,
            },
        },
    };

    if (servers.length !== 0)
        embed['embed']['fields'] = servers.slice(page * 10, (page + 1) * 10);

    msg.channel.send(embed);
};

exports.help = {
    description: 'List the servers the bot is in',
    usage: 'servers [page]',
};
