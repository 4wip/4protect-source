const Discord = require("discord.js");
const db = require('quick.db');
const owner = new db.table("Owner");
const cl = new db.table("Color");
const config = require("../config");

module.exports = {
    name: 'theme',
    usage: 'theme <couleur>',
    description: `Permet de changer la couleur de l'embed dans config.json.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = args[0];
            if (!color) return message.reply("Merci d'indiquer la couleur que vous souhaitez");

            if (!/^#[0-9A-F]{6}$/i.test(color)) {
                return message.reply("Merci d'entrer une couleur au format hexadécimal (ex: #FF0000)");
            }

            // Enregistrer la nouvelle couleur
            cl.set(`color_${message.guild.id}`, color);
            
            message.channel.send(`La couleur des embed ont été modifiée en ${color}`);
        }
    }
}
