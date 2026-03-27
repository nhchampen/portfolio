<template>
  <section id="duality">
    <div class="du-rings" aria-hidden="true">
      <div class="du-ring du-r1"></div>
      <div class="du-ring du-r2"></div>
      <div class="du-ring du-r3"></div>
    </div>
    <div class="du-bg" aria-hidden="true">DUAL</div>

    <AsciiBlock class="ascii-duality" :content="asciiDuality" />

    <div class="du-content">
      <p class="du-label">// le concept dual process</p>
      <h2 class="du-q">
        L'<span class="d">œil</span> ne s'éteint<br>
        pas quand on ouvre<br>
        un <span class="c">éditeur de code.</span>
      </h2>
      <p class="du-body">
        Ce portfolio est lui-même la preuve. Le toggle que tu utilises
        depuis le début de cette page, c'est ma biographie en un composant.
        Deux modes, une seule personne.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const asciiDuality = `┌──[design]──┬──[code]──┐
│ ░░░████░░░ │ if(true) │
│ ░████████░ │  return  │
│ ░░░████░░░ │  beauty  │
└────────────┴──────────┘`

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('.du-content > *', {
    scrollTrigger: { trigger: '#duality', start: 'top 65%' },
    opacity: 0, y: 40, duration: 1, stagger: 0.15, ease: 'power3.out',
  })
})
</script>

<style scoped>
#duality {
  padding: 9rem 3rem;
  border-top: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}
.du-bg {
  position: absolute;
  font-family: var(--fd); font-weight: 800;
  font-size: clamp(8rem, 22vw, 22rem); letter-spacing: -0.05em; line-height: 1;
  text-transform: uppercase; color: transparent;
  -webkit-text-stroke: 1px var(--faint);
  white-space: nowrap; pointer-events: none; user-select: none;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  transition: -webkit-text-stroke-color 0.6s;
}

.ascii-duality {
  position: absolute;
  bottom: 3rem; right: 3rem;
  pointer-events: none;
}

.du-rings { position: absolute; inset: 0; pointer-events: none; }
.du-ring {
  position: absolute; border-radius: 50%; border: 1px solid;
  top: 50%; left: 50%;
  animation: rOrbit linear infinite;
}
.du-r1 { width:360px;height:360px;margin:-180px 0 0 -180px;border-color:rgba(184,255,87,.07);animation-duration:25s; }
.du-r2 { width:560px;height:560px;margin:-280px 0 0 -280px;border-color:rgba(255,107,53,.05);animation-duration:35s;animation-direction:reverse; }
.du-r3 { width:780px;height:780px;margin:-390px 0 0 -390px;border-color:rgba(240,237,234,.03);animation-duration:55s; }
@keyframes rOrbit { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }

.du-content { position: relative; z-index: 1; text-align: center; max-width: 800px; }
.du-label { font-family: var(--fc); font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 2rem; }
.du-q {
  font-family: var(--fd); font-weight: 800;
  font-size: clamp(2rem, 5vw, 4.5rem); letter-spacing: -0.04em; line-height: 0.95;
  margin-bottom: 2.5rem;
}
.du-q .d { color: var(--ca); transition: color 0.4s; }
.du-q .c { color: var(--warm); transition: color 0.4s; }
.du-body { font-size: 1.05rem; color: var(--muted); line-height: 1.72; }

@media (max-width: 960px) {
  #duality { padding: 5rem 1.5rem; }
  .ascii-duality { display: none; }
}
</style>
