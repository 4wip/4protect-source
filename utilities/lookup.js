const Discord = require("discord.js");
const moment = require('moment');
const db = require('quick.db');
const cl = new db.table("Color");
const config = require("../config");

module.exports = {
    name: 'lookup',
    usage: 'lookup',

    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`);
        if (color == null) color = config.app.color;

        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        };

        const flags = {
            "": "Aucun",
            "DISCORD_EMPLOYEE": "Discord Employer",
            "DISCORD_PARTNER": "Discord Partner",
            "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
            "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
            "HYPESQUAD_EVENTS": "Hypesquad Events",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "Early",
            "TEAM_USER": "Team User",
            "VERIFIED_BOT": "Bot Certifié",
            "EARLY_VERIFIED_DEVELOPER": "Developer"
        };

        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname || "None";
        const roles = mention.roles.cache.size === 1 ? "None" : mention.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(' ');
        const usericon = mention.user.displayAvatarURL({ dynamic: true });
        const mentionPermissions = mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
        }

        const userFlags = mention.user.flags ? mention.user.flags.toArray() : [];
        const userBadges = userFlags.length ? userFlags.map(flag => flags[flag]).join(", ") : "None";

        const bot = mention.user.bot ? "L'utilisateur est un bot" : "L'utilisateur est un humain";

        const userlol = new Discord.MessageEmbed()
            .setAuthor(`Informations`, usericon)
            .setThumbnail(usericon)
            .addField(`General`, `Nom: \`${mention.user.username}\` \nSurnom: \`${nick}\``)
            .addField(`Aperçu`, `Badges: \`${userBadges}\`\nBot: \`${bot}\``)
            .addField(`Informations relatives au serveur`, `Roles: ${roles} \nPermissions: \`${finalPermissions.join(', ')}\``)
            .addField(`Info`, `Compte créé le: \`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nA rejoint le serveur: \`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
            .setFooter(`ID: ${mention.user.id}`, usericon)
            .setColor(color);

        message.channel.send({ embeds: [userlol] });
    }
};
