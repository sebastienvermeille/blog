---
layout: howto
title: "[Git] Oups j'ai oublié de faire une branche feature et j'ai commit mes changements sur la branche locale master."
description: La solution
date: 2017-06-14 00:00
cover: ../media/cover/git.png
lang: "fr"
published: true
comments: true
github: 
tags: ['git']
---

Je vous passe les détails mais en deux mot j'ai commité des changement dans la branche locale master. Et du coup problème... je ne peux pas commit sur origin/master sans que les collègues fassent une review du code.

Mais alors que faire ???

Pas de panique :)

```bash
git branch -M master nouveau-nom-de-votre-branche-locale # renomme la branche locale
git fetch origin refs/heads/master:refs/heads/master #
```
Ensuite on suppose que vous en avez créé une du même nom sur le serveur (origin). Pour faire pointer votre nouvelle branche locale manuellement vers celui-ci:

```bash
git branch -u origin/nom-de-votre-branche-distante nom-de-votre-branche-locale
```

Tada ! 
