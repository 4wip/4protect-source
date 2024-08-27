const Discord = require("discord.js");
const config = require("../config");

module.exports = {
    name: 'set',
    usage: 'set <name/pic/banner> [nom/lien]',
    description: `Permet de changer le nom, l'avatar ou la bannière du bot.`,
    async execute(client, message, args) {
        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {
            if (args.length >= 2) {
                const option = args[0].toLowerCase();
                const content = args.slice(1).join(" ");
                switch (option) {
                    case 'name':
                        client.user.setUsername(content)
                            .then(() => message.channel.send(`${message.author}, vous avez changé le **nom** du bot.`))
                            .catch(() => message.reply("Veuillez patienter avant de rechanger mon pseudo"));
                        break;
                    case 'pic':
                        if (message.attachments.size > 0) {
                            const attachment = message.attachments.first();
                            client.user.setAvatar(attachment.url)
                                .then(() => message.channel.send(`${message.author}, vous avez changé la **photo de profil** du bot.`))
                                .catch(() => message.reply("Veuillez patienter avant de rechanger mon avatar"));
                        } else {
                            client.user.setAvatar(content)
                                .then(() => message.reply(`Vous avez changé la **photo de profil** du bot.`))
                                .catch(() => message.reply("Veuillez patienter avant de rechanger mon avatar"));
                        }
                        break;
                    case 'banner':
                        if (message.attachments.size > 0) {
                            const attachment = message.attachments.first();
                            client.user.setBanner(attachment.url)
                                .then(() => message.channel.send(`${message.author}, vous avez changé la **bannière** du bot.`))
                                .catch(() => message.reply("Veuillez patienter avant de rechanger ma bannière"));
                        } else {
                            client.user.setBanner(content)
                                .then(() => message.reply(`Vous avez changé la **bannière** de votre bot.`))
                                .catch(() => message.reply("Veuillez patienter avant de rechanger ma bannière"));
                        }
                        break;
                    default:
                        message.reply("Option non valide. Veuillez choisir parmi: name, pic, banner");
                        break;
                }
            } else {
                message.reply("Veuillez fournir une option (name, pic, banner) suivie du contenu (nom ou lien).");
            }
        }
    }
};
