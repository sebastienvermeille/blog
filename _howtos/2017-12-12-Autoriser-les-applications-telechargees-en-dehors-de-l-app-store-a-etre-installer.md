---
layout: howto
title: "[Mac] Autoriser les applications téléchargées a être installées sur mac
description: "Une ligne de commande pour en finir définitivement avec cette sécurité complètement inutile."
date: 2017-12-12 00:00
cover: ../media/cover/apple.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/
tags: ['mac']
---

Dans terminal lancez :

```bash
sudo spctl --master-disable
```

Saisissez votre mot de passe administrateur et voila !

Tada ! 
