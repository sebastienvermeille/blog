---
layout: howto
title: "[Docker] Rancher - Mettre à jour un container sans interruption"
description: "Avec rancher vous pouvez faire vos release sans perturbation."
date: 2017-10-08 00:00
cover: ../media/cover/rancher.png
lang: "fr"
published: true
comments: true
github:
tags: ['docker', 'rancher']
---

# Introduction

Dans ce tutoriel nous allons voir comment :

* Créer une stack rancher
* Ajouter un service à la stack (~ container docker)
* Mettre à jour sans interruption les services de la stack.
* Annuler (Rollback) la mise à jour en cas de problème

# Création d'une stack dans Rancher

Une stack peut être assimilée à un groupe de différents containers/services.
Par exemple, si vous hébergez 3 sites vous ferez généralement 3 stacks.

On se lance!

Survolez le menu **STACKS** et sélectionnez **User**:

![](/media/howto/rancher-stack-user-select.png)

Remplissez le formulaire:

![](/media/howto/rancher-stack-add.png)


Cliquez sur **Create**.

 Parfait notre stack est prête.

On va maintenant lui ajouter ce que rancher appelle un service. Une stack peut contenir plusieurs type de services comme
des load balancers par exemple.

# Ajouter un service à une stack

Cliquez sur **Add Service** (attention, pas sur la flèche à droite du bouton):

![](/media/howto/rancher-add-service.png)

Nous utiliserons [une image docker](https://github.com/docker/labs/blob/master/beginner/static-site/Dockerfile) qui va
simplement afficher une page web dans un serveur Nginx.

Remplissez le formulaire:

![](/media/howto/rancher-add-service-form.png)

Quelques explications:

**Scale**: indique le nombre d'instance du container que nous souhaitons créer. Ici 1.
**Always pull image before creating**: Demande a docker de récupérer la derniere version à chaque fois qu'on instanciera
un container du type "mon-siteweb".
**Select Image**: L'image docker que nous souhaitons utiliser. Notez la présence de **:latest** qui spécifie qu'on veut
la toute dernière version publiée.
**Host Port**: Le port public qui sera donc accessible via: ip du serveur : port public
**Container Port**: Le port publié par le container (dans le cas de nginx le serveur publie sur le port 80)

Il nous reste encore quelque réglages à définir:

![](/media/howto/rancher-service-settings.png)

**Console**: None (nous n'en avons pas besoin)
**Auto Restart**: **Très important** il faut le mettre à Never (Start Once). Si vous mettez auto restart qui peut apriori
semblez sympa comme fonctionalité vous aurez de sérieux problèmes lors de la mise à jour de vos container avec Rancher.

Maintenant que le formulaire est correctement rempli, cliquez sur le bouton **Create**.

Rancher va maintenant déployer votre container docker (cela peut prendre jusqu'à 30 secondes). Une fois terminé vous
verrez le status passer de **Activating** à **Active**:

![](/media/howto/rancher-stack-ready.png)

Si vous cliquez sur le lien : **8991** vous pourrez accéder au siteweb:

![](/media/howto/hello-docker.png)

Parfait. Nous avons donc un container qui est en production sur notre serveur. Voyons maintenant comme le mettre à jour
sans interruption.

# Le processus de mise à jour de containers utilisé par Rancher

Avant de nous lancer dans la pratique voici une petite explication de ce que fait Rancher lorsqu'on fait une mise à jour
de container.

![](/media/howto/rancher-upgrade-process.png)

Nous pouvons également définir que nous voulons stopper le container existant et seulement ensuite démarrer celui qui
contient la mise à jour. Rancher est très flexible :)

# C'est parti on fait une mise à jour sans interruption

Cliquez sur le bouton **Upgrade** de votre stack:

![](/media/howto/rancher-upgrade-button.png)

Remplissez le formulare et voici ce qui se passe:

![](/media/howto/rancher-upgrade-container.gif)

Vous avez plusieurs choix après un upgrade:

* Valider l'upgrade (finish)
* Annuler l'upgrade (rollback)

![](/media/howto/rancher-upgrade-actions.png)

# Conclusion

Nous avons vu comment déployer un container et le mettre à jour sans interruption avec Rancher, un outil indispensable.