---
layout: howto
title: "[Docker] Installer Rancher2 avec Kubernates sur Ubuntu"
description: "Un guide complet pour installer Rancher 2 avec Kubernates sur Ubuntu"
date: 2017-10-07 00:00
cover: ../media/cover/rancher.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/2017-10-07-Docker-Installer-Rancher2-avec-kubernates-sur-ubuntu.md
tags: ['docker', 'rancher', 'kubernates', 'linux']
---

# Introduction

Qu'est-ce que Rancher ?

Rancher est une plateforme d'orchestration de containers Dockers.

Le mieux pour vraiment comprendre l'intérêt de Rancher c'est que vous regardiez cette petite vidéo en français :

[Devoxx France - Furmaniak et Yekhlef](https://www.youtube.com/watch?v=QFqt8xMTChY&t=955s)

Ce qui m'a séduit personnellement dans rancher :
* Il fournit une interface graphique très bien pensée qui va nous simplifier grandement la tâche de deploiement
de mes containers dockers.

* Avec Rancher je n'ai plus besoin de me connecter à chaque serveur de deploiement et faire mes deploiments à la mano

* Si demain je veux deployer sur un 2e serveur certains services je vais dans l'interface je dis que je veux 2 instances
et hop il va s'occuper de tout pour moi.


(Nous installaerons la version 2 dont l'interface graphique change sensiblement de celle de la vidéo mais le principe reste le même)

# Infrastructure
Pour commencer voici une représentation de l'infrastructure que nous allons mettre en place dans ce tutoriel :

![Infrastructure overview](/assets/svg/install-rancher2-infrastructure.svg)

Bien évidemment vous pouvez l'adapter selon vos besoins mais c'est une bonne base pour comprendre et voir les
possiblités offertes par Rancher.

# Installation du serveur "RANCHER MASTER"

J'ai choisi d'utiliser un serveur Ubuntu Xenial (LTS) avec 2GO de ram.

## Installation de Docker CE

Pour commencer il faut ajouter le repo docker qui se trouve être en https. On ajoute donc ce qu'il faut pour gérer les répos https:

```bash
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```

On ajoute le repo officiel docker:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

On défini qu'on ne veut utiliser que les versions stable du repo:
```bash
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

On met à jour notre liste de paquets apt:
```bash
sudo apt-get update
```

Finalement on installe docker CE :
```bash
sudo apt-get install docker-ce
```

On vérifie que l'installation s'est bien déroulée :
```bash
docker -v

# Docker version 17.09.0-ce, build afdb6d4

```

## Préparation des certificats SSL pour rancher.votredomain.tld

Cette partie s'inspire de [ce tuto](https://medium.com/@chvanikoff/setting-up-rancher-with-ssl-d0491f258720):

```bash
cd ~
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
./certbot-auto
```

L'erreur suivante apparait:
> Failed to find executable apache2ctl in PATH: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games

Il suffit de taper:
```bash
./certbot-auto certonly
```

Ensuite choisissez l'option: 1. (Spin up a temporary webserver (standalone))

Puis saisissez votre adresse email (elle sera utilisée pour vous informer qu'il faut renouveler votre certificat ssl)

Puis:
> A

Ensuite:
> N

Ensuite le nom de domaine:
> rancher.votredomain.tld

Appuyez sur enter et voila les certificats sont prêts.

## Installation de nginx

Nous installons ensuite un serveur nginx qui redirigera les requêtes effectuées sur le port 80 vers le port 443 (https)
avec nos certificats précédemment créés.

Installation de nginx:
```bash
sudo apt-get install nginx
```

Configuration pour utiliser les certificats:
```bash
sudo nano /etc/nginx/nginx.conf
```

Contenu du fichier:
```perl
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections  1024;
}

http {
  upstream target {
      server rancher.votredomain.tld:8080;
  }

  server {
      listen 443 ssl spdy;
      server_name rancher.votredomain.tld;
      ssl_certificate /etc/letsencrypt/live/rancher.votredomain.tld/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/rancher.votredomain.tld/privkey.pem;

      location / {
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_set_header X-Forwarded-Port $server_port;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass http://target;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "Upgrade";
          # This allows the ability for the execute shell window to remain open for up to 15 minutes. Without this parameter, the default is 1 minute and will automatically close.
          proxy_read_timeout 900s;
      }
  }

  server {
      listen 80;
      server_name rancher.votredomain.tld;
      return 301 https://$server_name$request_uri;
  }
}
```

To get sure your nginx configuration is ok run the following command in /etc/nginx/ directory:

```bash
nginx -t
```

If everything is okay simply restart nginx:
```bash
sudo service nginx restart
```


## Install Rancher 2

At this moment, rancher2 is only available as a technical preview version moreless robust. Fair enough for my personal
usage but if it's not your case I would suggest you to install the stable releases.

```bash
sudo docker run -d --restart=unless-stopped -p 8080:8080 rancher/server:preview
```

As you can see rancher is a docker image. So it is quite easy to migrate from one to another version of rancher.

That's it :)

# Credits
https://store.docker.com/editions/community/docker-ce-server-ubuntu
https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-using-the-repository
https://medium.com/@chvanikoff/setting-up-rancher-with-ssl-d0491f258720