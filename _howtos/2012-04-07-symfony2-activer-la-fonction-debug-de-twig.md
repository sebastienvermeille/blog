---
layout: post
title: "[Symfony2] Activer la fonction debug de Twig"
description: Comment activer la fonction debug sur twig
date: 2012-04-07 00:00
cover: ../media/cover/twig.png
lang: "fr"
published: true
comments: true
github: todo
tags: ['php', 'symfony']
---

Après avoir passé passablement de temps à chercher dans la doc voici comment activer l’extension de débogage de twig.

Il faut modifier le fichier app/config_dev.yml en lui ajoutant ceci :

{% raw %}
<pre><code>
services:
    twig.extension.debug:
        class: Twig_Extensions_Extension_Debug
        tags: [ { name: 'twig.extension' } ]
</code></pre>
{% endraw %}

Ensuite dans votre fichier twig (ex : test.html.twig) :

{% raw %}
<pre><code>
{% debug %} => Affichera toutes les variables assignées au moteur de template (semblable à la console de débogage de Smarty pour ceux qui connaissent)

{% debug varname %} => Affiche les infos relatives à la variable template « varname »
</code></pre>
{% endraw %}
Voila j’espère que cela vous fera gagner du temps !