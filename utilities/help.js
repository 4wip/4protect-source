const Discord = require("discord.js")
const config = require("../config")
const db = require('quick.db')
const p = new db.table("Prefix")
const cl = new db.table("Color")
const owner = new db.table("Owner")
const footer = config.app.footer
const paginationEmbed = require('discordjs-button-pagination')

module.exports = {
    name: 'help',
    usage: 'help',
    category: "utils",
    description: `Permet d'afficher l'help.`,
    async execute(client, message, args) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px
        
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color
/*
    if (args[0] === "msg") {

            const premiumTier = {
                NONE: 0,
                TIER_1: 1,
                TIER_2: 2,
                TIER_3: 3,
            };

            const embed = new Discord.MessageEmbed()
                .setTitle(`Arguments de messages`)
                .setDescription(`Exemple de message simple: \`{MemberMention} nous a rejoint,  nous sommes maintenant {MemberCount} sur {Server}\``)
                .addFields(
                    { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Funny`', inline: true },
                    { name: '{MemberMention}', value: `Mentionne le membre concerné\n\`Exemple:\` <@${message.author.id}>`, inline: true },
                    { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple: Funny#0666`', inline: true },
                )
                .addFields(
                    { name: '{MemberID}', value: `L'ID du membre concerné\n\`Exemple: ${message.author.id}\``, inline: true },
                    { name: '{MemberCount}', value: `Le nombre total de membres sur le serveurn\n\`Exemple: ${message.guild.memberCount}\``, inline: true },
                    { name: '{Server}', value: `Le nom du serveur\n\`Exemple: ${message.guild.name}\``, inline: true },
                )
                .addFields(
                    { name: '{ServerBoostsCount}', value: `Le nombre de boost du serveur\n\`Exemple: ${message.guild.premiumSubscriptionCount || '0'}\``, inline: true },
                    { name: '{ServerLevel}', value: `Le niveau actuel du serveur\n\`Exemple: ${premiumTier[message.guild.premiumTier]}\``, inline: true },
                    { name: '{VocalMembersCount}', value: `Le nombre total de membres en vocal sur le serveur\n\`Exemple: ${message.guild.members.cache.filter(m => m.voice.channel).size}\``, inline: true },
                )
                .addFields(
                    { name: '{OnlineMembersCount}', value: `Le nombre total de membres en ligne sur le serveur\n\`Exemple: ${message.guild.presences.cache.filter((presence) => presence.status !== "offline").size}\``, inline: true },
                )
                .setColor(color)

            message.channel.send({ embeds: [embed] })
            return
        }
*/

        if (args[0] === "all") {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const public = new Discord.MessageEmbed()
                .setTitle('Commandes Publiques - Pas Finis')
                .setDescription(`
    
    **\`${pf}all <bots/admins>\`**
    **\`${pf}banner\`**
    **\`${pf}pic\`**
    **\`${pf}calc <calcul>\`**
    **\`${pf}lookup <membre>\`**
    **\`${pf}help\`**
    **\`${pf}helpall\`**
    **\`${pf}ping\`**
    **\`${pf}find <membre>\`**
    **\`${pf}serveur <info/pic/banner>\`**
    **\`${pf}snipe\`**
    **\`${pf}support\`**
    **\`${pf}wiki <mot-clé>\`**
    **\`${pf}vc\`**
    **\`${pf}bypass\`**
    
              `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)


            //Embed perm1

            const perm1 = new Discord.MessageEmbed()
                .setTitle('Permission 1')
                .setDescription(`
    
    **\`${pf}role\`**
    **\`${pf}voicemute\`**
    **\`${pf}voiceunmute\`**
    **\`${pf}roleinfo\`**
    **\`${pf}mute\`**
    
              `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)



            //Embed perm2

            const perm2 = new Discord.MessageEmbed()
                .setTitle('Permission 2')
                .setDescription(`
    

    **\`${pf}hide\`**
    **\`${pf}unhide\`**
    **\`${pf}clear\`**
    
    
    `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)

            const perm3 = new Discord.MessageEmbed()
                .setTitle('Permission 3')
                .setDescription(`
    
    **\`${pf}lock\`**
    **\`${pf}unlock\`**
    **\`${pf}renew\`**
    **\`${pf}embed\`**
    **\`${pf}emoji\`**
    **\`${pf}ban\`**
    **\`${pf}kick\`**
    **\`${pf}unban\`**
    
    `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)

            //Embed permgs

            const permgs = new Discord.MessageEmbed()
                .setTitle('Permission Gestion Staff')
                .setDescription(`
              
    **\`${pf}addrole\`**
    **\`${pf}delrole\`**
    
              `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)

            //Embed permgp

            const permgp = new Discord.MessageEmbed()
                .setTitle('Permission Gestion Permissions')
                .setDescription(`
          
    **\`${pf}pall\`**
    **\`${pf}padmin\`**
    **\`${pf}pban\`**
    **\`${pf}pkick\`**
    **\`${pf}prole\`**
    **\`${pf}pserveur\`**
    **\`${pf}pview\`**
    **\`${pf}pvoc\`**
    **\`${pf}pwebhooks\`**
    **\`${pf}pvoc\`**
    **\`${pf}peveryone\`**    
    
          `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)



            //Embed permga

            const permga = new Discord.MessageEmbed()
                .setTitle('Permission Giveaway')
                .setDescription(`
                              
    **\`${pf}giveaway\`**
    **\`${pf}end\`**
    **\`${pf}reroll\`**
                              `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)


            const owner = new Discord.MessageEmbed()
                .setTitle('Permission Owner')
                .setDescription(`
                
    **\`${pf}wl [membre/role]\`**
    **\`${pf}unwl [membre/role]\`**
    **\`${pf}derank [membre/all]\`**
    **\`${pf}hide [salon/all]\`**
    **\`${pf}unhide [salon/all]\`**
    **\`${pf}lock [salon/all]\`**         
    **\`${pf}antijoin add/remove <membre>\`**           
    **\`${pf}vl/unvl <membre>\`**          
    **\`${pf}blv/unblv/ <membre>\`**
    **\`${pf}presetlogs\`**
    **\`${pf}messagelog\`**
    **\`${pf}modlog\`**
    **\`${pf}ticketlog\`**
    **\`${pf}giveawaylog\`**
    **\`${pf}boostlog\`**
    **\`${pf}raidlog\`**
    
                              `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)


            const buyer = new Discord.MessageEmbed()
                .setTitle('Bot Control')
                .setDescription(`
                              
    **\`${pf}mybot\`**
    **\`${pf}prefix\`**
    **\`${pf}theme <#00001>\`**
    **\`${pf}set <name/pic/banner> [nom/lien]\`**
    **\`${pf}say <message>\`**
    **\`${pf}mp [membre/all]\`**
    **\`${pf}<online/idle/dnd/invisible>\`**
    **\`${pf}<playto/listen/watch/stream/compet> <texte>\`**
    **\`${pf}bl <membre/clear>\`**
    **\`${pf}unbl <membre>\`**
    **\`${pf}owner <membre>\`**
    **\`${pf}unowner <membre>\`**
    **\`${pf}serverlist\`**
    **\`${pf}invite [ID]\`**
    **\`${pf}leave [ID]\`**
    **\`${pf}reboot\`**
     
                              `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)


            const button1 = new Discord.MessageButton()
                .setCustomId('gauche')
                .setLabel('◀')
                .setStyle('DANGER');

            const button2 = new Discord.MessageButton()
                .setCustomId('droite')
                .setLabel('▶')
                .setStyle('DANGER');


            pages = [
                public,
                perm1,
                perm2,
                perm3,
                permgs,
                permgp,
                permga,
                owner,
                buyer,
            ];

            buttonList = [
                button1,
                button2
            ]

            paginationEmbed(message, pages, buttonList);
            return
        }

/*
// Fin de la commande +help all
*/

        let helpm = db.get(`help`)
        if (helpm == null) helpm = 'help'

        if (helpm == 'help') {

            const row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('help')
                    .setPlaceholder(`Choisissez une catégorie`)
                    .addOptions([
                        {
                            label: 'Utilitaire',
                            value: 'help',
                            emoji: "1247866358645919745",
                        },
                        {
                            label: 'Antiraid',
                            value: 'antiraid',
                            emoji: "1247866358645919745",
                        },
                        {
                            label: 'Logs',
                            value: 'logs',
                            emoji: "1247866358645919745",
                        },
                        {
                            label: 'Gestion Serveur',
                            value: 'gestion',
                            emoji: "1247866358645919745",
                        },
                        {
                            label: 'Modération',
                            value: 'moderation',
                            emoji: "1247866358645919745",
                        },
                        {
                            label: 'Owner',
                            value: 'owner',
                            emoji: '1247866358645919745',
                        },
                        {
                            label: 'Propriétaire',
                            value: 'own',
                            emoji: '1247866358645919745',
                        },
                    ])
            )

            //Embed Help

            const Help = new Discord.MessageEmbed()
            .setTitle("Utilitaire")
            .setDescription(`
*Les paramètres encadrés par* \`<>\` *sont obligatoires, tandis que ceux encadrés par* \`[]\` *sont facultatifs.*

**\`${pf}help\`**
Vous permet d'obtenir l'intégralité des commandes du bot et leurs informations.

**\`${pf}help all\`**
Vous permet d'obtenir l'intégralité des commandes assignées aux role selons leurs niveaux de permissions.

**\`${pf}pic [membre]\`**
Affiche la photo de profil d'un utilisateur.

**\`${pf}banner [membre]\`**
Affiche la photo de profil d'un utilisateur.

**\`${pf}lookup [membre]\`**
Permet de voir des informations sur un utilisateur.

**\`${pf}find [membre]\`**
Permet de savoir dans quel salon vocal un membre se trouve.

**\`${pf}serveur <pic/banner/info>\`**
Permet d'avoir des informations sur le serveur.

**\`${pf}vc\`**
Permet de voir les statistiques du serveur.

**\`${pf}snipe\`**
Permet de voir le dernier message effacé.

**\`${pf}ping\`**
Permet de voir la latence du bot en milli-secondes.

**\`${pf}emoji <emoji>\`**
Permet de prendre un émoji et l'ajouter au serveur.

**\`${pf}calc <calcul>\`**
Permet d'effectuer un calcul.

**\`${pf}wiki <mot-clé>\`**
Permet de faire une recherche wikipédia.

**\`${pf}bypass\`**
Permet de voir quelles rank peuvent bypass des permissions.

**\`${pf}support\`**
Permet d'avoir le serveur support du bot.

      `)
            .setFooter({ text: `${footer} | Préfixe : ${pf}` })
            .setColor(color)

            //Embed Owner

            const Owner = new Discord.MessageEmbed()
                .setTitle('Owner')
                .setDescription(`
*Les paramètres encadrés par* \`<>\` *sont obligatoires, tandis que ceux encadrés par* \`[]\` *sont facultatifs.*

**\`${pf}wl [membre/role]\`**
Permet de gérer la whitelist du bot.

**\`${pf}unwl [membre/role]\`**
Permet de gérer la whitelist du bot.

**\`${pf}derank [membre/all]\`**
Permet d'enlever tous les roles d'un membre.

**\`${pf}hide [salon/all]\`**
Permet de rendre inivisible un salon.

**\`${pf}unhide [salon/all]\`**
Permet de rendre visible un salon.

**\`${pf}lock [salon/all]\`**
Permet de bloquer les messages d'un salon.
                
**\`${pf}antijoin add/remove <membre>\`**
Empeche l'accès à un salon vocal sauf pour les membres vl/wl/owner.
                
**\`${pf}vl/unvl <membre>\`**
Les membres vocal whitelist seront autorisés à rejoindre les vocaux interdit.
                
**\`${pf}blv/unblv/ <membre>\`**
Blacklist vocal un membre du serveur, il ne pourra rejoindre aucun salon vocal.

          `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)


            //Embed Gestion

            const Gestion = new Discord.MessageEmbed()
                .setTitle("Gestion serveur")
                .setDescription(`
*Les paramètres encadrés par* \`<>\` *sont obligatoires, tandis que ceux encadrés par* \`[]\` *sont facultatifs.*

**\`${pf}set/del perm1/2/3/gs/gp/ga <role>\`**
Permet de configurer le niveau de permission associé à un role.

**\`${pf}perm list\`**
Affiche la configuration des perms configurés sur le serveur.

**\`${pf}soutien\`**
Permet de choisir un role et un statut de soutien afin de récompenser les membres qui ont le statut.

**\`${pf}all <bots/admins>\`**
Affiche la liste des bots/administrateurs présents sur le serveur.

**\`${pf}ticket\`**
Permet de créer un système de ticket personnalisé sur le serveur.

**\`${pf}transcript\`**
Recupère tous les messages d'un salon.

**\`${pf}ticketset\`**
Créer un système ticket pré-défini.

**\`${pf}permticket <role>\`**
Permet de configuré un role qui aura accès aux tickets.

**\`${pf}setcategorie <ID>\`**
Permet de séléctionner la catégorie où seront ouvert les tickets.

**\`${pf}tempvoc\`**
Affiche un menu interactif pour gérer les vocaux temporaires sur le serveur.

**\`${pf}embed\`**
Permet d'ouvrir une menu interactif pour créer un embed.

**\`${pf}renew\`**
Permet de recréer le salon.

**\`${pf}emoji <emoji>\`**
Permet de créer un émoji sur le serveur.

**\`${pf}buttonrole <role> <description>\`**
Créer un embed pour que les gens puissent cliqué pour avoir un role.

**\`${pf}join settings\`**
Permet de configurer les paramètres du join settings.
                
**\`${pf}join role <role>\`**
Attribue un role automatiquement aux membres qui rejoignent le serveur.
                
**\`${pf}join channel <salon>\`**
Choisis le salon où seront envoyés les messages de bienvenue.

`)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)




            //Embed Modération

            const moderation = new Discord.MessageEmbed()
                .setTitle('Modération')
                .setDescription(`
*Les paramètres encadrés par* \`<>\` *sont obligatoires, tandis que ceux encadrés par* \`[]\` *sont facultatifs.*

**\`${pf}vmove <membre/salon> [salon]\`**
Permet de move des membres vers une autre vocal.

**\`${pf}hide [salon]\`**
Permet de rendre invisible un salon.

**\`${pf}unlock [salon]\`**
Permet de débloquer les messages d'un salon.

**\`${pf}addrole <membre> <role>\`**
Permet d'ajouter un role à un membre.

**\`${pf}delrole <membre> <role>\`**
Retire un role à un membre.

**\`${pf}massiverole add/remove <role>\`**
Donne/retire un role à tous les membres du serveur.

**\`${pf}temprole <membre> <role> <durée>\`**
Permet de donner des roles temporaire. (durée <24j)

**\`${pf}temprole list\`**
Permet d'accèder au menu des roles temporaire.

**\`${pf}kick <membre> [raison]\`**
Expulse un membre du serveur.

**\`${pf}ban <membre> [raison]\`**
Ban un membre du serveur.

**\`${pf}mute <membre> [durée]\`**
Rendre muet un membre. (maximum 27j)

**\`${pf}unmute <membre>\`**
Redonne la parole un membre.

**\`${pf}unban <membre/all>\`**
Unban un membre du serveur.

**\`${pf}clear [nombre]\`**
Supprime 1 ou plusieurs messages.

**\`${pf}voicemute <membre> [raison]\`**
Mute un membre en vocal.

**\`${pf}voiceunmute <membre>\`**
Unmute un membre en vocal.

`)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)
            //Embed logs

            const logs = new Discord.MessageEmbed()
                .setTitle('Logs')
                .setDescription(`
*Les paramètres encadrés par* \`<>\` *sont obligatoires, tandis que ceux encadrés par* \`[]\` *sont facultatifs.*

**\`${pf}presetlogs\`**
Créer et configure automatiquement tous les salons logs.

**\`${pf}messagelog\`**
Affiche toutes les logs des messages supprimés ou édités.

**\`${pf}modlog\`**
Affiche toutes les logs des actions de modération.

**\`${pf}ticketlog\`**
Affiche les logs des tickets.

**\`${pf}giveawaylog\`**
Affiche les logs de chaque Giveaway lancé dans le serveur.

**\`${pf}boostlog\`**
Affiche une log dès qu'une personne boostera le serveur.

**\`${pf}raidlog\`**
Permet d'afficher les logs des embeds supprimés.

                    
                          `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)

            const antiraid = new Discord.MessageEmbed()
                .setTitle('Antiraid')
                .setDescription(`
*Les paramètres encadrés par* \`<>\` *sont obligatoires, tandis que ceux encadrés par* \`[]\` *sont facultatifs.*

**\`${pf}sanction\`**
Permet de choisir la sanction si un membre non owner/wl tente de faire une action non autorisé.

**\`${pf}secur\`**
Configurer les protections de l'antiraid sur le serveur.

**\`${pf}secur on\`**
Active toutes les protections de l'antiraid.

**\`${pf}secur off\`**
Désactive toutes les protections de l'antiraid.

Commandes [+]
**\`${pf}antiadmin on/off\`**
**\`${pf}antiban on/off\`**
**\`${pf}antiupdate on/off\`**
**\`${pf}antibot on/off\`**
**\`${pf}antidown on/off\`**
**\`${pf}antilink invite/all/off\`**
**\`${pf}antieveryone on/off\`**
**\`${pf}antichannel create on/off\`**
**\`${pf}antichannel delete on/off\`**
**\`${pf}antichannel update on/off\`**
**\`${pf}antirole create on/off\`**
**\`${pf}antirole delete on/off\`**
**\`${pf}antirole update on/off\`**
**\`${pf}antiwebhook on/off\`**
**\`${pf}server lock/unlock\`**


                          `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)

            const own = new Discord.MessageEmbed()
                .setTitle('Contrôle du bot')
                .setDescription(`
*Les paramètres encadrés par* \`<>\` *sont obligatoires, tandis que ceux encadrés par* \`[]\` *sont facultatifs.*

**\`${pf}mybot\`**
Obtenir une invitation du bot.

**\`${pf}prefix\`**
Permet de changer le préfixe du bot.

**\`${pf}theme <#00001>\`**
Permet de changer la couleur du theme (en Hex) du bot.

**\`${pf}set <name/pic/banner> [nom/lien]\`**
Permet de changer le nom, la photo de profil ou la bannière du bot.

**\`${pf}say <message>\`**
Permet d'envoyer des messages avec le bot.

**\`${pf}mp [membre/all]\`**
Permet d'envoyer un message à un membre ou à tous les membres.

**\`${pf}<online/idle/dnd/invisible>\`**
Permet de changer le statut du bot.

**\`${pf}<playto/listen/watch/stream/compet> <texte>\`**
Permet de changer l'activité du bot.

**\`${pf}bl <membre/clear>\`**
Permet d'ajouyer un utilisateur à la blacklist ou de la formatter.

**\`${pf}unbl <membre>\`**
Permet de retirer un utilisateur de la blacklist.

**\`${pf}owner <membre>\`**
Permet d'ajouter un membre à la liste des owners.

**\`${pf}unowner <membre>\`**
Permet de retirer un membre de la liste des owners.

**\`${pf}serverlist\`**
Permet d'obtenir la liste des servers où se trouvent le bot.

**\`${pf}invite [ID]\`**
Permet de faire une invitation vers serveur via le bot.

**\`${pf}leave [ID]\`**
Permet de faire quitter le bot d'un serveur.

**\`${pf}reboot\`**
Permet de redémarrer le bot.

                          `)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color)


        message.channel.send({ embeds: [Help], components: [row] }).then(async msg => {
            const collector = message.channel.createMessageComponentCollector({
                componentType: "SELECT_MENU",
                filter: (i => i.user.id === message.author.id)
            });

            collector.on("collect", async (collected) => {
                collected.deferUpdate();
                const value = collected.values[0];

                if (value === "help") {
                    msg.edit({ embeds: [Help], components: [row] });
                } else if (value === "moderation") {
                    msg.edit({ embeds: [moderation], components: [row] });
                } else if (value === "owner") {
                    msg.edit({ embeds: [Owner], components: [row] });
                } else if (value === "own") {
                    msg.edit({ embeds: [own], components: [row] });
                } else if (value === "antiraid") {
                    msg.edit({ embeds: [antiraid], components: [row] });
                } else if (value === "gestion") {
                    msg.edit({ embeds: [Gestion], components: [row] });
                } else if (value === "logs") {
                    msg.edit({ embeds: [logs], components: [row] });
                }
            });
        });

        }
    }
};
