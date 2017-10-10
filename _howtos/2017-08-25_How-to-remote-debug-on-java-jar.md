---
layout: howto
title: "[JAVA] Débugger un JAR à distance"
description: La solution
date: 2017-06-14 00:00
cover: ../media/cover/java.png
lang: "fr"
published: true
comments: true
github: https://github.com/sebastienvermeille/blog/blob/master/_howtos/2017-08-25_How-to-remote-debug-on-java-jar.md
tags: ['java']
---

Il faut lancer le jar non pas avec un java -jar mais:

java -xDebug vos params -jar lejar.jar

Ensuite on peut s'y connecter depuis notre IDE.

Tada ! 
