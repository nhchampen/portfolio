<template>
  <section id="hero" ref="heroRef">
    <div class="h-grid"></div>
    <div class="h-orb"></div>
    <div class="h-fade"></div>
    <div class="scroll-line"></div>

    <AsciiBlock class="ascii-hero" :content="asciiHero" />

    <div class="h-eyebrow">
      <span class="ey-d">Graphiste → Développeur Fullstack · Epitech Lyon</span>
      <span class="ey-c">// dual-skill dev · web@académie Epitech</span>
    </div>

    <h1 class="h-name">
      <span class="code-pre">&gt;&nbsp;</span>
      <span class="n-row"><span class="n-inner">NOHAN</span></span>
      <span class="n-row"><span class="n-inner n-ghost">CHAMPENOIS</span></span>
    </h1>

    <div class="h-foot">
      <div class="h-desc">
        <span class="hd-d">
          Je construis des interfaces qui ont du sens — visuellement et techniquement.
          Plusieurs années de design autodidacte, puis le code. L'œil ne s'éteint pas.
        </span>
        <span class="hd-c">
          <span class="ck">const</span> <span class="cv"> dev</span> = {<br>
          &nbsp;&nbsp;stack: [<span class="cs">'Vue.js'</span>, <span class="cs">'Nuxt'</span>, <span class="cs">'Laravel'</span>],<br>
          &nbsp;&nbsp;origin: <span class="cs">'autodidact'</span>,<br>
          &nbsp;&nbsp;seeking: <span class="cs">'alternance 2026'</span><br>
          }
        </span>
      </div>
      <div class="h-actions">
        <a href="#work" class="btn-main">Projets &nbsp;→</a>
        <a href="#contact" class="btn-sub">Disponible en alternance ↗</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const asciiHero = `╔═══════════════════╗
║  <Portfolio />    ║
╠═══════════════════╣
║  design  : true   ║
║  code    : true   ║
║  both    : ✓      ║
╠═══════════════════╣
║  stack   :        ║
║  → Vue3 Nuxt      ║
║  → Laravel React  ║
╚═══════════════════╝`

const heroRef = ref<HTMLElement | null>(null)
const animationStarted = ref(false)
const HERO_ANIMATED_KEY = 'hero-animated'

function revealHeroImmediately() {
  if (animationStarted.value || !heroRef.value) return
  animationStarted.value = true
  heroRef.value.classList.add('hero-visible')
}

async function startHeroAnimation() {
  if (animationStarted.value || !import.meta.client) return
  animationStarted.value = true

  const { gsap } = await import('gsap')
  const tl = gsap.timeline({ delay: 0.75 })
    .set('.n-inner', { opacity: 0, y: '115%' })
    .set('.h-foot', { opacity: 0, y: 10 })
    .to('.h-eyebrow', { opacity: 1, duration: 1.1, ease: 'power3.out' })
    .to('.n-inner', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: .16,
      ease: 'power4.out',
    }, '-=.7')
    .to('.h-foot', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=.6')

  tl.eventCallback('onComplete', () => {
    window.__heroSectionAnimated = true
    sessionStorage.setItem(HERO_ANIMATED_KEY, 'true')
  })
}

onMounted(() => {
  const onLoaderDone = () => {
    startHeroAnimation()
  }

  if (window.location.pathname === '/') {
    const alreadyAnimated = sessionStorage.getItem(HERO_ANIMATED_KEY) === 'true'
    if (alreadyAnimated || (window as any).__heroSectionAnimated) {
      revealHeroImmediately()
    } else if ((window as any).__homeLoaderActive) {
      window.addEventListener('loader-done', onLoaderDone, { once: true })
    } else {
      startHeroAnimation()
    }
  }

  onBeforeUnmount(() => {
    window.removeEventListener('loader-done', onLoaderDone)
  })
})
</script>

