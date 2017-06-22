---
layout: howto
title: "[Ubuntu] UEFI et Virtualbox = VERR_VM_DRIVER_NOT_INSTALLED (-1908)"
description: Si vous obtenez cette erreur VERR_VM_DRIVER_NOT_INSTALLED (-1908) sous ubuntu alors cet article pourra surement vous aider.
date: 2017-06-27 00:00
cover: ../media/cover/virtualbox.png
lang: "fr"
published: true
comments: true
github: todo
tags: ['ubuntu', 'linux', 'virtualbox']
---
Erreurs au lancement d'une vm sur virtualbox:
The virtual machine 'Ubuntu 16.04 LTS' has terminated unexpectedly during startup with exit code 1 (0x1).

VERR_VM_DRIVER_NOT_INSTALLED (-1908) - The support driver is not installed. On linux, open returned ENOENT. 

# Solution
il semblerait qu'ubuntu et uefi pose problème pour la virtualisation. Il faut faire une petite manip:

https://flavioprimo.xyz/os/how-to-install-virtualbox-on-ubuntu-having-uefi-secure-boot-enabled/
