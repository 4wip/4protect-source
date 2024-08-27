const Discord = require("discord.js");
const db = require('quick.db');
const owner = new db.table("Owner");
const config = require("../config");

module.exports = {
    name: 'mp',
    usage: 'mp [membre/all]',
    description: `Permet d'envoyer un MP à un membre ou à tous les membres du serveur via le bot.`,
    async execute(client, message, args) {
        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) {
            const target = args.shift().toLowerCase();
            const msg = args.join(" ");

            if (!msg) return message.reply(`Veuillez écrire le message qui sera envoyé.`);

            if (target === "all") {
                message.guild.members.cache.forEach(member => {
                    if (member.id !== client.user.id && !member.user.bot) {
                        member.send(`${msg}`).catch(() => {
                            message.channel.send(`Impossible d'envoyer un message privé à ${member.user.tag}`);
                        });
                    }
                });
                return message.reply(`Message envoyé à tous les membres du serveur.`);
            } else {
                const user = message.mentions.users.first();
                if (!user) return message.reply(`Veuillez mentionner la personne à qui vous souhaitez envoyer un message privé.`);
                
                user.send(`${msg}`).then(() => {
                    return message.reply("Le MP a bien été envoyé.");
                }).catch(() => {
                    return message.reply("Les MP de l'utilisateur sont fermés.");
                });
            }
        }
    }
};