<style scoped>
/* Seuls les styles non-mode et non-typographiques restent ici.
   Tout ce qui dépend de body.cmode est dans assets/css/main.css */

#hero {
  min-height: 100vh;
  padding: 0 3rem 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
}

.h-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(var(--faint) 1px, transparent 1px),
    linear-gradient(90deg, var(--faint) 1px, transparent 1px);
  background-size: 52px 52px;
  opacity: .35;
  mask-image: radial-gradient(ellipse 70% 70% at 65% 35%, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 65% 35%, black 0%, transparent 70%);
}

.h-orb {
  position: absolute; top: 10%; right: 6%;
  width: 380px; height: 380px; border-radius: 50%;
  background: radial-gradient(circle, rgba(184,255,87,.1) 0%, transparent 68%);
  pointer-events: none;
  transition: background 1s;
  animation: orbDrift 9s ease-in-out infinite;
}

.h-fade {
  position: absolute; bottom: 0; left: 0; right: 0; height: 55%;
  background: linear-gradient(to top, var(--bg) 45%, transparent);
  pointer-events: none;
}

.ascii-hero {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
}

.scroll-line {
  position: absolute; bottom: 0; right: 3rem;
  width: 1px; height: 90px;
  background: linear-gradient(to bottom, transparent, var(--muted));
  animation: siPulse 2.5s ease-in-out infinite;
}

/* Eyebrow */
.h-eyebrow {
  position: relative; height: 1.4em; margin-bottom: 1.4rem;
  padding-left: calc(26px + .7rem);
  display: flex; align-items: baseline;
  font-size: .72rem; letter-spacing: .12em; text-transform: uppercase;
  color: var(--muted);
  opacity: 0; /* revealed by GSAP */
  transform: translateY(-8px);
}
#hero.hero-visible .h-eyebrow {
  opacity: 1;
  transform: translateY(0);
}
.h-eyebrow::before {
  content: ''; position: absolute; left: 0; top: 50%;
  width: 26px; height: 1px;
  transform: translateY(-50%);
  background: var(--ca); transition: opacity .4s, background .4s;
}
body.cmode .h-eyebrow::before {
  opacity: 0;
}
.ey-d {
  position: relative;
  opacity: 1;
  transform: translateY(0);
  transition: opacity .4s, transform .4s;
}
.ey-c {
  position: absolute;
  left: 0;
  top: 50%;
  white-space: nowrap;
  font-family: var(--fc);
  color: var(--warm);
  opacity: 0;
  transform: translateY(-50%);
  transition: opacity .4s, transform .4s;
}

/* Hero foot */
.h-foot {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
  align-items: flex-end; position: relative; z-index: 1;
  opacity: 0; /* revealed by GSAP */
  transform: translateY(10px);
}
#hero.hero-visible .h-foot {
  opacity: 1;
  transform: translateY(0);
}

.n-inner {
  opacity: 0;
  transform: translateY(115%);
}
#hero.hero-visible .n-inner {
  opacity: 1;
  transform: translateY(0);
}

.h-desc {
  font-size: clamp(.88rem, 1.35vw, 1.05rem);
  color: var(--muted); line-height: 1.72;
  position: relative; min-height: 5em;
}
.hd-d, .hd-c { transition: opacity .4s .1s, transform .4s .1s; }
.hd-c {
  position: absolute; top: 0; left: 0;
  font-family: var(--fc); font-size: .83em;
  opacity: 0; transform: translateY(10px); line-height: 1.95;
}

/* Syntax colors for code snippet */
.ck { color: #C678DD; }
.cs { color: #98C379; }
.cv { color: #61AFEF; }

.h-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 1rem; }

@media (max-width: 960px) {
  #hero { padding: 0 1.5rem 4.5rem; }
  .ascii-hero, .scroll-line { display: none; }
  .h-foot { grid-template-columns: 1fr; }
  .h-actions { align-items: flex-start; }
}
</style>
