const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
const fs = require('fs')
const config = require("../config")

module.exports = {
    name: 'bypass',
    usage: 'bypass',
    description: `Permet de voir quelles rank peuvent bypass des permissions.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`
**\`antiadmin | Owner\`**
**\`antiban | Owner\`**
**\`antiupdate | Owner\`**
**\`antibot | Owner\`**
**\`antilink | Owner | Wl\`**
**\`antieveryone | Owner | Wl\`**
**\`antichannel create | Owner | Wl\`**
**\`antichannel delete | Owner\`**
**\`antichannel update | Owner\`**
**\`antirôle create | Owner\`**
**\`antirôle delete | Owner\`**
**\`antirôle update | Owner\`**
**\`antiwebhook | Owner\`**
`)

        message.channel.send({ embeds: [embed] });
    }
}
