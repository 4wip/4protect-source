const { Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu, Message, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js')
const messageCreate = require('./messageCreate');
const config = require('../config')
const db = require('quick.db')
const cl = new db.table("Color")
const ct = new db.table("CategorieTicket")
const moment = require('moment')
const fs = require('fs')
const ticketlogg = new db.table("ticketlog")
const dbrolestaff = new db.table("Rolestaff")
const emote = require('../emotes.json')

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction, message) {

        let color = cl.fetch(`color_${interaction.guild.id}`)
        if (color == null) color = config.app.color

        if (!interaction.isButton()) return;
	
        const donnée = await db.get(`buttonrole_${interaction.message.id}`)
        if (!donnée) return

        const role = interaction.guild.roles.cache.get(donnée)
        if (!role) return

        if (!interaction.member.roles.cache.has(role.id)) {
            interaction.reply({ content: `${interaction.user}, je vous ai donné le rôle \`${role.name}\`.`, ephemeral: true })
            interaction.member.roles.add(role).catch(() => false)
        }
        else {
            interaction.reply({ content: `${interaction.user}, je vous ai enlevé le rôle \`${role.name}\`.`, ephemeral: true })
            interaction.member.roles.remove(role).catch(() => false)
        }
    }
}
