---
layout: howto
title: "[Git] Faire pointer master vers une autre branche"
description: Parfois on part sur une V2 complètement différente (autre techno par exemple). A quoi bon merger la nouvelle branche dans master... autant dire que master est cette nouvelle branche maintenant.
date: 2017-07-23 00:00
cover: ../media/cover/git.png
lang: "fr"
published: true
comments: true
github: 
tags: ['git']
---

Suite à un changement drastique de technologie pour un backend j'ai été amené à changer mon master.

J'avais donc quelque chose proche de ceci:

> master

> features/migration-to-other-technology

Et une fois la migration prête je souhaitais avoir : master = features/migration-to-other-technology

Alors oui j'aurais pu faire un merge de la feature dans master... mais après il aurait fallu supprimer les anciens fichiers plus utilisés etc.

La solution:

```bash
git checkout master # on recupère master
git reset --hard features/migration-to-other-technology # on reset vers notre nouvelle branche master
git push -f origin master # on push
```

Tada votre master est totalement changé et vous n'avez rien perdu de votre historique git ! 
