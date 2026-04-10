---
title: Connect’In
tagline: Réseau social interne d’entreprise – API Laravel + Frontend Tailwind
type: Full-stack
slug: connectin
year: 2025
tags: [Laravel, PHP, MySQL, Tailwind CSS, JavaScript, API REST, JWT]
stats:
  - { value: "3", label: "rôles d’interaction" }
  - { value: "0", label: "rechargement page" }
next:
  title: "My Cinema"
  slug: "mycinema"
---

## Contexte

Pour renforcer les liens entre collaborateurs d’une ESN, j’ai développé un réseau social interne complet : Connect’In. L’application permet aux employés de publier des messages, commenter, liker, et gérer leur profil. L’architecture sépare strictement un backend API REST (Laravel) d’un frontend statique qui consomme l’API. L’authentification par token (JWT) garantit que seuls les salariés connectés peuvent interagir.

## Stack technique

- **Backend** : Laravel (PHP, Eloquent ORM), JWT (via tymon/jwt-auth)
- **Frontend** : HTML, Tailwind CSS, JavaScript (fetch)
- **Base de données** : MySQL
- **Outils** : Git, Postman, Swagger (documentation API)
- **Bonus** : Pagination, filtrage des posts

## Phase 1 : Conception BDD et modèles Laravel

J’ai dessiné le MCD (utilisateurs, posts, commentaires, likes) avec les relations : un post appartient à un user, un commentaire appartient à un user et à un post, un like est unique par (user, post). J’ai créé les migrations, les modèles Eloquent et les relations `hasMany`, `belongsTo`. J’ai implémenté la suppression de compte avec deux options : anonymisation des contenus ou suppression en cascade.

## Phase 2 : API et authentification

J’ai exposé des endpoints REST : `/api/register`, `/api/login`, `/api/posts` (CRUD), `/api/posts/{id}/comments`, `/api/posts/{id}/like`. Le middleware `auth:api` protège les routes sensibles. Dans les contrôleurs, j’ai vérifié les autorisations (policy : seul l’auteur peut modifier/supprimer son post). Les likes sont toggle (un seul like par utilisateur). Les réponses JSON sont structurées pour être consommées directement par le frontend.

## Phase 3 : Frontend dynamique sans rechargement

Le frontend en Tailwind CSS affiche le fil d’actualité. À chaque action (ajout de post, like, commentaire), JavaScript envoie une requête `fetch` avec le token JWT stocké dans `localStorage`. La réponse met à jour le DOM (nouveau post ajouté en haut, compteur de likes incrémenté). Aucune page ne se recharge. J’ai ajouté une pagination infinie et un filtre par date.

## Résultat

Un réseau social interne complet, fluide et sécurisé. Les utilisateurs peuvent interagir en temps réel. L’API est documentée avec Swagger, le diagramme BDD est fourni. Le projet a été livré avec un README d’installation (migrations, seeders, clé JWT). Ce fut une excellente mise en pratique de Laravel et de l’intégration API-frontend.