const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const wl = new db.table("Whitelist");
const cl = new db.table("Color");
const config = require("../config");
const footer = config.app.footer;

module.exports = {
    name: 'unwl',
    usage: 'unwl [membre/role]',
    category: "owner",
    description: `Permet d'enlever quelqu'un ou un rôle de la whitelist du bot.`,
    async execute(client, message, args) {
        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) {
            let color = cl.fetch(`color_${message.guild.id}`);
            if (color == null) color = config.app.color;

            if (args[0]) {
                let mor;

            
                if (message.mentions.members.size > 0) {
                    mor = message.mentions.members.first();
                } else if (message.mentions.roles.size > 0) {
                 
                    mor = message.mentions.roles.first();
                } else {
                  
                    mor = message.guild.members.cache.get(args[0]) || message.guild.roles.cache.get(args[0]);
                }

                if (!mor) return message.channel.send(`Aucun membre ou rôle trouvé pour \`${args[0] || "rien"}\``);

                if (mor instanceof Discord.Role) {
                  
                    if (!wl.get(`${message.guild.id}.${mor.id}.wl`)) {
                        return message.channel.send(`Le rôle ${mor.name} n'est pas dans la Whitelist.`);
                    } else {
                        wl.delete(`${message.guild.id}.${mor.id}.wl`);
                        return message.channel.send(`Le rôle ${mor.name} a été retiré de la Whitelist.`);
                    }
                } else if (mor instanceof Discord.GuildMember) {
              
                    if (!wl.get(`${message.guild.id}.${mor.id}.wl`)) {
                        return message.channel.send(`${mor.user.username} n'est pas dans la Whitelist.`);
                    } else {
                        wl.delete(`${message.guild.id}.${mor.id}.wl`);
                        return message.channel.send(`${mor.user.username} a été retiré de la Whitelist.`);
                    }
                }
            } else {
                return message.channel.send(`Veuillez spécifier un membre ou un rôle à retirer de la Whitelist.`);
            }
        }
    }
};
