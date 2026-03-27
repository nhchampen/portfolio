---
title: ConnectIn
tagline: Dashboard d'analytics produit temps réel avec visualisations D3.js personnalisées.
type: Réseaux Sociaux
year: 2026
tags: [Vue 3, Nuxt, Tailwind, Laravel, API REST]
stats:
  - { value: "200ms", label: "Render time" }
  - { value: "15+", label: "Chart types" }
  - { value: "98", label: "TypeScript coverage" }
next:
  title: ConnectIn
  slug: connectin
---

## Contexte

Une startup SaaS avait besoin d'un tableau de bord interne pour visualiser les données comportementales de ses utilisateurs. La contrainte principale : tout devait être **temps réel** et **configurable** par les non-développeurs de l'équipe produit.

## Décisions d'architecture

Choix de React plutôt que Vue pour ce projet spécifique car l'écosystème D3 + React est plus mature pour les visualisations complexes, et le reste de la stack de la startup était déjà en React.

```ts
// Chaque chart est un composable hook autonome
const { ref: svgRef, update } = useD3LineChart({
  data,
  xKey: 'date',
  yKey: 'value',
  color: '#B8FF57',
})
```

## Highlights Techniques

- **Code splitting agressif** : chaque type de chart est `lazy()` importé — le bundle initial est sous 80kb
- **WebWorker** pour les calculs de statistiques lourds (percentiles, moving averages) — le thread principal n'est jamais bloqué
- **Redux Toolkit + RTK Query** pour la gestion du cache des requêtes API avec invalidation automatique

## Design

La palette reprend intentionnellement les codes des terminaux (fond sombre, données en vert phosphore) pour que les données se lisent comme du code — cohérence avec l'usage développeur de l'outil.
