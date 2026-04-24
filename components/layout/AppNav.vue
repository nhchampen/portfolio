<template>
  <nav id="app-nav" :class="{ scrolled: isScrolled }">
    <NuxtLink to="/" class="nav-logo">N<em>.</em>C</NuxtLink>

    <ModeToggle />

    <div class="alt-pill">
      <div class="alt-dot"></div>
      Alternance 2026
    </div>

    <ul class="nav-links">
      <li><a href="#work">Work</a></li>
      <li><a href="#skills">Stack</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 3rem;
  background: rgba(var(--bg-rgb), 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  transition: padding 0.3s;
}
nav.scrolled { padding: 0.85rem 3rem; }

.nav-logo {
  font-family: var(--fd);
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.03em;
  text-decoration: none;
  color: var(--text);
}
:global(body) .nav-logo em { font-style: normal; color: var(--ca); transition: color 0.4s; }

.alt-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.7rem;
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  border-radius: 100px;
  font-family: var(--fc);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ca);
  transition: color 0.4s, border-color 0.4s;
}

.alt-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--ca);
  animation: pulse 2s ease-in-out infinite;
  transition: background 0.4s;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}
.nav-links a {
  font-size: 0.7rem;
  color: var(--muted);
  text-decoration: none;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0;
  width: 0; height: 1px;
  background: var(--ca);
  transition: width 0.3s, background 0.4s;
}
.nav-links a:hover { color: var(--text); }
.nav-links a:hover::after { width: 100%; }

@media (max-width: 960px) {
  nav { padding: 1rem 1.5rem; }
  .nav-links { display: none; }
}

@media (max-width: 425px) {
  .alt-pill {
    display: flex !important;
    position: fixed !important;
    top: 4.5rem !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%);
    z-index: 501;
    margin: 0;
    background: rgba(var(--bg-rgb), 0.95);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  }
}
</style>
