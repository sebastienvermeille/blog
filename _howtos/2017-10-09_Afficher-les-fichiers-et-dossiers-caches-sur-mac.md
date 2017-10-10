---
layout: howto
title: "[Mac] Afficher les fichiers et dossiers cachés sur MacOS"
description: "Si vous en avez marre de ne pas voir les fichiers et dossiers cachés sur macOS ce tuto est fait pour vous."
date: 2017-10-09 00:00
cover: ../media/cover/apple.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/2017-10-09_Afficher-les-fichiers-et-dossiers-caches-sur-mac.md
tags: ['mac']
---

Dans terminal lancez :

```bash
defaults write com.apple.Finder AppleShowAllFiles true
killall Finder
```

Tada !
