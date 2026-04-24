---
title: Retro Games CI/CD
tagline: Automatisation et sécurisation d'une plateforme de jeux rétro avec GitHub Actions et Docker.
type: DevSecOps
slug: jeuvideops
year: 2024
tags: [GitHub Actions, Docker, Jest, ESLint, Gitleaks, Nginx]
stats:
  - { value: "100%", label: "Pipeline Automatisé" }
  - { value: "8", label: "Jobs CI/CD" }
next:
  title: "Connect’In"
  slug: "connectin"
links:
  - { url: "https://github.com/nhchampen/jeuvideops", label: "GitHub" }
  - { url: "https://nhchampen.github.io/jeuvideops/", label: "GitHub Pages" }
---

## 📖 Présentation du Projet
Ce projet a été réalisé dans un cadre académique pour améliorer la compétitivité et la fiabilité d'un studio de jeux rétro. Il implémente une pipeline DevOps moderne qui automatise les tests, le linting, la sécurité et le déploiement.

Les jeux inclus proviennent de la compétition **js13kGames 2021** (thème : Espace).

## ⚙️ Pipeline CI/CD

### 🔄 Intégration Continue (CI)
À chaque push ou pull request sur la branche main, la pipeline exécute :
- **Secret Scan** : Utilisation de Gitleaks pour détecter les secrets commités par erreur.
- **Lint** : Respect du Google JavaScript Style Guide avec ESLint.
- **Security Audit** : Analyse des vulnérabilités avec npm audit.
- **Tests** : Exécution des tests unitaires et fonctionnels pour les deux jeux.

### 📦 Déploiement Continu (CD)
- **Docker Build & Push** : Construction d'une image Nginx minimale et push vers GHCR.
- **Deploy to GitHub Pages** : Publication automatique des jeux sur GitHub Pages.
- **Smoke Test** : Vérification post-déploiement de l'accessibilité de l'URL.

## 🧪 Stratégie de Test
Chaque jeu bénéficie d'une couverture de tests robuste utilisant **Jest** et **jsdom** :
- Tests unitaires originaux + 5 tests unitaires supplémentaires par logique métier.
- 3 tests fonctionnels simulant les interactions utilisateur (collisions, saisie, démarrage).

## 🔐 Pratiques DevSecOps
- **Shift-left security** : Scans de sécurité dès le commit.
- **Secrets protégés** : Aucune donnée sensible en clair, tout passe par GitHub Secrets.
- **Déploiements immuables** : Images Docker tagguées avec le SHA du commit pour une traçabilité totale.

## 🛠️ Technologies Utilisées
- **CI/CD** : GitHub Actions
- **Conteneurisation** : Docker, Nginx Alpine
- **Testing** : Jest, jsdom, Babel
- **Linting** : ESLint (Google config)
- **Sécurité** : Gitleaks, npm audit
- **Déploiement** : GitHub Pages, GHCR
