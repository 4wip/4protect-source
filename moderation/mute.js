const Discord = require("discord.js");
const db = require('quick.db');
const owner = new db.table("Owner");
const p = new db.table("Prefix");
const config = require("../config");
const p1 = new db.table("Perm1");
const p2 = new db.table("Perm2");
const p3 = new db.table("Perm3");
const ml = new db.table("modlog");
const footer = config.app.footer;
const couleur = config.app.color;

module.exports = {
    name: 'mute',
    usage: 'mute <membre> [temps]',
    description: `Permet de rendre muet un utilisateur sur le serveur`,
    async execute(client, message, args) {
        let pf = p.fetch(`prefix_${message.guild.id}`);
        if (pf == null) pf = config.app.px;

        const perm1 = p1.fetch(`perm1_${message.guild.id}`);
        const perm2 = p2.fetch(`perm2_${message.guild.id}`);
        const perm3 = p3.fetch(`perm3_${message.guild.id}`);

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if (!args[0]) return message.channel.send(`**Veuillez mentionner un utilisateur ou fournir son ID !**`);
            if (!target) return message.channel.send(`**Veuillez mentionner un utilisateur valide ou fournir un ID valide !**`);

            let duration;
            if (args[1]) {
                duration = parseDuration(args[1]);
                if (isNaN(duration) || duration < 0 || duration > 28 * 24 * 60 * 60 * 1000) {
                    return message.channel.send(`**Veuillez fournir une durée valide | en m/h/j | inférieur à 27j!**`);
                }
            } else {
                duration = 28 * 24 * 60 * 60 * 1000; 
            }

            var reason = args.slice(2).join(" ") || 'Sans raison';

            if (target.id === message.author.id) return message.channel.send(`**Vous ne pouvez pas vous rendre muet vous-même !**`);

            try {
                await target.timeout(duration, reason);

                const embed = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .setDescription(`**Action**: Mute\n**Utilisateur**: ${target.user.tag} (${target.id})\n**Modérateur**: ${message.author.tag}\n**Durée**: ${ms(duration, { long: true })}\n**Raison**: ${reason}`)
                    .setTimestamp()
                    .setFooter(footer);
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
            } catch (err) {
                console.error(err);
                message.channel.send(`**Une erreur s'est produite en essayant de rendre muet ${target}.**`);
            }
        } else {
            message.channel.send(`**Vous n'avez pas les permissions pour utiliser cette commande !**`);
        }
    }
};

function parseDuration(duration) {
    const timeUnits = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        j: 24 * 60 * 60 * 1000, 
    };

    if (typeof duration !== 'string') return NaN;

    const match = duration.match(/^(\d+)(s|m|h|j)$/);
    if (!match) return NaN;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    return value * timeUnits[unit];
}

function ms(duration, options) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const jours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const heures = Math.floor(duration / (1000 * 60 * 60 * 24));

    const parts = [];
    if (jours) parts.push(`${jours} jour${jours > 1 ? 's' : ''}`);
    if (heures) parts.push(`${heures} heure${heures > 1 ? 's' : ''}`);
    if (minutes) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds) parts.push(`${seconds} seconde${seconds > 1 ? 's' : ''}`);

    return parts.join(', ');
}