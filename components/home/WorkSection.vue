<template>
  <section id="work">
    <!-- ASCII deco -->
    <AsciiBlock class="ascii-work" :content="asciiWork" />

    <div class="section-header">
      <div class="sh-left">
        <div class="section-tag">
          <span class="section-tag-d">Travaux sélectionnés</span>
          <span class="section-tag-c">// ./projects — 7 selected</span>
        </div>
        <h2 class="section-title">Work</h2>
      </div>
      <div class="wf">
        <button
          v-for="f in filters"
          :key="f.value"
          class="wf-btn"
          :class="{ on: activeFilter === f.value }"
          @click="setFilter(f.value)"
        >{{ f.label }}</button>
      </div>
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="p in projects"
        :key="p.num"
        v-bind="p"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeFilter = ref('all')
const filters = [
  { value: 'all',    label: 'Tous'   },
  { value: 'dev',    label: 'Dev'    },
  { value: 'design', label: 'Design' },
]

async function setFilter(val: string) {
  activeFilter.value = val
  const { gsap } = await import('gsap')
  document.querySelectorAll<HTMLElement>('.pcard').forEach(card => {
    const show = val === 'all' || card.dataset.t === val
    gsap.to(card, { opacity: show ? 1 : 0.1, scale: show ? 1 : 0.97, duration: 0.4, ease: 'power2.out' })
  })
}

const asciiWork = `┌───────────────────┐
│  $ ls ./projects  │
├───────────────────┤
│  01_connectin/    │
│  02_icom/         │
│  03_vitaepresss/  │
│  04_klivio/       │
│  05_socialbrand/  │
│  06_logotype/     │
│  07_designcollec/ │
└───────────────────┘`

const projects = [
  {
    num: '01', title: 'ConnectIn', meta: 'Réseau Social ESN · 2026',
    slug: 'connectin',
    type: 'dev' as const, size: 'large' as const,
    tags: ['Vue 3', 'Nuxt', 'Laravel'],
    blobColor: 'var(--ca)',
    codeHtml: `<div><span class="s-cm">// Réseau Social SSR + API REST</span></div><div><span class="s-kw">const</span> { <span class="s-vr">data</span> } = <span class="s-kw">await</span> <span class="s-fn">useFetch</span>(<span class="s-st">'/api/user'</span>)</div><div><span class="s-cm">Projet Scolaire</span></div>`,
  },
  {
    num: '02', title: 'Icom Studio', meta: 'Refonte Site Studio · 2026',
    externalUrl: 'https://studio-icom.fr/',
    type: 'dev' as const, size: 'small' as const,
    tags: ['HTML', 'CSS', 'Javascript', 'NodeJs'],
    blobColor: 'var(--warm)',
    codeHtml: `<div><span class="s-cm">// Refonte Studio Design Graphique</span></div><div><span class="s-kw">await</span> <span class="s-vr">transporter</span>.<span class="s-fn">sendMail</span>(<span class="s-vr">mailOptions</span>);</span></div>`,
  },
  {
    num: '03', title: 'VitaePresss', meta: 'Génerateur de CV · 2026',
    slug: 'vitaepresss',
    type: 'dev' as const, size: 'half' as const,
    tags: ['Tailwind', 'Javascript', 'PHP'],
    blobColor: '#7B61FF',
    codeHtml: `<div><span class="s-cm">// </span></div><div><span class="s-fn">setup</span>() { <span class="s-kw">return</span> <span class="s-fn">useWebGL</span>(<span class="s-vr">canvasRef</span>) }</div>`,
  },
  {
    num: '04', title: 'Klivio Intégration', meta: 'Intégration frontend · 2025',
    slug: 'klivio',
    type: 'dev' as const, size: 'half' as const,
    tags: ['HTML', 'SCSS', 'Boostrap'],
    blobColor: 'var(--accent)',
    codeHtml: `<div><span class="s-cm">// SaaS · Socket.io</span></div><div><span class="s-fn">io</span>.<span class="s-fn">on</span>(<span class="s-st">'update'</span>, <span class="s-vr">cb</span>)</div>`,
  },
  {
    num: '05', title: 'Social Branding Collection', meta: 'Social Network Branding · 2019-2024',
    slug: 'social-branding-collec',
    type: 'design' as const, size: 'half' as const,
    tags: ['Illustrator', 'Photoshop'],
    blobColor: 'var(--warm)',
    codeHtml: `<div><span class="s-cm">// Design System 200+</span></div><div><span class="s-fn">definePreset</span>({ tokens })</div>`,
  },
  {
    num: '06', title: 'Logo Collection', meta: 'Logo Type · 2019-2023',
    slug: 'logo-collec',
    type: 'design' as const, size: 'small' as const,
    tags: ['illustrator'],
    blobColor: 'var(--ca)',
    codeHtml: `<div><span class="s-cm">// API REST · Laravel</span></div><div><span class="s-vr">app</span>-><span class="s-fn">get</span>(<span class="s-st">'/api/v1'</span>)</div>`,
  },
  {
    num: '07', title: 'Graphic Design Collection', meta: 'Poster, Cover · 2019-2023',
    slug: 'graphic-design-collec',
    type: 'design' as const, size: 'large' as const,
    tags: ['Photoshop', 'Illustrator', 'Blender'],
    blobColor: '#7B61FF',
    codeHtml: `<div><span class="s-cm">// API REST · Laravel</span></div><div><span class="s-vr">app</span>-><span class="s-fn">get</span>(<span class="s-st">'/api/v1'</span>)</div>`,
  }
]

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('.pcard', {
    scrollTrigger: { trigger: '#work', start: 'top 72%' },
    opacity: 0, y: 50, duration: 0.9, stagger: 0.09, ease: 'power3.out',
  })
})
</script>

<style scoped>
#work {
  padding: 8rem 3rem 6rem;
  position: relative;
}
.ascii-work {
  position: absolute;
  right: 3rem; top: 2rem;
}
.sh-left { display: flex; flex-direction: column; gap: 0.4rem; }
.wf { display: flex; gap: 0.5rem; }
.wf-btn {
  font-size: 0.68rem; letter-spacing: 0.09em; text-transform: uppercase;
  padding: 0.32rem 0.8rem;
  border: 1px solid var(--border); background: none; color: var(--muted);
  cursor: pointer; transition: color 0.3s, border-color 0.3s, background 0.3s;
}
.wf-btn.on, .wf-btn:hover { color: var(--text); border-color: rgba(240, 237, 234, 0.2); background: var(--bg3); }
.projects-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.2rem;
}
@media (max-width: 960px) {
  #work { padding: 6rem 1.5rem 4rem; }
  .ascii-work { display: none; }
}
</style>
