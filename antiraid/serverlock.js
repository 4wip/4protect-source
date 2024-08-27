const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const lock = new db.table("Serverlock")
const p = new db.table("Prefix")
const cl = new db.table("Color")

module.exports = {
    name: 'server',
    usage: 'server',
    description: `Permet de fermer l'accès au serveur`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] === "lock") {
                if (lock.get(`serverlock_${message.guild.id}`) === "lock") return message.channel.send(`**Le serveur est déjà verroouillé**`)
                lock.set(`serverlock_${message.guild.id}`, "lock")
                message.channel.send(`Le serveur est maintenant **verrouillé**`)

            } else if (args[0] === "unlock") {
                if (lock.get(`serverlock_${message.guild.id}`) === "unlock") return message.channel.send(`**Le serveur n'est pas verrouillé**`)
                lock.set(`serverlock_${message.guild.id}`, false)
                message.channel.send(`Le serveur est maintenant **déverrouillé**`)

            }
        }
    }
}