# Projet Javascript Licen Pro

## Objectif

Le but est de réaliser une application complète en JS. Cette application sera decoupé en micro service et chaque **équipe** vas realiser une des parties de de l'application.

Chaque équipe va réaliser le [CRUD ](https://fr.wikipedia.org/wiki/CRUD) d'un type d'entité. Chaque **équipe** va se voir designer un type d'entité.

| Type | Description |
|-------|-------------|
| cheeses | Permet d'ajouter des Fromages |
| beers | Permet d'ajouter des Bières |
| books | Permet d'ajouter un Livre |
| coffees | Permet d'ajouter un Café |
| coins | Permet d'ajouter une [Médailles du souvenir](https://www.monnaiedeparis.fr/fr/boutique/medailles-souvenirs) |
| linux | Permet de d'ajouter une Distribution Linux |
| cities | Permet d'ajouter une Ville |
| candies | Permet de definir un Bonbon |
| cve | Permet de definir une [CVE](https://fr.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures) |
| episodes | Permet d'ajouter un Episode de série télé |
| newspapers | Permet d'ajouter un Journal papier |
| stars | Permet d'ajouter une [Etoile](https://fr.wikipedia.org/wiki/%C3%89toile) |
| games | Permet d'ajouter un Jeu Vidéo |
| trees | Permet d'ajouter un Arbre |
| cars | Permet d'ajouter une Voiture |
| rockets | Permet d'ajouter une Fusée |

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
5) Copier le fichier ``env.sammple`` vers ``.env` et renseigner le type.
6) Faire un commit
7) [Supprimer](https://help.github.com/en/github/using-git/removing-a-remote) la remote **origin** de votre repository.
8) [Ajouter](https://help.github.com/en/github/using-git/adding-a-remote) une remote **origin** qui pointe vers le repository github que vous avez créé.
9) Pusher votre branch **master** sur votre remote **origin**
10) Faire un docker-compose up

## Les étapes 

### Client HTTP

La première étapes du projet est de réaliser un librairie qui permet de faire les requêtes HTTP vers votre backend. Comme vous n'avez pas encore réalisé votre back-end vous allez utiliser un mock. C'est un serveur qui fake les résultat à partir d'une spec openapi v3. Pour y accéder ``http://localhost:5080/fake``

Une spec openapi permet de décrire votre api rest. C'est un format standadisé. Vous pouvez consulter cette spec sur ``http://localhost:5080/spec``

Ce serveur utilise la lib [fakeit](https://github.com/JustinFeng/fakeit)

L'objectif est d'implementer les appels fetch dans le fichier ``sandbox-fetch/index.html``. Vous pouvez tester via l'url ``http://localhost:5080/sandbox-fetch``

### Backend

Vous allez implementer le backend de votre micro service avec Express. Vous allez devoir respecter la specification openapi.

### Front 

Vous aller implementer le backend de votre front avcec React.
