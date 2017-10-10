---
layout: howto
title: "[MariaDB/MySQL] Comment désactiver et réactiver les foreign keys"
description: "Commande pour désactiver et/ou réactiver les contraintes de clés étrangères dans une base de données MariaDB ou MySQL"
date: 2012-04-02 00:00
cover: ../media/cover/mariadb.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/2012-04-02-desactiver-les-foreign-keys-sur-mariadb-ou-mysql.md
tags: ['mariadb', 'mysql']
---

Voici une méthode simple qui permet de désactiver le controle des clés étrangères. (Utile si on souhaite 
supprimer une table par exemple)

```sql
-- disable constraints
SET foreign_key_checks = 0;
```



Pour réactiver le contrôle des clés étrangères :
```sql
-- reenable constraints
SET foreign_key_checks = 1;
```