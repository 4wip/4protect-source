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
    name: 'watch',
    usage: 'watch <statut>',
    description: `Permet de changer le statut du bot en "regarde".`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) {

            if (!message.guild) return;

            if (args.length) {
                let str_content = args.join(" ");
                client.user.setPresence({
                    activities: [{
                        name: `${str_content}`,
                        type: "WATCHING",
                        url: "https://discord.gg/A5bfyv3AzB"
                    }],
                    status: "online"
                });
            }
        }
    }
};
