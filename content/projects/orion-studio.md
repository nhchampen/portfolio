---
title: Orion Creative Studio
tagline: Identité de marque complète + expérience web interactive avec WebGL.
type: Brand + Dev
year: 2023
tags: [Vue 3, WebGL, GSAP, Figma, Branding]
stats:
  - { value: "8", label: "Écrans Figma" }
  - { value: "60fps", label: "WebGL stable" }
  - { value: "1", label: "Dev + Designer" }
next:
  title: Studio Mercure
  slug: studio-mercure
---

## Contexte

Orion est un studio de création audiovisuelle qui voulait une présence en ligne aussi soignée que ses productions. Mission double : **direction artistique** de la marque + **développement** de l'expérience web.

## Phase Design

Le logotype joue sur la tension entre un symbole géométrique précis (l'hexagone, référence aux studios modulaires) et une typographie organique. La palette — noir profond + or lumineux — évoque à la fois l'espace et le luxe artisanal.

Design system livré sous forme de variables Figma exportées directement en tokens CSS, sans rupture entre la maquette et le code.

## WebGL avec Vue 3

L'élément central de la page d'accueil est un objet 3D interactif qui réagit au scroll et à la position de la souris. Implémenté avec WebGL natif (sans Three.js, pour le contrôle total) encapsulé dans un composable Vue :

```ts
// composables/useWebGL.ts
export function useWebGL(canvasRef: Ref<HTMLCanvasElement | null>) {
  const gl = ref<WebGLRenderingContext | null>(null)

  onMounted(() => {
    gl.value = canvasRef.value?.getContext('webgl') ?? null
    initScene(gl.value)
    startLoop()
  })

  onUnmounted(() => stopLoop())
}
```

## GSAP ScrollTrigger

Les transitions entre les sections utilisent des timelines GSAP synchronisées avec Lenis pour un scroll parfaitement fluide, même sur les animations WebGL.

## Résultat

Le studio a utilisé le site comme pièce maîtresse de son pitch pour un contrat majeur. Il a été retenu.
