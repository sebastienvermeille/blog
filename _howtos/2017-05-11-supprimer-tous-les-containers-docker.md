---
layout: post
title: "[Docker] Stopper et supprimer tous les containers docker en 2 lignes"
description: Commandes pour stopper et supprimer tous les containers instanciés dans docker sur linux.
date: 2017-05-11 00:00
cover: ../media/cover/docker.png
lang: "fr"
published: true
comments: true
github: todo
tags: ['docker', 'linux']
---

Parfois on souhaite simplement nettoyer complètement son host docker. Attention c'est irréversible :nerd_face:

Pour désactiver tous les containers docker:
~~~
docker stop $(docker ps -a -q)
~~~



Pour supprimer tous les containers docker (ils doivent être stoppés au préalable):
~~~
docker rm $(docker ps -a -q)
~~~

Et voila !