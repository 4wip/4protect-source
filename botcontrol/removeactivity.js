const Discord = require("discord.js");
const db = require('quick.db');
const owner = new db.table("Owner");
const config = require("../config");

module.exports = {
  name: 'remove-activity',
  usage: 'remove-activity',
  description: `Supprime l'activité actuelle du bot.`,
  async execute(client, message, args) {

    if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) {

      if (!message.guild) return;

        await client.user.setActivity();

        message.channel.send("L'activité a été supprimée avec succès !");
    }
  }
};
