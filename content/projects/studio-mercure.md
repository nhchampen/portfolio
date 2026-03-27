---
title: Studio Mercure
tagline: Plateforme e-commerce SSR complète, de la maquette Figma au déploiement.
type: E-commerce
year: 2024
tags: [Vue 3, Nuxt 3, Laravel, PostgreSQL, Stripe]
stats:
  - { value: "94", label: "Lighthouse score" }
  - { value: "12k", label: "Users / mois" }
  - { value: "3", label: "Mois de dev" }
next:
  title: Nexus Analytics
  slug: nexus-analytics
---

## Contexte

Studio Mercure est une marque de design d'intérieur lyonnaise qui avait besoin d'une refonte complète de son canal de vente en ligne. Mission : concevoir l'identité visuelle mise à jour **et** développer la plateforme de A à Z.

## Approche Design

Avant d'écrire une ligne de code, j'ai construit un design system complet dans Figma — typographies, tokens de couleur, grille, et les 28 composants récurrents. Cette étape a rendu le développement notablement plus rapide et cohérent.

## Architecture Technique

```
Frontend : Nuxt 3 (SSR) — Vue 3 Composition API
Backend  : Laravel 11 — API REST
Base     : PostgreSQL + Redis (cache produits)
Paiement : Stripe (webhooks + 3DS)
CDN      : Cloudflare Images
Deploy   : Vercel (frontend) + Forge (backend)
```

Le routing des produits utilise `useFetch` avec hydratation SSR pour un Time to First Byte optimal, et `useAsyncData` pour les données dynamiques (panier, compte).

## Composables clés

Le panier est géré par un composable `useCart` qui abstrait Pinia et la sync serveur :

```ts
const { items, add, remove, total } = useCart()
```

## Résultats

- **94** en Lighthouse performance (mobile)
- **~12 000** visiteurs uniques / mois à 3 mois du lancement
- Taux de conversion **+34%** vs l'ancienne solution Shopify
