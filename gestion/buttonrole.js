const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const config = require("../config")

module.exports = {
    name: 'buttonrole',
    usage: 'buttonrole',
    description: `Permet de faire un menu buttonrole.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            const msg = args.slice(1).join(" ")

            if (!role) return message.reply(`buttonrole <role> <description>`)
            if (!msg) return message.reply(`buttonrole <role> <description>`)
            if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
                return message.reply("Le menu n'a pas pu être créé car le rôle sélectionné a des permissions **dangereuses**")
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`Choisi ton rôle`)
                .setDescription(`${msg}\n__Rôle :__ ${role}`)
                .setColor(color)


            const rolemenu = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('roles')
                        .setLabel(role.name)
                        .setStyle('SUCCESS')
                )

            const msgg = await message.channel.send({ embeds: [embed], components: [rolemenu] })

            await db.set(`buttonrole_${msgg.id}`, role.id)

        }
    }
}
