---
layout: howto
title: "[Mac] Activer les déplacement de souris linéaires sur MacOS"
description: "Pour ceux qui veulent un mouvement de souris identique à ce qu'ils ont sur linux et windows."
date: 2017-09-24 00:00
cover: ../media/cover/apple.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/2017-09-24_Enable-linear-mouse-moves-on-mac.md
tags: ['mac']
---

Petite note: cela ne modifiera pas le trackpad (très bien je trouve car ça vous permet de continuer à faire du photoshop avec les doigts !)

Dans terminal lancez :

```bash
defaults write .GlobalPreferences com.apple.mouse.scaling -1
```

Tada ! 
