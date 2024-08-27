const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require("../config");
const db = require('quick.db');

const cl = new db.table("Color");
const p1 = new db.table("Perm1");
const p2 = new db.table("Perm2");
const p3 = new db.table("Perm3");
const owner = new db.table("Owner");

module.exports = {
    name: 'role',
    description: `Permet d'accéder à des informations sur un rôle.`,
    async execute(client, message, args) {
        try {
            let color = cl.get(`color_${message.guild.id}`) || config.app.color;

            const perm1 = p1.get(`perm1_${message.guild.id}`);
            const perm2 = p2.get(`perm2_${message.guild.id}`);
            const perm3 = p3.get(`perm3_${message.guild.id}`);

            const isOwner = owner.get(`owners.${message.author.id}`);
            const hasPermission = [perm1, perm2, perm3].some(perm => message.member.roles.cache.has(perm));
            const isAuthorized = isOwner || hasPermission || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id);

            if (!isAuthorized) 
                return message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande.');

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
            if (!role) 
                return message.channel.send('Veuillez préciser un rôle.');

            let membersWithRole = role.members.map(member => member.user.tag).filter((value, index, self) => self.indexOf(value) === index);

            const perms = {
                KICK_MEMBERS: "Expulser des membres",
                BAN_MEMBERS: "Bannir des membres",
                MANAGE_WEBHOOKS: "Gérer les webhooks",
                VIEW_AUDIT_LOG: "Voir les logs du serveur",
                MANAGE_ROLES: "Gérer les rôles",
                MANAGE_CHANNELS: "Gérer les salons",
                MANAGE_GUILD: "Gérer le serveur"
                // Ajoutez d'autres permissions dangereuses ou élevées ici si nécessaire
            };

            const dangerousPerms = Object.keys(perms).filter(perm => role.permissions.has(perm));

            const allPermissions = dangerousPerms.map(perm => perms[perm]).join(", ");

            const roleEmbed = new MessageEmbed()
                .setColor(color)
                .addField("Nom du rôle", `<@&${role.id}>`)
                .addField("Couleur Hex", role.hexColor === "#000000" ? "Classique" : role.hexColor)
                .addField("ID du rôle", role.id)
                .addField("Est-il affiché séparément ?", role.hoist ? "Oui" : "Non")
                .addField("Est-il Mentionable ?", role.mentionable ? "Oui" : "Non")
                .addField("Est-il géré par une intégration", role.managed ? "Oui" : "Non")
                .addField("Permissions principales", allPermissions || "Aucune")
                .setFooter(config.app.footer);

            const membersButton = new MessageButton()
                .setCustomId('members_button')
                .setLabel('Membres avec le rôle')
                .setStyle('PRIMARY');

            const removeRoleButton = new MessageButton()
                .setCustomId('remove_role_button')
                .setLabel('Supprimer le rôle à un membre')
                .setStyle('DANGER');

            const closeButton = new MessageButton()
                .setCustomId('close_button')
                .setLabel('Fermer')
                .setStyle('SECONDARY');

            const row = new MessageActionRow()
                .addComponents(membersButton, removeRoleButton, closeButton);

            const sentMessage = await message.channel.send({ embeds: [roleEmbed], components: [row] });

            const filter = i => ['members_button', 'remove_role_button', 'close_button'].includes(i.customId) && i.user.id === message.author.id;

            const collector = sentMessage.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async i => {
                if (i.customId === 'members_button') {
                    if (membersWithRole.length > 0) {
                        const membersEmbed = new MessageEmbed()
                            .setColor(color)
                            .setTitle(`Membres ayant le rôle ${role.name}`)
                            .setDescription(membersWithRole.join('\n'));

                        await i.reply({ embeds: [membersEmbed], ephemeral: true });
                    } else {
                        await i.reply({ content: 'Aucun membre n\'a ce rôle.', ephemeral: true });
                    }
                } else if (i.customId === 'remove_role_button') {
                    const mention = await message.channel.send("Veuillez mentionner le membre auquel vous souhaitez supprimer le rôle.");

                    const filter = response => {
                        return message.author.id === response.author.id && response.mentions.members.first();
                    };
                
                    message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
                        .then(async collected => {
                            const member = collected.first().mentions.members.first();
                            
                            if (!member) {
                                return message.channel.send("Membre introuvable.");
                            }
                
                            try {
                                await member.roles.remove(role);
                                await message.channel.send(`Le rôle ${role.name} a été supprimé avec succès à ${member.user.tag}.`);
                            } catch (error) {
                             
                            }
                        })
                        .catch(() => {
                        
                        });
                
                    mention.delete();
                } else if (i.customId === 'close_button') {
                    await sentMessage.delete();
                }
            });

            collector.on('end', () => {
                row.components.forEach(component => component.setDisabled(true));
                sentMessage.edit({ components: [row] });
            });

        } catch (error) {
            console.error("Une erreur est survenue lors de l'exécution de la commande 'role':", error);
        }
    }
};
