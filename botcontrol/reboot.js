const Discord = require("discord.js")
const db = require('quick.db')

const config = require("../config")
const emote = require('../emotes.json')

module.exports = {
    name: 'reboot',
    usage: 'reboot',
    description: `Permet de redémarrer le bot.`,
    async execute(client, message, args) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            message.channel.send(`${emote.buyer.loading} Reboot en cours ...`).then(async message => {
                message.edit(`${emote.buyer.loading} Reboot en cours ...`)
                client.destroy();
                await client.login(process.env.token);
                await message.edit(`${emote.buyer.loading} Reboot en cours ...`)
                message.edit(`${emote.buyer.valid} Reboot terminé`)

            })
        }
    }
}
