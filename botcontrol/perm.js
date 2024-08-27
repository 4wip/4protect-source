const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const p1 = new db.table("Perm1")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const pgs = new db.table("PermGs")
const pgp = new db.table("PermGp")
const pga = new db.table("PermGa")
const config = require("../config")
const wl = new db.table("Whitelist")
const footer = config.app.footer

module.exports = {
    name: 'perm',
    usage: 'perm',
    category: "owner",
    description: `Permet de voir la liste des permissions du serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'list') {

                let color = cl.fetch(`color_${message.guild.id}`)
                if (color == null) color = config.app.color

                let perm1 = `<@&${p1.fetch(`perm1_${message.guild.id}`)}>`
                if (perm1 == `<@&null>`) perm1 = "Non configuré"

                let perm2 = `<@&${p2.fetch(`perm2_${message.guild.id}`)}>`
                if (perm2 == `<@&null>`) perm2 = "Non configuré"

                let perm3 = `<@&${p3.fetch(`perm3_${message.guild.id}`)}>`
                if (perm3 == `<@&null>`) perm3 = "Non configuré"

                let permgs = `<@&${pgs.fetch(`permgs_${message.guild.id}`)}>`
                if (permgs == `<@&null>`) permgs = "Non configuré"

                let permgp = `<@&${pgp.fetch(`permgp_${message.guild.id}`)}>`
                if (permgp == `<@&null>`) permgp = "Non configuré"

                let permga = `<@&${pga.fetch(`permga_${message.guild.id}`)}>`
                if (permga == `<@&null>`) permga = "Non configuré"


                const embed = new Discord.MessageEmbed()
                    .setTitle('Permission du serveur')
                    .addField(`Permission 1`, `${perm1}`)
                    .addField(`Permission 2`, `${perm2}`)
                    .addField(`Permission 3`, `${perm3}`)
                    .addField(`Gestion Staff`, `${permgs}`)
                    .addField(`Gestion Permissions`, `${permgp}`)
                    .addField(`Permission Giveaway`, `${permga}`)
                    .setFooter({ text: `Voir le +helpall pour voir les commandes auxquelles chaque permission donne accès` })
                    .setColor(color)

                message.channel.send({ embeds: [embed] })
                return

            }
        }
        }
    }
