---
title: My Cinema
tagline: Back-office de gestion cinématographique avec PHP/MVC et API REST
type: Full-stack
slug: mycinema
year: 2025
tags: [PHP, MySQL, MVC, API REST, PDO, JavaScript, CSS]
stats:
  - { value: "3", label: "entités gérées" }
  - { value: "100%", label: "prévention conflits séances" }
next:
  title: "Klivio Intégration"
  slug: "klivio"
---

## Contexte

Le gérant d’un nouveau cinéma avait besoin d’un outil d’administration pour piloter ses films, ses salles et le planning des séances. L’objectif était de créer un back-office complet sans framework, centré sur une logique back-end robuste (POO, MVC, CRUD) et une API consommée par un frontend séparé. Aucune maquette n’était imposée, laissant libre cours à l’ergonomie tout en imposant des règles métier strictes (pas de chevauchement de séances, suppression conditionnelle des films).

## Stack technique

- **Frontend** : HTML5, CSS3, JavaScript (fetch API)
- **Backend** : PHP 8.3 (POO, MVC maison)
- **Base de données** : MySQL avec PDO
- **Outils & hébergement** : Git, DB Diagram, (Docker optionnel)
- **Autres** : Architecture API REST, requêtes préparées, pagination

## Phase 1 : Modélisation et entités

J’ai commencé par implémenter le modèle relationnel fourni (films, salles, séances). Chaque table a sa classe Entité (Film, Salle, Seance) avec propriétés privées et getters/setters. J’ai écrit le script SQL incluant les clés étrangères et les contraintes d’intégrité.

## Phase 2 : Contrôleurs et logique métier

Dans l’architecture MVC maison, les contrôleurs (FilmController, SalleController, SeanceController) exposent des endpoints REST. La difficulté majeure fut la vérification des conflits horaires : avant d’insérer une séance, le backend calcule la durée du film et vérifie qu’aucune autre séance n’occupe la même salle sur une plage horaire qui se chevauche. J’ai écrit une méthode `checkOverlap()` qui interroge la base avec des requêtes préparées.

## Phase 3 : Frontend et API

Le frontend (simple mais accessible) appelle l’API via `fetch`. Les listes sont paginées côté serveur. Un écran unique permet la gestion des films, salles et séances avec des formulaires dynamiques. J’ai ajouté des validations côté client pour une meilleure UX, mais toutes les règles métier sont redoublées en PHP.

## Résultat

Une application fonctionnelle où le gérant peut créer, modifier, supprimer des entités sans risque de double réservation. La suppression d’un film est bloquée si des séances lui sont associées. L’API est documentée implicitement par le code, et le projet respecte les contraintes de sécurité (requêtes préparées, échappement des sorties). Le livrable inclut le script SQL et un README détaillé.