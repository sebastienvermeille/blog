---
layout: howto
title: "[Docker] Rancher - Configurer un load balancer"
description: "Rancher nous permet de rediriger un domaine ou sous-domaine vers un service (container)."
date: 2017-10-18 00:00
cover: ../media/cover/rancher.png
lang: "fr"
published: true
comments: true
github:
tags: ['docker', 'rancher']
---

# Introduction

Dans ce tutoriel nous allons voir comment :

* Créer un load-balancer via l'interface graphique de Rancher
* Configurer le load-balancer

# Création d'un load balancer avec Rancher

Une stack peut être assimilée à un groupe de différents containers/services.
Dans notre cas nous allons créer une stack qui s'occupera uniquement de contenir notre load-balancer.

Survolez le menu **STACKS** et sélectionnez **User**. Cliquez ensuite sur **Add stack** et remplissez le formulaire :

![](/media/howto/rancher-create-load-balancer-stack.png)

Cliquez sur *save* et voila notre stack est prête.

On va maintenant créer le load balancer:

![](/media/howto/rancher-add-load-balancer.png)

Point très important: nous allons définir que le load balancer doit être hébergé par le serveur sur lequel nous feront 
pointer les dns:

![](/media/howto/rancher-add-load-balancer-service.png)

Ainsi maintenant je pourrai configurer tous mes dns pour que les domaines et sous-domaines pointent vers **master** et 
ensuite c'est le load balancer qui les redirigera.

Ne cliquez pas sur **save** tout de suite nous devons encore configurer le load balancer.

# Configurer le load-balancer

Cliquez sur **add service rule** :

![](/media/howto/rancher-load-balancer-services.png)

> Note: Pour que le domaine www.domain.com et domain.com pointent sur le même service nous devons malheureusement créer 
2 entrées malgré l'utilisation de l'astérisque (*) (voir image ci-dessus.)

# Conclusion

J'ai eu beaucoup de mal à arriver à ce résultat et j'ai dailleurs été aidé par @Superseb du support Rancher sur slack. 
Ce n'est certainement pas la seule et unique façon de faire mais ça à le mérite de fonctionner.