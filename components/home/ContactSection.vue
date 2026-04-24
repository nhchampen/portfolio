<template>
  <footer id="contact">
    <div class="ct-bg" aria-hidden="true">Hello?</div>

    <div class="ct-top">
      <div class="ct-cta">
        <a href="mailto:nohan.champenois@epitech.eu">
          Travaillons<br>ensemble.&nbsp;<span class="ct-arr">→</span>
        </a>
      </div>
      <div class="ct-info">
        <div class="ci">
          <span class="ci-l">Email</span>
          <div class="ci-v"><a href="mailto:nohan.champenois@epitech.eu">nohan.champenois@epitech.eu</a></div>
        </div>
        <div class="ci">
          <span class="ci-l">Recherche</span>
          <div class="ci-v avail">
            <span class="avail-dot"></span>
            Alternance Septembre 2026
          </div>
        </div>
        <div class="ci">
          <span class="ci-l">Lieu</span>
          <div class="ci-v">Lyon, France</div>
        </div>
        <div class="ci">
          <span class="ci-l">École</span>
          <div class="ci-v">Epitech Lyon — Web@académie</div>
        </div>
      </div>
    </div>
    

    <div class="ft">
      <div class="ft-logo">N<em>.</em>CHAMPENOIS</div>
      <div class="linkBox-mobile">
        <div class="ft-links-mobile">
          <a href="https://github.com/nhchampen">GitHub</a>
          <a href="https://www.linkedin.com/in/nohan-c-1759a7392/" target="_blank">LinkedIn</a>
          <a href="/CV_nohan_champenoisAvril2026.pdf" target="_blank">CV PDF</a>
        </div>
      </div>
      <div class="ft-copy">© 2026 · Vue.js · Handcrafted</div>
    </div>
    <div class="linkBox">
      <div class="ft-links">
        <a href="https://github.com/nhchampen">GitHub</a>
        <a href="https://www.linkedin.com/in/nohan-c-1759a7392/" target="_blank">LinkedIn</a>
        <a href="/CV_nohan_champenoisAvril2026.pdf" target="_blank">CV PDF</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('.ct-top > *', {
    scrollTrigger: { trigger: '#contact', start: 'top 72%' },
    opacity: 0, y: 30, duration: 0.9, stagger: 0.15, ease: 'power3.out',
  })
})
</script>

<style scoped>
#contact {
  padding: 9rem 3rem 4rem;
  border-top: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.ct-bg {
  position: absolute; bottom: 0; right: 0;
  font-family: var(--fd); font-weight: 800;
  font-size: clamp(6rem, 18vw, 18rem); letter-spacing: -0.05em;
  color: transparent; -webkit-text-stroke: 1px var(--faint);
  line-height: 1; pointer-events: none; user-select: none;
  transition: -webkit-text-stroke-color 0.6s;
}
.ct-top {
  display: grid; grid-template-columns: 1fr auto; gap: 4rem;
  align-items: flex-start; position: relative; z-index: 1; margin-bottom: 5rem;
}
.ct-cta {
  font-family: var(--fd); font-weight: 800;
  font-size: clamp(2.5rem, 7vw, 7rem); letter-spacing: -0.045em; line-height: 0.9;
}
.ct-cta a {
  color: var(--text); text-decoration: none;
  display: inline-flex; align-items: center; gap: 0.4em; transition: color 0.3s;
}
.ct-cta a:hover { color: var(--ca); }
.ct-arr { display: inline-block; transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1); }
.ct-cta a:hover .ct-arr { transform: translate(10px, -10px); }
.ci { padding: 1rem 0; border-bottom: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.2rem; min-width: 240px; }
.ci-l { font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.ci-v { font-family: var(--fd); font-weight: 700; font-size: 1rem; }
.ci-v a { color: var(--text); text-decoration: none; transition: color 0.3s; }
.ci-v a:hover { color: var(--ca); }
.avail { display: flex; align-items: center; gap: 0.5rem; }
.avail-dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--ca);
  animation: pulse 2s ease-in-out infinite; transition: background 0.4s; flex-shrink: 0;
}
.ft {
  display: flex; align-items: flex-end; justify-content: space-between;
  position: relative; z-index: 1; padding-top: 3rem; border-top: 1px solid var(--border);
}
.ft-logo { font-family: var(--fd); font-weight: 800; font-size: 1.5rem; letter-spacing: -0.03em; }
.ft-logo em { font-style: normal; color: var(--ca); transition: color 0.4s; }
.ft-links { display: flex; gap: 1.5rem; }
.ft-links a { font-size: 0.78rem; color: var(--muted); text-decoration: none; transition: color 0.3s; }
.ft-links a:hover { color: var(--text); }
.ft-copy { font-family: var(--fc); font-size: 0.62rem; color: var(--faint); letter-spacing: 0.08em; }
.linkBox { display: flex; justify-content: center; }
.linkBox-mobile { display: none;}

@media (max-width: 960px) {
  #contact { padding: 5rem 1.5rem 3rem; }
  .ct-top { grid-template-columns: 1fr; }
  .ft { flex-direction: column; gap: 1.5rem; align-items: flex-start; }
  .linkBox { display: none; }
  .linkBox-mobile { display: block;}
  .ft-links-mobile { display: flex; gap: 1.5rem; }
  .ft-links-mobile a { font-size: 1rem; color: var(--muted); text-decoration: none; transition: color 0.3s; }
  .ft-links-mobile a:hover { color: var(--text); }
}
</style>
