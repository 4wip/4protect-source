https://dsc.gg/4wip - Si ta besoin d'aide (discord)

Créer un bot
```
･ Rendez-vous sur le site : https://discord.com/developers/applications
･ Cliquez sur "Nouvelle Application"
･ Dans l'onglet "Bot", cochez les 3 "Privileged Gateway Intents" (Presence, Server, Message Content).
･ Réinitialisez le token et garder le (donner à personne).
Pour inviter le bot
･ Allez dans l'onglet "Oauth2", puis dans "OAuth2 URL Generator", cochez "bot" et "administrator".
･ Copiez et collez l'URL générée dans un autre onglet.
```

Héberger 24/7 sur Render | Gratuit (PC et Mobile)
```
Faites un fork du gitHub : https://github.com/4wip/Crowbot-Setup/fork
Sur le site Render, créez un compte (c'est le bouton sign in) : https://render.com/

Créez un service web:
Lien: le fork que tu vien de faire

Paramètres :
Région : Virginia
Runtime : Node
Commande de construction : "npm i"
Commande de démarrage : "node index.js"
Type d'instance : Gratuit ou autre

Variables d'environnement :
token : meeae898787 (tu met le token de ton bot)
NODE_VERSION : 16.20.0 (Si tu le met pas le bot va pas marcher)

Enfin, créez votre service web
Allez dans l'onglet "logs" sur Render pour voir si l'indication suivante : "Connecté à Nomdetonbot". Cela signifie que votre bot est en ligne et marche (sa peut prendre du temps)
```
Maintenir le bot en ligne 24/7
```
Sur le site cron-job.org, créez un compte (bouton sign up)
Dans le tableau de bord (dashboard en anglais), allez dans l'onglet "Cronjobs" et créez un nouveau Cronjob:

Nom : Le nom que vous souhaitez. (sa a aucun impacte sur le bot)
URL : Utilisez l'URL de votre service web sur Render (voir l'image).
Calendrier d'exécution : Chaque minute.
Créez le Cronjob.
votre bot fonctionne maintenant 24/7.
```
![image](https://github.com/4wip/Crowbot-Fix/assets/168364544/9c70adb6-34f7-44fe-97ad-78b46c2795bf)

## Crédit

Ce bot a été créé par **Betaaaaaaaaaaa** modifiée par moi.
