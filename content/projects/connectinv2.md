---
title: Connect’In V2
tagline: Migration complète d’une API Laravel vers Spring Boot avec JWT
type: Backend / Migration
slug: connectinv2
year: 2025
tags: [Java, Spring Boot, Spring Security, JWT, Spring Data JPA, MySQL, Docker]
stats:
  - { value: "100%", label: "compatibilité frontend" }
  - { value: "5", label: "entités migrées" }
next:
  title: "VitaePresss"
  slug: "vitaepresss"
---

## Contexte

Après une première version fonctionnelle de Connect’In (réseau social interne) développée avec Laravel, la direction technique a imposé une harmonisation des backends vers Java. Mon équipe a dû remplacer entièrement l’API existante par une nouvelle version Spring Boot, **sans aucune modification du frontend** (qui avait été développé par un autre groupe). L’enjeu était de comprendre l’API originale, de reproduire ses routes et ses formats JSON à l’identique, tout en ajoutant une authentification JWT et une architecture en couches.

## Stack technique

- **Backend** : Java 25, Spring Boot, Spring Web, Spring Data JPA, Hibernate
- **Sécurité** : Spring Security, JWT
- **Base de données** : MySQL (via Docker)
- **Build** : Maven
- **Conteneurisation** : Docker, Docker Compose

## Phase 1 : Reverse engineering de l’API Laravel

J’ai analysé les endpoints de l’API existante (documentation Postman) et les modèles de données. J’ai reproduit le schéma relationnel en entités JPA (User, Post, Comment, Like). J’ai veillé à respecter les noms de champs JSON et les codes HTTP attendus par le frontend.

## Phase 2 : Implémentation Spring Boot

J’ai structuré le projet en couches : Controller, Service, Repository, DTO. L’authentification JWT protège les routes sensibles. Les règles métier (un utilisateur ne peut modifier que ses propres posts, suppression d’un post entraîne celle des commentaires, anonymisation au choix lors de la suppression de compte) sont implémentées dans les services. J’ai utilisé Spring Data JPA avec des méthodes dérivées pour les requêtes courantes.

## Phase 3 : Dockerisation et tests

J’ai écrit un `Dockerfile` multi‑stage pour l’application Spring Boot et un `docker-compose.yml` lançant l’app + MySQL. Les variables d’environnement (JWT secret, credentials BDD) sont passées via un `.env`. La commande `docker compose up --build` démarre l’ensemble. J’ai testé manuellement la compatibilité avec le frontend (connexion, création de posts, likes, commentaires) – tout fonctionne sans modification du code client.

## Résultat

Une API Spring Boot 100% compatible avec le frontend existant, conteneurisée et prête à être déployée. La migration a démontré ma capacité à lire et reproduire un système existant dans une autre technologie. Les livrables incluent le diagramme de BDD, une collection Postman mise à jour et un README d’installation.