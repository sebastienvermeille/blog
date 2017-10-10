---
layout: howto
title: "[Docker] Installer Rancher 1.6 avec let's encrypt sur Ubuntu"
description: "Un guide complet pour installer Rancher 1.6 avec let's encrypt sur Ubuntu"
date: 2017-10-08 00:00
cover: ../media/cover/rancher.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/2017-10-08-Docker-Installer-Rancher%201.6-avec-lets-encrypt-sur-ubuntu.md
tags: ['docker', 'rancher', 'ssl', 'lets encrypt', 'linux']
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


(Nous installerons la version stable (1.6) dont l'interface graphique change sensiblement de celle de la vidéo mais le
principe reste le même)

# Infrastructure
Pour commencer voici une représentation de l'infrastructure que nous allons mettre en place dans ce tutoriel :

![Infrastructure overview](/assets/svg/install-rancher2-infrastructure.svg)

Bien évidemment vous pouvez l'adapter selon vos besoins mais c'est une bonne base pour comprendre et voir les
possiblités offertes par Rancher.

# Installation du serveur rancher

J'ai choisi d'utiliser un serveur Ubuntu Xenial (LTS) avec 4GO de ram.

## Installation de Docker CE

Pour commencer il faut ajouter le repo docker qui se trouve être en https. On ajoute donc ce qu'il faut pour gérer les
repository linux en https:

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


(ne plus faire) Finalement on installe docker CE :
```bash
sudo apt-get install docker-ce
```

(a la place) On installe une version docker compatible avec Rancher:

http://rancher.com/docs/rancher/v1.6/en/hosts/#supported-docker-versions

```bash
curl https://releases.rancher.com/install-docker/17.06.sh | sh
```

On vérifie que l'installation s'est bien déroulée :
```bash
docker -v

# Docker version 17.06.0-ce, build cec0b72

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

On contrôle que la configuration est valide en tapant la commande suivante dans /etc/nginx :

```bash
nginx -t
```

Si tout est ok on restart nginx:
```bash
sudo service nginx restart
```


## Installation de Rancher

Afin de préserver notre base de donnée lors des mises à jour de rancher nous allons externaliser le stockage
de la base de données de rancher sur le disque ce qui nous permettra de faire un backup aisément par la suite.

Pour cela nous créons un répertoire:

```bash
sudo mkdir -p /var/rancher/mysql
```

Création d'un container pour rancher:

```bash
sudo docker run \
--name rancher-server \
-p 8080:8080 \
--restart=unless-stopped \
-v /var/rancher/mysql:/var/lib/mysql \
-d rancher/server:stable
```

Parfait, Rancher va maintenant démarrer cela peut prendre quelques minutes.

Un petit contrôle:
```bash
docker ps

#CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                    PORTS                               NAMES
#77d82a733bae        rancher/server:stable    "/usr/bin/entry --..."   2 minutes ago       Up 2 minutes              3306/tcp, 0.0.0.0:8080->8080/tcp    rancher-server
```

Rendez-vous sur : rancher.votredomain.com

Si tout a fonctionné, vous serez automatiquement redirigé sur le https://rancher.votredomain.com

C'est le cas ? Parfait :)

# [Bonus] Backup automatique de la base de données Rancher

Pour éviter les nuits blanches tu backuperas !

Nous allons créer une tâche cron qui va backuper automatiquement la bdd rancher et placer les backups dans /var/rancher/backups.

Vous pouvez ensuite décider de comment vous souhaitez traiter ces archives ;)

Donc nous créons le répertoire de backup :

```bash
mkdir -p /var/rancher/backups
```

Nous créons un petit utilitaire de backup:
```bash
sudo nano /var/rancher/backup-util.sh
```

Contenu:
```shell
#!/bin/sh
now=$(date +"%m_%d_%Y")
echo "Backup started..."
docker exec -it rancher-server mysqldump -A > /var/rancher/backups/backup_$now.sql
echo "Rancher db backup stored in: /var/rancher/backups/backup_$now.sql"
```

On rend le fichier executable:
```bash
sudo chmod +x /var/rancher/backup-util.sh
```

On ajoute une tâche cron pour lancer le script 1 fois par semaine (à adapter selon vos besoins):
```bash
crontab -e

# backup rancher db every sunday
5 8 * * 7 /var/rancher/backup-util.sh
```

Nous aborderons d'autres points intéressants dans d'autre tutos à venir.

# Credits
https://store.docker.com/editions/community/docker-ce-server-ubuntu
https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-using-the-repository
https://medium.com/@chvanikoff/setting-up-rancher-with-ssl-d0491f258720
http://rancher.com/docs/rancher/latest/en/installing-rancher/installing-server/