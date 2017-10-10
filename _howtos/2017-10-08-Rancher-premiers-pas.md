---
layout: howto
title: "[Docker] Rancher - Premiers pas"
description: "Pour bien commencer avec Rancher"
date: 2017-10-08 00:00
cover: ../media/cover/rancher.png
lang: "fr"
published: true
comments: true
github: 
tags: ['docker', 'rancher']
---

# Introduction

Vous venez d'installer votre serveur Rancher et vous souhaitez commencer à l'utiliser.

Parfait ! Voyons ensemble les possibilités qui nous sont offertes avec Rancher.

# Authentification

Juste après l'installation de Rancher le serveur est accessible publiquement à tous. Il faut donc immédiatement
 définir une stratégie d'authentification.

Rancher nous propose de nombreuses stratégies :

![Active Directory, Azure AD, Github, Local, OpenLDAP, Shibboleth](/media/howto/rancher-auth-strategies.png)

Nous verrons ici 3 des stratégies que j'ai utilisé:

* Local
* Github
* OpenLDAP

## Statégie d'authentification de type "Local"

C'est la stratégie la plus basique. Elle consiste à stocker directement sur le serveur
Rancher des utilisateurs avec login et mot de passe.

![Formulaire de configuration](/media/howto/rancher-local-auth.png)

On défini un login pour l'administrateur et on active la stratégie d'authentification locale.

Rien de bien compliqué ici. Néanmoins ce type d'authentification n'est pas
suffisamment sécurisé en l'état. En effet aucun système anti bruteforce n'est mis en place et vous
devrez mettre en place un outil de type fail2ban ou autre pour palier à cette lacune.

## Stratégie d'authentification de type "Github"

Ma préférée. Cette méthode vous permet d'utiliser votre compte Github pour vous authentifier sur le
serveur Rancher.

Elle offre un réel avantage par rapport à la méthode "Local" qui est de déleguer tout le traffic
 d'authentification à Github. Ainsi si quelqu'un de mal intentionné souhaite forcer le passage, c'est
 les serveurs de Github et non votre Rancher qui subiront la menace. Et à l'évidence, Github dispose d'une
 bien meilleure infrastructure que nous pour palier à ce genre d'attaques.

![Formulaire de configuration authentification Github](/media/howto/rancher-github-auth.png)

Pour installer cette authentification il suffit de créer une application Github ici:


Et ensuite de fournir le Client ID et le Client Secret dans les champs prévus.

Très simple :) merci Github.

## Stratégie d'authentification de type "OpenLDAP"

Pour ceux qui veulent faire les choses en grandes pompes ou au format "Enterprise" ceci devrait
vous plaire.

En 2 mots on peut s'authentifier via un serveur LDAP comme le titre nous l'indique.

![Formulaire configuration authentification LDAP](/media/howto/rancher-ldap-auth.png)

Ceux qui ont un serveur LDAP sauront certainement remplir ces champs. Si besoin n'hésitez pas à demander
et je ferai un tuto plus détaillé sur le sujet.

# Les Hosts

Je préfère les appeler des esclaves car je trouve cette approche plus claire. Nous avons donc un master (le serveur rancher).
C'est lui qui va pouvoir orchestrer tout ce qui se passe.

Et nous avons des slaves (Hosts) qui sont des serveurs sur lesquels vont être deployés les containers selon les ordres du master (Le serveur Rancher).

Après l'installation de votre serveur Rancher vous verrez certainement un message:

> Before adding your first service or launching a container, you'll need to add a Linux host with a supported version of Docker.

C'est assez déroutant car vous venez d'installer votre serveur Rancher et ... il vous en demande déjà des autres.

Mais pourquoi pas commencer par héberger des containers sur ce même serveur ?

Exactement ! C'est ce qu'on va faire.

Cliquez sur "Infrastructure > Hosts > Add a Host"

![](/media/howto/rancher-add-master-as-host.png)

Retournez sur "Infrastructure > Hosts" et tadaaa vous avez votre premier Host installé.

On peut biensur en ajouter d'autre et c'est même vivement recommandé.

# Les Stacks

On peut voir une stack comme un projet généralement.
Une stack est un groupe de services qui vont ensemble créer une application.

Par exemple, on peut imaginer une stack qui s'appelle "blog" et qui sera composé de plusieurs
services :

* Container wordpress
* Container mysql
* Load balancer

# Les repo dockers: Registry

Si comme moi vous avez des projets privés et que vous ne souhaitez pas publier votre code source sur DockerHub (Pour
un site perso par exemple), vous allez avoir besoin d'un repository docker dit: privé (Private docker registry).

> Sachez que gitlab (copie de github) vous permet d'héberger des repository git privés gratuitement mais et ce n'est pas tout
également de builder vos images docker et de les publier sur un repository privé gitlab dont vous seul avec l'accès ! Et tout
cela gratuitement :)

Revenons à nos moutons donc sur Rancher on peut très facilement ajouter des repo dockers privés ou publics via l'interface.

Pour se faire il suffit de se rendre sur "Infrastructure > Registries"

Puis cliquez sur "Add registry":

![Formulaire d'ajout de repository docker](/media/howto/rancher-add-registry.png)

Comme on peut le voir sur l'image les repo privés sont supportés !