---
title: VitaePresss
tagline: Formulaire dynamique, prévisualisation en temps réel et export PDF
type: Full-stack
slug: vitaepresss
year: 2025
tags: [PHP, JavaScript, Bootstrap, Dompdf, HTML/CSS, Formulaires dynamiques]
stats:
  - { value: "3", label: "sections répétables" }
  - { value: "1 clic", label: "export PDF fidèle" }
next:
  title: "Connect’In"
  slug: "connectin"
resultUrl: "https://vitaepresss.champen.dev"
---

## Contexte

Créer un outil en ligne permettant à n’importe qui (sans compétence technique) de concevoir un CV professionnel. L’utilisateur remplit un formulaire (informations générales, expériences multiples, formations multiples, compétences) et voit le CV s’afficher en temps réel. Un clic déclenche la génération d’un PDF côté serveur, identique à l’aperçu HTML. Le projet devait être sécurisé (validations client & serveur) et responsive.

## Stack technique

- **Frontend** : HTML5, CSS3, Bootstrap, JavaScript (DOM manipulation, fetch)
- **Backend** : PHP (sans framework)
- **Génération PDF** : Dompdf (conversion HTML → PDF)
- **Outils** : Git, Visual Studio Code

## Phase 1 : Formulaire dynamique avec JavaScript

J’ai construit un formulaire structuré avec Bootstrap. Pour les expériences, formations et compétences, j’ai ajouté des boutons “Ajouter” et “Supprimer” qui clonent/suppriment des blocs via JavaScript. Les champs sont validés côté client (présence, dates cohérentes). Une zone de prévisualisation (à droite sur desktop, en dessous sur mobile) se met à jour à chaque saisie en écoutant les événements `input`.

## Phase 2 : Backend et génération PDF

À l’envoi du formulaire, PHP récupère les données, les valide à nouveau (filtrage, échappement) et génère le même HTML que la prévisualisation. Ce HTML est passé à Dompdf qui produit un PDF téléchargé immédiatement. J’ai dû ajuster les chemins des assets CSS pour que Dompdf les interprète correctement. L’export conserve les styles Bootstrap et les mises en page.

## Phase 3 : Améliorations UX

J’ai ajouté une indication de chargement pendant la génération du PDF. Le formulaire peut être sauvegardé dans `localStorage` pour ne pas perdre les données en cas de rafraîchissement (bonus non demandé mais utile). J’ai testé l’export sur différents navigateurs et vérifié que le PDF reste lisible même sans police système.

## Résultat

Un générateur de CV complet, intuitif et accessible. Les utilisateurs peuvent ajouter autant de sections qu’ils veulent, prévisualiser en direct et télécharger un PDF professionnel en un clic. Le code est séparé (HTML/JS/PHP) et sécurisé. Le README explique comment installer Dompdf via Composer et configurer le serveur local.