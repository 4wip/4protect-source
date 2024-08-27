const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const wl = new db.table("Whitelist");
const wlcount = new db.table("Wlcount");
const cl = new db.table("Color");
const config = require("../config");
const footer = config.app.footer;

module.exports = {
    name: 'wl',
    usage: 'wl [membre/role]',
    category: "owner",
    description: `Permet de rajouter quelqu'un ou un rôle dans la whitelist du bot.`,
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
                    if (wl.get(`${message.guild.id}.${mor.id}.wl`) === mor.id) {
                        return message.channel.send(`Le rôle ${mor.name} est déjà sur la whitelist.`);
                    } else {
                        wl.set(`${message.guild.id}.${mor.id}.wl`, mor.id);
                        return message.channel.send(`Le rôle ${mor} a été ajouté à la whitelist.`);
                    }
                } else if (mor instanceof Discord.GuildMember) {
                    if (wl.get(`${message.guild.id}.${mor.id}.wl`) === mor.id) {
                        return message.channel.send(`${mor.user.username} est déjà sur la whitelist.`);
                    } else {
                        wl.set(`${message.guild.id}.${mor.id}.wl`, mor.id);
                        return message.channel.send(`${mor.user.username} a été ajouté à la whitelist.`);
                    }
                }
            } else {
                let membersList = message.guild.members.cache.filter(u => wl.get(`${message.guild.id}.${u.id}.wl`) === u.id).map(a => "<@" + a.user.id + ">");
                let rolesList = message.guild.roles.cache.filter(r => wl.get(`${message.guild.id}.${r.id}.wl`) === r.id).map(r => `<@&${r.id}>`);

                const embed = new Discord.MessageEmbed()
                    .setTitle("Whitelist")
                    .setDescription(`Membres : ${membersList.join("\n")}\n\nRôles : ${rolesList.join(", ")}`)
                    .setColor(color)
                    .setFooter({ text: `${footer}` });
                return message.channel.send({ embeds: [embed] });
            }
        }
    }
};
