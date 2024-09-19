const { Client, Intents, guild, Collection } = require('discord.js');
const Discord = require("discord.js")
const config = require('./config')
const httpport = require('./oport.js')
const { readdirSync } = require("fs")
const db = require('quick.db')
const p = new db.table("Prefix")
const logembed = new db.table("embedlog")
const { Player } = require('discord-player');
ms = require("ms")
const color = config.app.color
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
    restTimeOffset: 0,
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});

client.login(process.env.token);
client.commands = new Collection();

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  modération Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const commandFiles = readdirSync('./moderation').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./moderation/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  BotControl Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const botcontrolFiles = readdirSync('./botcontrol').filter(file => file.endsWith('.js'));
for (const file of botcontrolFiles) {
    const command = require(`./botcontrol/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  Gestion Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const gestionFiles = readdirSync('./gestion').filter(file => file.endsWith('.js'));
for (const file of gestionFiles) {
    const command = require(`./gestion/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  utilities Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const utilitiesFiles = readdirSync('./utilities').filter(file => file.endsWith('.js'));
for (const file of utilitiesFiles) {
    const command = require(`./utilities/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  logs Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const logsFiles = readdirSync('./logs').filter(file => file.endsWith('.js'));
for (const file of logsFiles) {
    const command = require(`./logs/${file}`);
    client.commands.set(command.name, command);
}
//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  antiraid Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const antiraidFiles = readdirSync('./antiraid').filter(file => file.endsWith('.js'));
for (const file of antiraidFiles) {
    const command = require(`./antiraid/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Event Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

global.player = new Player(client, config.app.discordPlayer);

//ANTI CRASH
process.on("unhandledRejection", (reason, p) => {
    if (reason.code === 50007) return; // Cannot send messages to this user
    if (reason.code == 10062) return; // Unknown interaction
    if (reason.code == 10008) return; // Unknown message
    if (reason.code ==  50013) return; // Missing permissions
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(type, promise, reason);
});
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on("warn", e => {
    console.log(e.replace(regToken, "[REDACTED]"));
});
client.on("error", e => {
    console.log(e.replace(regToken, "[REDACTED]"));
});

client.snipes = new Map()
client.on('messageDelete', function (message, channel) {

    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})
