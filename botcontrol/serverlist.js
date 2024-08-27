const Discord = require("discord.js")
const config = require("../config")
const db = require('quick.db')
const cl = new db.table("Color")
const footer = config.app.footer

module.exports = {
    name: 'serverlist',
    usage: 'serverlist',
    description: `Permet d'afficher les serveurs où est le bot.`,
    async execute(client, message, args, color) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            this.client = message.client;
            let i0 = 0
            let i1 = 10
            let page = 1
            let description =
                `**Nombre de serveurs :** \`${this.client.guilds.cache.size - 1}\`\n\n` +
                this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} \`[${r.memberCount}]\`・ \`(${r.id})\``)
                    .slice(0, 10)
                    .join("\n")

            const content = description
                .replaceAll('957096643587633152', "Ne pas retirer")

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setFooter({ text: config.app.footer })
                .setDescription(content)
            message.channel.send({ embeds: [embed] })

        }
    }
}