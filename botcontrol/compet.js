const Discord = require("discord.js");
const config = require("../config");
const db = require('quick.db');
const owner = new db.table("Owner");

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = {
    name: 'compet',
    usage: 'compet <activité>',
    description: `Permet au bot de participer à une activité.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) {

            if (!message.guild) return;

            if (args.length) {
                let str_content = args.join(" ");
                client.user.setPresence({
                    activities: [{
                        name: `${str_content}`,
                        type: "COMPETING"
                    }],
                    status: "online"
                });
                message.channel.send(`Je participe maintenant à __${str_content}__`)
                    .catch(e => { return message.channel.send(`Une erreur est survenue.`); });
            }
        }
    }
};
