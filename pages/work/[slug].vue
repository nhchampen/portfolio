<template>
  <main class="case-study" v-if="doc">

    <section class="cs-hero">
      <NuxtLink to="/#work" class="cs-back">← Retour</NuxtLink>

      <div class="cs-eyebrow">
        <span class="cs-type">{{ doc.type }}</span>
        <span class="cs-year">{{ doc.year }}</span>
      </div>

      <h1 class="cs-title">{{ doc.title }}</h1>
      <p class="cs-tagline">{{ doc.tagline }}</p>

      <div class="cs-tags">
        <span v-for="tag in doc.tags" :key="tag" class="cs-tag">{{ tag }}</span>
      </div>
    </section>

    <!-- Stats -->
    <div class="cs-stats" v-if="doc.stats?.length">
      <div v-for="stat in doc.stats" :key="stat.label" class="cs-stat">
        <span class="stat-val">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <!-- Contenu Markdown -->
    <article class="cs-content">
      <ContentRenderer :value="doc" />
    </article>

    <!-- Projet suivant -->
    <div class="cs-next" v-if="doc.next">
      <span class="cn-label">Projet suivant</span>
      <NuxtLink :to="`/work/${doc.next.slug}`" class="cn-link">
        {{ doc.next.title }} <span class="cn-arr">→</span>
      </NuxtLink>
    </div>

  </main>

  <!-- 404 si le projet n'existe pas -->
  <main class="case-study not-found" v-else>
    <section class="cs-hero">
      <NuxtLink to="/" class="cs-back">← Retour</NuxtLink>
      <h1 class="cs-title">Projet introuvable.</h1>
      <p class="cs-tagline">Le slug <code>{{ $route.params.slug }}</code> ne correspond à aucun projet.</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()

// @nuxt/content v3 : queryCollection + .path() + .first()
const { data: doc } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryCollection('projects')
    .path(`/projects/${route.params.slug}`)
    .first(),
)

useSeoMeta({
  title: doc.value ? `${doc.value.title} — Nohan Champenois` : 'Projet — Nohan Champenois',
  description: doc.value?.tagline ?? '',
})

onMounted(async () => {
  const { gsap } = await import('gsap')
  gsap.from('.cs-hero > *', {
    opacity: 0, y: 30, duration: 0.8,
    stagger: 0.1, ease: 'power3.out', delay: 0.2,
  })
})
</script>

<style scoped>
.case-study { padding-top: 8rem; min-height: 100vh; }

/* ── Hero ── */
.cs-hero {
  padding: 3rem 3rem 4rem;
  border-bottom: 1px solid var(--border);
  max-width: 900px;
}
.cs-back {
  font-family: var(--fc); font-size: 0.7rem; letter-spacing: 0.1em;
  color: var(--muted); text-decoration: none;
  display: inline-flex; align-items: center; gap: 0.4rem;
  margin-bottom: 3rem; transition: color 0.3s;
}
.cs-back:hover { color: var(--ca); }

.cs-eyebrow { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.cs-type {
  font-family: var(--fc); font-size: 0.65rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--ca); transition: color 0.4s;
}
.cs-year { font-family: var(--fc); font-size: 0.65rem; color: var(--muted); }

.cs-title {
  font-family: var(--fd); font-weight: 800;
  font-size: clamp(3rem, 7vw, 7rem);
  letter-spacing: -0.04em; line-height: 0.9; margin-bottom: 1.5rem;
}
.cs-tagline {
  font-size: 1.1rem; color: var(--muted); line-height: 1.7;
  max-width: 560px; margin-bottom: 2rem;
}
.cs-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.cs-tag {
  font-family: var(--fc); font-size: 0.65rem; letter-spacing: 0.08em;
  padding: 0.3rem 0.75rem; border: 1px solid var(--faint); color: var(--muted);
}

/* ── Stats ── */
.cs-stats {
  display: flex; padding: 0 3rem;
  border-bottom: 1px solid var(--border);
}
.cs-stat {
  padding: 2rem 3rem 2rem 0;
  border-right: 1px solid var(--border);
  margin-right: 3rem;
  display: flex; flex-direction: column; gap: 0.3rem;
}
.cs-stat:last-child { border-right: none; }
.stat-val {
  font-family: var(--fd); font-weight: 800; font-size: 2rem;
  letter-spacing: -0.03em; color: var(--ca); transition: color 0.4s;
}
.stat-label {
  font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--muted);
}

/* ── Prose ── */
.cs-content { padding: 5rem 3rem; max-width: 760px; }

:deep(h2) {
  font-family: var(--fd); font-weight: 700;
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  letter-spacing: -0.03em; margin: 3rem 0 1.25rem;
}
:deep(h3) {
  font-family: var(--fd); font-weight: 700;
  font-size: 1.2rem; margin: 2rem 0 0.75rem; color: var(--muted);
}
:deep(p) {
  font-size: 1rem; color: var(--muted); line-height: 1.8; margin-bottom: 1.25rem;
}
:deep(strong) { color: var(--text); font-weight: 600; }
:deep(code) {
  font-family: var(--fc); font-size: 0.85em;
  color: var(--ca); background: var(--bg2); padding: 0.1em 0.4em;
  transition: color 0.4s;
}
:deep(pre) {
  background: var(--bg2); border: 1px solid var(--border);
  padding: 1.5rem; overflow-x: auto; margin: 1.5rem 0;
  font-family: var(--fc); font-size: 0.85rem; line-height: 1.75;
}
:deep(pre code) { background: none; padding: 0; color: var(--text); }
:deep(ul), :deep(ol) {
  padding-left: 1.5rem; color: var(--muted);
  line-height: 1.9; margin-bottom: 1.25rem;
}
:deep(li::marker) { color: var(--ca); }

/* ── Projet suivant ── */
.cs-next {
  padding: 4rem 3rem;
  border-top: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 0.75rem;
}
.cn-label {
  font-family: var(--fc); font-size: 0.65rem;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
}
.cn-link {
  font-family: var(--fd); font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  letter-spacing: -0.03em; color: var(--text);
  text-decoration: none;
  display: inline-flex; align-items: center; gap: 0.4em;
  transition: color 0.3s;
}
.cn-link:hover { color: var(--ca); }
.cn-arr { display: inline-block; transition: transform 0.35s cubic-bezier(0.76,0,0.24,1); }
.cn-link:hover .cn-arr { transform: translate(10px, -10px); }

/* ── 404 ── */
.not-found .cs-tagline code {
  font-family: var(--fc); color: var(--ca); background: var(--bg2); padding: 0.1em 0.4em;
}

@media (max-width: 960px) {
  .cs-hero, .cs-content, .cs-next { padding-left: 1.5rem; padding-right: 1.5rem; }
  .cs-stats { padding: 0 1.5rem; flex-wrap: wrap; }
  .cs-stat { padding: 1.5rem 1.5rem 1.5rem 0; margin-right: 1.5rem; }
}
</style>