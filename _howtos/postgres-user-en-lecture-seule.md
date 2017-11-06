---
layout: howto
title: "[Postgresql] Créer un user en lecture seule (readonly) pour une base de donnée"
description: Commandes a exécuter pour n'autoriser un utilisateur qu'à lire la bdd sans la modifier.
date: 2017-11-6 00:00
cover: ../media/cover/postgresql.png
lang: "fr"
published: true
comments: true
github:
tags: ['postgresql']
---

> Dans postgres, seul un user ayant accès à la base de donnée peut donner des accès à d'autres. Donc inutile d'essayer via 
l'utilisateur `postgres` de faire quoi que ce soit. (J'y ai laissé des cheveux!)

Donc pour commencer, on se connecte à notre base de donnée postgres avec un utilisateur qui dispose de suffisamment de droits:
```bash
psql -u <votreuser> -d <la base de donnée> -h <localhost ou ip de votre serveur>
```
Ensuite on créer un user `readonly` ou du nom que vous voulez :
```sql
CREATE USER readonly WITH ENCRYPTED PASSWORD unmotdepasse;
```

Et pour terminer on l'autorise à se connecter et à faire des SELECT:
```sql
GRANT CONNECT ON DATABASE baseDeDonnees TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO readonly;
```

Tadaaa
