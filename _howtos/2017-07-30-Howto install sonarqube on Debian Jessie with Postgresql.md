---
layout: howto
title: "[SonarQube] Comment installer sonarqube sur Debian Jessie avec PostgreSQL"
description: Un petit guide sur l'installation de sonarqube pour debian avec postgresql
date: 2017-07-31 00:00
cover: ../media/cover/sonar.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/2017-07-30-Howto%20install%20sonarqube%20on%20Debian%20Jessie%20with%20Postgresql
tags: ['debian', 'sonar', 'sonarqube', 'postgresql']
---

# Les pré-requis pour suivre ce tutorial
* Avoir un serveur sous Debian 8 (Jessie)
* Avoir installé wget (sudo apt-get install wget -y)
* Avoir installé unzip (sudo apt-get install unzip -y)
* Avoir installé chkconfig (sudo apt-get install chkconfig)
* Avoir un accès ssh au serveur

# Les pré-requis hardware conseillés par Sonarqube:
* 2Gb de RAM dédiées à Sonarqube
* L'espace disque dépend de votre projet. Sonarqube.com utilise postgresql 9.5 et utilise 15Gb de stockage.

# Installation

Nous allons installer ce que recommande sonarqube sur sa page (https://docs.sonarqube.org/display/SONAR/Requirements)[https://docs.sonarqube.org/display/SONAR/Requirements].

## Installation d'Oracle JRE 8
Le JRE d'oracle n'est pas disponible dans les dépots Debian pour des raison de licenses.

Mais, WebUpd8 a créer son dépot privé et nous le fourni gratuitement.

Ajout du dépot PPA:
```bash
echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | \
  sudo tee /etc/apt/sources.list.d/webupd8team-java.list
  
echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | \
  sudo tee -a /etc/apt/sources.list.d/webupd8team-java.list
  
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886

sudo apt-get update

sudo apt-get install oracle-java8-installer
```

Oracle vous demande d'accepter sa license. (Autant dire que vous n'avez pas trop le choix :) )

Petit test pour voir que l'installation s'est bien déroulée:
```bash
java -version

# java version "1.8.xyz"                                  
# Java(TM) SE Runtime Environment (xyu)                                
# Java HotSpot(TM) 64-Bit Server VM (xyz) 
```

## Installation d'OpenJDK 8

On ajoute le dépot backport:
```bash
echo "deb http://http.debian.net/debian jessie-backports main" | \
sudo tee /etc/apt/sources.list.d/jessie-backports.list

sudo apt-get update

sudo apt-get install -t jessie-backports openjdk-8-jdk
```

Un petit contrôle que tout est ok entre le JDK et le JRE
```bash
sudo update-java-alternatives --list

# java-1.8.0-openjdk-amd64 1069 /usr/lib/jvm/java-1.8.0-openjdk-amd64 <---- openjdk 1.8 = 8
# java-8-oracle 1081 /usr/lib/jvm/java-8-oracle   <----- JRE 8
```

## Installation de PostgreSQL 9.6

(On peut installer également du OracleDB, MySQL ou MS SQL Server)
J'ai fais ce choix simplement parce que j'ai lu dans la doc que Sonarqube.com utilise postgresql donc je présume que si un bug survient, l'équipe sera instantannément au courant :).

(Oui je sais ils ont surement des environment de test automatisés :) )

C'est parti:
```bash
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

echo "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" | \
sudo tee /etc/apt/sources.list.d/pgdg.list

sudo apt-get update

sudo apt-get install postgresql postgresql-contrib
```

Petit contrôle:
```bash
psql --version

# psql (PostgreSQL) 9.6.3
```

Super on peut passer à la suite :)

## Création d'un user et d'une base de donnée pour SonarQube

On se connecte à postgres:
```bash
sudo su - postgres
psql
```
(Si jamais pour fermer ce terminal il suffit de taper \q + enter -> ctrl + X ne fonctionnera pas :)

On crée notre utilisateur (toujours depuis le terminal postgres):
```sql
CREATE USER sonar WITH PASSWORD 'yourpassword'; -- Je l'ai appelé sonar mais vous êtes libre d'en choisir un autre
```

On crée ensuite la base de donnée:
```sql
CREATE DATABASE sonar; -- Pareil vous pouvez changer le nom
```

On autorise notre utilisateur à tout faire sur cette base de donnée:
```sql
GRANT ALL PRIVILEGES ON DATABASE sonar to sonar;
```

On quitte le terminal psql: "\q"

On se déconnecte de "psql" pour revenir à notre utilisateur classique:
```bash
exit
```

## Installation de sonarqube:

On récupère l'archive de la version qui nous intéresse sur la page sonarqube : (https://www.sonarqube.org/downloads/)[https://www.sonarqube.org/downloads/]

Dans le cas de ce tuto nous utiliserons la version 6.4 non LTS mais libre à vous de choisir la release LTS l'installation se fera de la mme manière.

```bash
sudo mkdir /opt/sonarqube
cd /opt/sonarqube
sudo wget https://sonarsource.bintray.com/Distribution/sonarqube/sonarqube-6.4.zip
sudo unzip sonarqube-6.4.zip -d .
sudo rm sonarqube-6.4.zip
```
Maintenant on adapte le fichier de configuration pour que sonarqube puisse accéder à la base de donnée:

```bash
sudo nano /opt/sonarqube/sonarqube-6.4/conf/sonar.properties
```

Ajouter les valeurs correspondantes :
> sonar.jdbc.username=sonar

> sonar.jdbc.password=votreMotDePasse

> sonar.jdbc.url=jdbc:postgresql://localhost/sonar <-- sonar = le nom de votre base de donnée

> sonar.web.javaOpts=-server -Xmx1024m

> sonar.web.host=192.0.0.1  <-- l'ip locale de la machine par exemple.

> sonar.web.port=80

## Démarrer le serveur sonarqube

Le script de démarrage se trouve dans le dossier:
```bash
cd /opt/sonarqube/sonarqube-6.4/bin/linux-x86-64/sonar.sh # pour un debian en 64 bits sinon choisissez linux-x86-32
```
Il suffit donc de lancer ce script :
```bash
sudo /opt/sonarqube/sonarqube-6.4/bin/linux-x86-64/sonar.sh start
```

## Définir sonarqube en tant que service

sudo nano /etc/init.d/sonar

```shell
#!/bin/sh
#
# rc file for SonarQube
#
# chkconfig: 345 96 10
# description: SonarQube system (www.sonarsource.org)
#
### BEGIN INIT INFO
# Provides: sonar
# Required-Start: $network
# Required-Stop: $network
# Default-Start: 3 4 5
# Default-Stop: 0 1 2 6
# Short-Description: SonarQube system (www.sonarsource.org)
# Description: SonarQube system (www.sonarsource.org)
### END INIT INFO
 
/usr/bin/sonar $*
```

Création du lien symbolique:
```bash
sudo ln -s /opt/sonarqube/sonarqube-6.4/bin/linux-x86-64/sonar.sh /usr/bin/sonar
```

```bash
sudo chmod 755 /etc/init.d/sonar
sudo chkconfig --add sonar
```

Voila maintenant on peut faire ceci :

```bash
sudo service sonar start
sudo service sonar stop
sudo service sonar restart
```

Votre serveur est lancé il suffit d'y accéder soit par http://localhost soit via l'ip locale ou publique de votre serveur ;)
