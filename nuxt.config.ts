export default defineNuxtConfig({
  compatibilityDate: '2026-03-19',

  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
  ],

  // ← Clé du fix : désactive le préfixe de dossier sur les composants
  // Sans ça, components/home/HeroSection.vue → <HomeHeroSection>
  // Avec ça → <HeroSection> comme attendu
  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Nohan Champenois — Développeur Fullstack & Designer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio de Nohan Champenois — Développeur Fullstack Vue.js / Nuxt avec un background graphiste. Disponible en alternance 2025. Epitech Lyon.' },
        { property: 'og:title', content: 'Nohan Champenois — Dual Process' },
        { property: 'og:description', content: 'Développeur Fullstack & Graphiste. Vue.js, Nuxt, Laravel, React.' },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
