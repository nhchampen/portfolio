<template>
  <div>
    <!-- Custom cursor -->
    <div id="app-cursor" :class="['app-cursor', { cmode: mode.isCode }]"></div>
    <div id="app-cursor-ring" :class="['app-cursor-ring', { cmode: mode.isCode }]"></div>

    <!-- Scanline transition overlay -->
    <div id="app-scanline" ref="scanlineRef" :class="{ cmode: mode.isCode }"></div>

    <!-- Mode bar (bottom center) -->
    <div class="app-modebar">
      <div class="mb-dot" :class="{ cmode: mode.isCode }"></div>
      <span v-if="!mode.isCode">mode design</span>
      <span v-else>// mode code</span>
    </div>

    <!-- Loader — uniquement page d'accueil, une seule fois par session -->
    <AppLoader v-if="showLoader" />

    <!-- Layout -->
    <AppNav />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useModeStore } from '~/stores/mode'
import { useLenis } from '~/composables/useLenis'
import { useCursor } from '~/composables/useCursor'

const mode  = useModeStore()
const route = useRoute()

// Loader : uniquement page d'accueil + une seule fois par session
const showLoader = ref(
  import.meta.client
    ? route.path === '/' && !sessionStorage.getItem('loader-done')
    : false,
)
if (import.meta.client && showLoader.value) {
  sessionStorage.setItem('loader-done', '1')
}
useLenis()
useCursor()
</script>

<style scoped>
/* ── Cursor ──
   Pas de mix-blend-mode : devient invisible sur fond sombre.
   On utilise un simple dot + ring sans blend.
── */
.app-cursor {
  position: fixed;
  width: 8px; height: 8px;
  background: var(--ca);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  /* PAS de mix-blend-mode */
  transition: width .15s, height .15s, border-radius .25s, background .4s;
}
.app-cursor.cmode {
  border-radius: 1px;
  width: 2px; height: 18px;
  background: var(--warm);
  animation: blink .9s step-end infinite;
}
.app-cursor-ring {
  position: fixed;
  width: 32px; height: 32px;
  border: 1px solid rgba(184, 255, 87, 0.35);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: border-color .4s, width .3s, height .3s;
}
.app-cursor-ring.cmode { border-color: rgba(255, 107, 53, 0.35); }

/* ── Scanline ──
   Positionnement non-ambigu : pas d'inset (conflits avec top/height).
   Commence hors écran en haut (top: -100vh).
   GSAP gère opacity et translateY. CSS opacity: 0 = état par défaut.
── */
#app-scanline {
  position: fixed;
  left: 0; right: 0;
  top: -100vh;          /* hors écran au-dessus */
  height: 100vh;
  width: 100%;
  background: linear-gradient(transparent 0%, var(--ca) 50%, transparent 100%);
  opacity: 0;           /* caché par défaut — GSAP seul gère l'opacité */
  pointer-events: none;
  z-index: 9990;
  will-change: transform, opacity;
}
/* Le background change APRÈS le switch de mode — subtil mais propre */
#app-scanline.cmode {
  background: linear-gradient(transparent 0%, var(--warm) 50%, transparent 100%);
}

/* ── Mode bar ── */
.app-modebar {
  position: fixed;
  bottom: 1.5rem; left: 50%;
  transform: translateX(-50%);
  font-family: var(--fc);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
  background: rgba(13, 13, 15, 0.75);
  padding: 0.35rem 0.75rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
}
.mb-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--ca);
  animation: pulse 2s ease-in-out infinite;
  transition: background 0.4s;
}
.mb-dot.cmode { background: var(--warm); }
</style>
