const Discord = require("discord.js");
const db = require('quick.db');
const owner = new db.table("Owner");
const cl = new db.table("Color");
const modlog = new db.table("modlog")
const config = require("../config");
const footer = config.app.footer;
const emote = require('../emotes.json');

module.exports = {
    name: 'derank',
    usage: 'derank [membre/all]',
    description: `Permet de derank un membre ou tous les membres sur le serveur.`,
    async execute(client, message, args) {
        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) {
            let color = cl.fetch(`color_${message.guild.id}`);
            if (color == null) color = config.app.color;

            if (!args[0]) {
                return message.reply("Veuillez spécifier un membre ou 'all' pour derank tout le serveur.");
            }

            if (args[0].toLowerCase() === 'all') {
           
                let embedArray = [];
                let value = false;
                try {
                    message.guild.members.cache.forEach(member => {
                        if (member.id !== client.user.id) {
                            embedArray.push({
                                mid: `<@${member.id}>`,
                                roles: member.roles.cache.filter(r => r.id !== message.guild.id).map(r => `<@&${r.id}>`).join(", ")
                            });
                            member.roles.set([]).catch(() => false);
                        }
                    });
                    value = true;
                } catch {
                    value = false;
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle("Voici les personnes qui ont été derank")
                    .setDescription(embedArray.map(e => `${e.mid} -> ${e.roles}`).join("\n"))
                if (value) message.channel.send({ embeds: [embed] }).catch(() => false);

                const channellogs = modlog.get(`${message.guild.id}.modlog`);
                let roleping = db.get(`role_${message.guild.id}`);
                if (roleping === null) roleping = "@everyone";

                const alert = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`${message.author.tag} a effectué un derank all`)
                    .setDescription(`${emote.owner.abus} Toutes les personnes sur le serveur ont été derank\nExécuteur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `⚠️ ${footer}` });

                const logchannel = client.channels.cache.get(channellogs);
                if (logchannel) logchannel.send({ content: `${roleping}`, embeds: [alert] }).catch(() => false);

            } else {
        
                let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                if (!member) return message.reply("Veuillez mentionner un membre valide ou fournir un ID valide.");

                let roles = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => `<@&${r.id}>`).join(", ");
                try {
                    member.roles.set([]).then(() => {
                    }).catch(() => {
                    });
                } catch {
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle("Derank d'un membre")
                    .setDescription(`<@${member.id}> a été derank et les rôles suivants ont été retirés : ${roles}`)
                    .setFooter({ text: `${footer}` });

                message.channel.send({ embeds: [embed] }).catch(() => false);

                const channellogs = modlog.get(`${message.guild.id}.modlog`);
                let roleping = db.get(`role_${message.guild.id}`);
                if (roleping === null) roleping = "@everyone";

                const modlog = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`${message.author.tag} a effectué un derank`)
                    .setDescription(`${emote.owner.abus} <@${member.id}> a été derank\nExécuteur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `⚠️ ${footer}` });

                const logchannel = client.channels.cache.get(channellogs);
                if (logchannel) logchannel.send({ content: `${roleping}`, embeds: [alert] }).catch(() => false);
            }
        }
    }
};
