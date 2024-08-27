const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../config");
const owner = new db.table("Owner");
const cl = new db.table("Color");
const ml = new db.table("modlog");
const p1 = new db.table("Perm1");
const p2 = new db.table("Perm2");
const p3 = new db.table("Perm3");
const footer = config.app.footer;

module.exports = {
    name: 'vmove',
    usage: 'vmove <membre/salon> [salon]',
    description: 'Déplace un membre ou un salon vocal entier vers un autre salon vocal.',
    async execute(client, message, args) {
        const pf = config.app.px;
        const perm1 = p1.fetch(`perm1_${message.guild.id}`);
        const perm2 = p2.fetch(`perm2_${message.guild.id}`);
        const perm3 = p3.fetch(`perm3_${message.guild.id}`);
        
        if (!(owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)))
            return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.");
        
        const destinationChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        
        if (!destinationChannel || destinationChannel.type !== 'GUILD_VOICE')
            return message.channel.send("Veuillez spécifier un salon vocal de destination valide.");
        
        if (!destinationChannel.permissionsFor(message.guild.me).has("CONNECT"))
            return message.channel.send("Je n'ai pas la permission de me connecter à ce salon vocal de destination.");

        if (message.mentions.members.size > 0) {
            const member = message.mentions.members.first();
            try {
                await member.voice.setChannel(destinationChannel);
                message.channel.send(`Le membre ${member.user.tag} a été déplacé vers le salon vocal ${destinationChannel}.`);
            } catch (error) {
                console.error(error);
                message.channel.send("Une erreur s'est produite lors du déplacement du membre.");
            }
        } else { 
            const sourceChannel = message.member.voice.channel;
            if (!sourceChannel)
                return message.channel.send("Vous devez être dans un salon vocal pour déplacer un salon vocal entier.");
            
            try {
                const membersToMove = sourceChannel.members;
                for (const [_, member] of membersToMove) {
                    await member.voice.setChannel(destinationChannel);
                }
                message.channel.send(`Le salon vocal entier a été déplacé vers ${destinationChannel}.`);
            } catch (error) {
                console.error(error);
                message.channel.send("Une erreur s'est produite lors du déplacement du salon vocal entier.");
            }
        }

        const muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let color = cl.fetch(`color_${message.guild.id}`);
        if (color == null) color = config.app.color;

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`<@${message.author.id}> a déplacé un membre/salon vocal vers ${destinationChannel}`)
            .setTimestamp()
            .setFooter({ text: `📚` });

        const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));
        if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
    }
};
