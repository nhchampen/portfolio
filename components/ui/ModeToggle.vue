<template>
  <div
    class="toggle-wrap"
    role="switch"
    :aria-checked="mode.isCode"
    tabindex="0"
    aria-label="Basculer mode design / code"
    @click="handleSwitch"
    @keydown.enter.prevent="handleSwitch"
    @keydown.space.prevent="handleSwitch"
  >
    <span class="toggle-lbl d" :class="{ muted: mode.isCode }">Design</span>

    <div class="toggle-track">
      <div class="toggle-thumb" :class="{ active: mode.isCode }"></div>
    </div>

    <span class="toggle-lbl c" :class="{ active: mode.isCode }">Code</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useModeStore } from '~/stores/mode'

const mode = useModeStore()

// Pré-importer GSAP au montage du composant pour éviter
// le délai async qui laisse le scanline bloqué en orange
let gsapInstance: any = null
onMounted(async () => {
  const { gsap } = await import('gsap')
  gsapInstance = gsap
})

function handleSwitch() {
  const scanline = document.getElementById('app-scanline')

  if (scanline && gsapInstance) {
    const gsap = gsapInstance
    const goingToCode = !mode.isCode   // état FUTUR après le switch

    // Positionner hors-écran dans le bon sens
    gsap.set(scanline, {
      opacity: 0.5,
      y: goingToCode ? '-100%' : '100%',   // top si descend, bottom si monte
    })

    // Sweep à travers l'écran
    gsap.to(scanline, {
      y: goingToCode ? '200%' : '-200%',
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete() {
        gsap.set(scanline, { opacity: 0, y: 0 })  // reset complet
      },
    })

    // Glitch sur le nom hero
    const heroName = document.querySelector<HTMLElement>('.hero-name')
    if (heroName) {
      gsap.timeline()
        .to(heroName, { x: -5, skewX: 3,  duration: 0.04 })
        .to(heroName, { x:  4, skewX: -2, duration: 0.04 })
        .to(heroName, { x: -2, skewX: 1,  duration: 0.04 })
        .to(heroName, { x:  0, skewX: 0,  duration: 0.05 })
    }
  } else if (scanline) {
    // Fallback si GSAP pas encore chargé : flash CSS rapide
    scanline.style.opacity = '0.4'
    setTimeout(() => { scanline.style.opacity = '0' }, 400)
  }

  // ASCII glitch + switch
  window.dispatchEvent(new CustomEvent('ascii-glitch'))
  mode.switchMode()
}
</script>

<style scoped>
.toggle-wrap {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  cursor: pointer;
  user-select: none;
}
.toggle-lbl {
  font-family: var(--fc);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
  transition: color 0.35s, opacity 0.35s;
}
.toggle-lbl.d        { color: var(--ca); opacity: 1; }
.toggle-lbl.d.muted  { color: var(--muted);  opacity: 0.5; }
.toggle-lbl.c        { color: var(--muted);  opacity: 0.5; }
.toggle-lbl.c.active { color: var(--warm);   opacity: 1; }

.toggle-track {
  width: 34px; height: 19px;
  background: var(--bg);
  border: 1px solid var(--faint);
  border-radius: 100px;
  position: relative;
  flex-shrink: 0;
  transition: border-color 0.3s;
}
.toggle-wrap:hover .toggle-track { border-color: var(--muted); }

.toggle-thumb {
  position: absolute;
  top: 2px; left: 2px;
  width: 13px; height: 13px;
  background: var(--ca);
  border-radius: 50%;
  transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1), background 0.4s;
}
.toggle-thumb.active {
  transform: translateX(15px);
  background: var(--warm);
}
</style>
