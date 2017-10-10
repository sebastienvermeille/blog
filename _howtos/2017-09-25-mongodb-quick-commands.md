---
layout: howto
title: "[MongoDB] Commands snippet"
description: Commandes de base pour mongodb
date: 2017-09-25 00:00
cover: ../media/cover/mongodb.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/2017-09-25-mongodb-quick-commands.md
tags: ['mariadb', 'mysql']
---

Créer un utilisateur pour une base de donnée:
```sql
use <dbName>
db.createUser(
    {
      user: "<dbUser>",
      pwd: "<dbUserPassword>",
      roles: [
         { role: "readWrite", db: "<dbName>" },
      ]
    }
)
```
