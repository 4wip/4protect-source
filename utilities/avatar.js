const Discord = require("discord.js");
const db = require('quick.db');
const cl = new db.table("Color");
const fs = require('fs');
const config = require("../config");

module.exports = {
    name: 'pic',
    usage: 'pic',
    description: `Permet d'afficher l'avatar d'un utilisateur.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`);
        if (color == null) color = config.app.color;

        let member = message.mentions.users.first();
        if (!member) {
            try {
                member = await client.users.fetch(args[0]);
            } catch (e) {
                member = message.author;
            }
        }

        let avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        let username = member.username;

        const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar de ${username}`)
            .setImage(avatar)
            .setFooter({ text: `4Protect`})
            .setColor(color);

        message.channel.send({ embeds: [embed] });
    }
};