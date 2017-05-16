---
layout: post
title: "[MariaDB/MySQL] Comment désactiver et réactiver les foreign keys"
description: Commande pour désactiver et/ou réactiver les contraintes de clés étrangères dans une base de données MariaDB ou MySQL
date: 2012-04-02 00:00
cover: ../media/cover/mariadb.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/code.svermeille.com/blob/master/src/content/Databases/desactiver-les-foreign-keys-sur-mariadb-ou-mysql.md
tags: ['mariadb', 'mysql']
---

Voici une méthode simple qui permet de désactiver le controle des clés étrangères. (Utile si on souhaite supprimer une table par exemple)

```sql
SET foreign_key_checks = 0;
```



Pour réactiver le contrôle des clés étrangères :
```sql
SET foreign_key_checks = 1;
```