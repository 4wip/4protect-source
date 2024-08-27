const Discord = require("discord.js");
const db = require('quick.db');
const owner = new db.table("Owner");
const config = require("../config");
const cl = new db.table("Color");
const p2 = new db.table("Perm2");
const p3 = new db.table("Perm3");

module.exports = {
    name: 'all',
    usage: 'all <bots/admins>',
    description: `Permet d'afficher la liste des administrateurs ou des bots présents sur le serveur.`,
    async execute(client, message, args) {

        if (!args[0]) {
            return message.channel.send("Veuillez spécifier si vous souhaitez afficher les bots ou les admins.");
        }

        const perm2 = p2.fetch(`perm2_${message.guild.id}`);
        const perm3 = p3.fetch(`perm3_${message.guild.id}`);

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) {

            let color = cl.fetch(`color_${message.guild.id}`);
            if (color == null) color = config.app.color;

            if (args[0] === 'bots') {
                let bots = message.guild.members.cache.filter(m => m.user.bot).size;
                let botNames = message.guild.members.cache.filter(m => m.user.bot).map(m => `${m.user.tag}: \`(${m.user.id})\``).join("\n");
                var embed = new Discord.MessageEmbed()
                    .setTitle(`Liste des Bots`)
                    .setDescription(`${botNames}`)
                    .setFooter({ text: `Total: ${bots}` })
                    .setColor(color);
                message.channel.send({ embeds: [embed] });
            }
            else if (args[0] === 'admins') {
                var admins = message.guild.members.cache.filter(member => member.permissions.has("ADMINISTRATOR") && !member.user.bot);
                var adminNames = admins.map(m => `${m.user.tag}: \`(${m.user.id})\``).join("\n");
                for (let i = 0; i < adminNames.length; i += 1995) {
                    const content = adminNames.substring(i, Math.min(adminNames.length, i + 1995));
                    var embed = new Discord.MessageEmbed()
                        .setTitle(`Liste des Administrateurs.`)
                        .setDescription(`\n ${content}`)
                        .setFooter({ text: `Total : ${admins.size}` })
                        .setColor(color);
                    message.channel.send({ embeds: [embed] });
                }
            } else {
                return message.channel.send("Veuillez spécifier si vous souhaitez afficher les bots ou les admins.");
            }
        }
    }
};
