# Projet Javascript Licen Pro

## Objectif

Le but est de réaliser une application complète en JS. Cette application sera decoupé en micro service et chaque **équipe** vas realiser une des parties de de l'application.

Chaque équipe va réaliser le [CRUD ](https://fr.wikipedia.org/wiki/CRUD) d'un type d'entité. Chaque **équipe** va se voir designer un type d'entité.

| Type | Description |
|-------|-------------|
| cheese | Permet d'ajouter des Fromages |
| beer | Permet d'ajouter des Bières |
| book | Permet d'ajouter un Livre |
| coffee | Permet d'ajouter un Café |
| coin | Permet d'ajouter une [Médailles du souvenir](https://www.monnaiedeparis.fr/fr/boutique/medailles-souvenirs) |
| linux | Permet de d'ajouter une Distribution Linux |
| city | Permet d'ajouter une Ville |
| candy | Permet de definir un Bonbon |
| cve | Permet de definir une [CVE](https://fr.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures) |
| serie | Permet d'ajouter un Episode de série télé |
| newspaper | Permet d'ajouter un Journal papier |
| star | Permet d'ajouter une [Etoile](https://fr.wikipedia.org/wiki/%C3%89toile) |
| game | Permet d'ajouter un Jeu Vidéo |
| tree | Permet d'ajouter un Arbre |
| car | Permet d'ajouter une Voiture |
| rocket | Permet d'ajouter une Fusée |

## Besoins

Pour faire ce projet vous avez besoin : 
* Git
* Docker
* Docker-compose

## Commencer le projet

1) Cloner ce repository
2) [Créer](https://help.github.com/en/github/getting-started-with-github/create-a-repo) un repository privé sur Github
3) [Ajouter](https://help.github.com/en/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository) les autres membre de votre équipe comme collaborateur
4) Ajouter **claudusd** comme collaborateur sur le repository.
5) Ecrire dans un fichier *.projet_type* à la racine de votre projet le type d'entité qui vous est designé.
6) Faire un commit
7) [Supprimer](https://help.github.com/en/github/using-git/removing-a-remote) la remote **origin** de votre repository.
8) [Ajouter](https://help.github.com/en/github/using-git/adding-a-remote) une remote **origin** qui pointe vers le repository github que vous avez créé.
9) Pusher votre branch **master** sur votre remote **origin**
10) Faire un docker-compose 

## Les étapes 

### Client HTTP

La première étapes du projet est de réaliser un librairie qui permet de faire les requêtes HTTP vers votre backend. Dans un premier temps vous allez 

### 