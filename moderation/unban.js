const Discord = require("discord.js");
const config = require('../config');
const db = require('quick.db');
const owner = new db.table("Owner");
const p3 = new db.table("Perm3");

module.exports = {
    name: 'unban',
    usage: 'unban [membre/all]',
    description: `Permet de débannir un membre ou tous les membres.`,
    async execute(client, message, args) {
        const perm3 = p3.fetch(`perm3_${message.guild.id}`);

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) {
            if (!args[0]) {
                return message.reply("Veuillez spécifier un membre ou 'all' pour débannir tous les membres.");
            }

            if (args[0].toLowerCase() === 'all') {
               
                const bans = await message.guild.bans.fetch();
                if (bans.size === 0) return message.reply("Il n'y a pas de membres bannis.");

                bans.forEach(ban => {
                    message.guild.bans.remove(ban.user.id).catch(() => {
                        message.channel.send(`Impossible de débannir <@${ban.user.id}>.`);
                    });
                });

                message.reply("Tous les membres bannis ont été débannis.");

                const channellogs = config.app.channellogs; 
                const logchannel = client.channels.cache.get(channellogs);
                if (logchannel) {
                    const alert = new Discord.MessageEmbed()
                        .setColor("#6495ED")
                        .setTitle(`${message.author.tag} a débanni tous les membres`)
                        .setDescription(`Tous les membres bannis ont été débannis\nExécuteur : <@${message.author.id}>`)
                        .setTimestamp();
                    logchannel.send({ embeds: [alert] }).catch(() => false);
                }

            } else {
                // Unban specific member
                const user = args[0];
                const bans = await message.guild.bans.fetch();
                const isBanned = bans.has(user);
                
                if (!isBanned) {
                    return message.reply(`ID invalide ou l'utilisateur n'est pas banni.`);
                }

                message.guild.bans.remove(user).then(() => {
                    message.reply(`<@${user}> a été débanni.`);
                }).catch(() => {
                    message.reply(`Impossible de débannir l'utilisateur avec l'ID ${user}.`);
                });

                const channellogs = config.app.channellogs; 
                const logchannel = client.channels.cache.get(channellogs);
                if (logchannel) {
                    const alert = new Discord.MessageEmbed()
                        .setColor("#6495ED")
                        .setTitle(`${message.author.tag} a débanni un membre`)
                        .setDescription(`<@${user}> a été débanni\nExécuteur : <@${message.author.id}>`)
                        .setTimestamp();
                    logchannel.send({ embeds: [alert] }).catch(() => false);
                }
            }
        } else {
            message.reply("Vous n'avez pas la permission d'utiliser cette commande.");
        }
    }
};
