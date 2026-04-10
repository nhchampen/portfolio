---
title: Klivio Intégration
tagline: Du design pixel‑perfect à une réinterprétation Tailwind CSS
type: Frontend
slug: klivio
year: 2025
tags: [HTML5, CSS3, Tailwind CSS, Flexbox, Grid, Responsive, Accessibilité]
stats:
  - { value: "2", label: "versions d’intégration" }
  - { value: "100%", label: "validation W3C" }
next:
  title: "Connect’In V2"
  slug: "connectinv2"
---

## Contexte

Ce projet consistait à intégrer fidèlement une maquette (non fournie dans le PDF, mais représentant un site de formations populaires) en deux variantes : une première en HTML/CSS “from scratch”, une seconde avec Tailwind CSS en laissant libre cours à la créativité. L’objectif était de maîtriser les bases du responsive, de l’accessibilité et des bonnes pratiques SEO, tout en comparant deux approches CSS.

## Stack technique

- **Frontend** : HTML5, CSS3, Tailwind CSS, JavaScript (menu mobile)
- **Polices** : Montserrat (Google Fonts)
- **Icônes** : Font Awesome (gratuit)
- **Outils** : GitHub Pages pour le déploiement, W3C Validator, WAVE

## Phase 1 : Intégration HTML/CSS pure

J’ai structuré la page avec des balises sémantiques (`<header>`, `<main>`, `<section>`, `<footer>`). J’ai reproduit les sections : héro, catalogue des formations, avantages, témoignages. Le CSS externe utilise Flexbox et Grid pour la disposition. J’ai veillé aux contrastes, aux `alt` et à la navigation clavier. Le rendu est responsive : menu hamburger en mobile, grille passant de 4 à 2 à 1 colonne.

## Phase 2 : Version Tailwind CSS

À partir de la même structure HTML, j’ai retiré le CSS personnalisé et appliqué les classes utilitaires Tailwind. J’ai personnalisé le `tailwind.config.js` pour étendre les couleurs et les polices. Cette version adopte un design plus moderne (ombres, arrondis, dark mode optionnel). Le contenu textuel reste strictement identique, mais l’ambiance visuelle change radicalement.

## Phase 3 : Déploiement et vérifications

Chaque version a été déployée sur GitHub Pages. J’ai validé les deux pages via le validateur W3C et testé l’accessibilité avec WAVE. Les deux versions passent les critères de contraste et de navigation clavier. Le README contient les liens vers les deux démos.

## Résultat

Deux intégrations fonctionnelles, responsive et accessibles. La version Tailwind a été développée deux fois plus rapidement grâce aux utilitaires, mais la version CSS pure donne un meilleur contrôle fin. Ce projet m’a permis de comparer concrètement les flux de travail et de renforcer ma pratique du responsive design.