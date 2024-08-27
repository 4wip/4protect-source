const Discord = require("discord.js");
const db = require('quick.db');
const cl = new db.table("Color");
const config = require("../config");
const footer = config.app.footer;

module.exports = {
    name: 'calc',
    usage: 'calc <calcul>',
    description: `Permet d'effectuer un calcul.`,
    execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`);
        if (color == null) color = config.app.color;

        if (!args[0]) {
            return message.channel.send("Veuillez fournir un calcul.");
        }

        const expression = args.join(' ');

        try {
            const result = eval(expression);

            const embed = new Discord.MessageEmbed()
                .setTitle("Résultat")
                .setDescription(`Ton calcul \`${expression}\` donne comme résultat : **${result}**`)
                .setColor(color)
                .setFooter(footer);

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            
            message.channel.send("Pour les calculs: 1x1 = 1*1 | 1:1 = 1/1");
        }
    }
};