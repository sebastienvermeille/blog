---
layout: howto
title: "[Postgresql] Ecrire des requêtes performantes
description: Sur de grosses tables un simple update peut devenir très lent et paralyser votre système. Voici une briève liste des bons tuyaux que j'ai récupéré sur IRC, Stackoverflow et autres.
date: 2017-07-06 00:00
cover: ../media/cover/postgresql.png
lang: "fr"
published: true
comments: true
github: 
tags: ['postgresql', 'linux']
---

Quand on travaille sur de petites tables avec peu de données tout va bien mais lorsque les tables font plusieurs Go un simple update peut devenir un casse-tête !

Naivement j'ai commencé par écrire mes scipts comme ceci:
```sql
UPDATE ma_table SET type = 'VEGETABLE' WHERE UPPER(name) = 'CAROT';
UPDATE ma_table SET type = 'VEGETABLE' WHERE UPPER(name) = 'APPLE';
UPDATE ma_table SET type = 'DRINK' WHERE UPPER(name) = 'SODA';
UPDATE ma_table SET type = 'DRINK' WHERE UPPER(name) = 'WATER';
```  
Le problème, c'est que sous cette forme postgres va faire :

* boucle sur tous les élément et update carot
* boucle sur tous les élément et update carot
* boucle sur tous les élément et update carot
* boucle sur tous les élément et update carot

Ca prend du temps !

Solution: Utiliser le CASE ... WHEN ... END :
```sql
UPDATE ma_table SET type = CASE
  WHEN UPPER(name) = 'CAROT' THEN 'VEGETABLE'
  WHEN UPPER(name) = 'APPLE' THEN 'VEGETABLE'
  WHEN UPPER(name) = 'SODA' THEN 'DRINK'
  WHEN UPPER(name) = 'WATER' THEN 'DRINK'
  END;
```  
Ainsi nous n'avons qu'une seule boucle. Evident après lecture mais après 3 ans d'études pas mal orientées SQL je n'ai jamais vu une pareil syntaxe. (Fabuleuse !)

Voilà c'était les astuces du jour :) Si vous en avez d'autres partagez s'il vous plait !
