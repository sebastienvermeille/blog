---
layout: howto
title: "[MongoDB] Commands snippet"
description: Commandes de base pour mongodb
date: 2017-09-25 00:00
cover: ../media/cover/mongodb.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/code.svermeille.com/blob/master/src/content/Databases/desactiver-les-foreign-keys-sur-mariadb-ou-mysql.md
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
