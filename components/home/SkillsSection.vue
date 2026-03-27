<template>
  <section id="skills" data-mode-target>
    <div class="sk-wrap">

      <div class="sk-intro">
        <span class="sk-eyebrow">Stack technique</span>
        <h2 class="sk-title">Double<br>expertise.</h2>
        <p class="sk-body">
          Une maîtrise technique construite sur une base visuelle.
          Le design informe le code, le code contraint le design.
        </p>
        <AsciiBlock class="ascii-skills" :content="asciiSkills" />
      </div>

      <div>
        <div class="tech-grid">
          <div v-for="tech in techs" :key="tech.name" class="tech-card">

            <div class="face face-design">
              <div class="tc-icon-wrap">
                <Icon :icon="tech.iconDesign" width="30" height="30" />
              </div>
              <div class="tc-nm">{{ tech.name }}</div>
              <div class="tc-lv">{{ tech.level }}</div>
            </div>

            <div class="face face-code">
              <div class="fc-lineno">
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <div class="fc-content">
                <div class="fc-line">
                  <span class="fck">import</span>
                  <span class="fcs"> '{{ tech.pkg }}'</span>
                </div>
                <div class="fc-line fc-blank"></div>
                <div class="fc-line">
                  <span class="fcv">v</span>
                  <span class="fco"> =</span>
                  <span class="fcs"> '{{ tech.version }}'</span>
                </div>
              </div>
            </div>

            <div class="tc-bar"></div>
          </div>
        </div>

        <div class="tools-row">
          <span v-for="tool in tools" :key="tool.name" class="tool-pill">
            <Icon :icon="tool.icon" width="12" height="12" />
            {{ tool.name }}
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const asciiSkills = `╭──────────────────────╮
│  $ npm run dev       │
│  ▓▓▓▓▓▓▓▓░░░ 85%     │
│                      │
│  [vue3]    ██████░░  │
│  [nuxt]    ██████░░  │
│  [figma]   ████████  │
│  [laravel] ██████░░  │
│  [react]   ██████░░  │
│                      │
│  ✓ ready             │
╰──────────────────────╯`

const techs = [
  { name: 'Vue 3',       level: 'Amateur',  iconDesign: 'devicon:vuejs',       pkg: 'vue',                version: '^3.5.0'  },
  { name: 'Nuxt 3',      level: 'Amateur',  iconDesign: 'devicon:nuxtjs',      pkg: 'nuxt',               version: '^3.16.0' },
  { name: 'Javascript',  level: 'Avancé',   iconDesign: 'devicon:javascript',  pkg: 'es2024',             version: 'vanilla' },
  { name: 'TypeScript',  level: 'Amateur',  iconDesign: 'devicon:typescript',  pkg: 'typescript',         version: '^5.8.0'  },
  { name: 'React',         level: 'Avancé',   iconDesign: 'devicon:react',       pkg: 'react',              version: '^18.3.0' },
  { name: 'PHP',         level: 'Avancé',   iconDesign: 'devicon:php',         pkg: 'php',                version: '^8.3.0'  },
  { name: 'Laravel',     level: 'Amateur',  iconDesign: 'devicon:laravel',     pkg: 'laravel/framework',  version: '^11.0'   },
  { name: 'Java',        level: 'Débutant', iconDesign: 'devicon:java',        pkg: 'java',               version: '21 LTS'  },
  { name: 'Springboot',  level: 'Débutant', iconDesign: 'devicon:spring',      pkg: 'spring-boot',        version: '^3.3.0'  },
]

const tools = [
  { name: 'Node.js',    icon: 'devicon:nodejs' },
  { name: 'mySQL', icon: 'devicon:mysql' },
  { name: 'Docker',     icon: 'devicon:docker' },
  { name: 'Linux',         icon: 'devicon:linux',           level: 'Amateur'  },
  { name: 'Bash',         icon: 'devicon:bash',           level: 'Amateur'  },
  { name: 'Git',        icon: 'devicon:git' },
  { name: 'Pinia',      icon: 'logos:pinia' },
  { name: 'GSAP',       icon: 'simple-icons:greensock'},
  { name: 'Tailwind',   icon: 'devicon:tailwindcss' },
  { name: 'Ps',         icon: 'simple-icons:adobephotoshop' },
  { name: 'Ai',         icon: 'simple-icons:adobeillustrator' },
  { name: 'Figma',         icon: 'simple-icons:figma' },
  
]

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('.sk-intro > *', {
    scrollTrigger: { trigger: '#skills', start: 'top 75%' },
    opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: 'power3.out',
  })
  gsap.from('.tech-card', {
    scrollTrigger: { trigger: '.tech-grid', start: 'top 78%' },
    opacity: 0, y: 24, duration: 0.7, stagger: 0.06, ease: 'power3.out',
  })
})
</script>

<style scoped>
#skills { padding: 8rem 3rem; border-top: 1px solid var(--border); }
.sk-wrap { display: grid; grid-template-columns: 300px 1fr; gap: 5rem; align-items: start; }

.sk-eyebrow { font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ca); margin-bottom: 1.4rem; display: block; transition: color 0.4s; }
.sk-title { font-family: var(--fd); font-weight: 800; font-size: clamp(2rem,4vw,3.2rem); letter-spacing: -0.04em; line-height: 0.95; margin-bottom: 1.5rem; }
.sk-body { font-size: 0.95rem; color: var(--muted); line-height: 1.72; }
.ascii-skills { margin-top: 2.5rem; }

.tech-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.75rem; margin: 0 1rem}

.tech-card {
  position: relative;
  height: 120px;
  background: var(--bg2);
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: default;
  transition: border-color 0.35s;
}
.tech-card:hover { border-color: rgba(240,237,234,.2); }

.tc-bar {
  position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: var(--ca);
  transform: scaleX(0); transform-origin: center;
  transition: transform 0.4s cubic-bezier(0.76,0,0.24,1), background 0.4s;
}
.tech-card:hover .tc-bar { transform: scaleX(1); }

.face {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 0.5rem; padding: 1rem;
  transition: opacity 0.45s ease, transform 0.45s ease;
}

/* Face Design — visible par défaut */
.face-design { opacity: 1; transform: translateY(0); }

.tc-icon-wrap {
  width: 44px; height: 44px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg3); border: 1px solid var(--border);
  transition: border-color 0.3s, transform 0.3s; flex-shrink: 0;
}
.tech-card:hover .tc-icon-wrap { border-color: rgba(240,237,234,.2); transform: scale(1.08); }
.tc-nm { font-size: 0.78rem; font-weight: 500; text-align: center; }
.tc-lv { font-family: var(--fc); font-size: 0.55rem; letter-spacing: 0.09em; text-transform: uppercase; color: var(--muted); text-align: center; }

/* Face Code — cachée par défaut */
.face-code {
  opacity: 0; transform: translateY(12px);
  flex-direction: row; align-items: flex-start; justify-content: flex-start;
  padding: 0.9rem 0.75rem; gap: 0.6rem; background: var(--bg3);
}
.fc-lineno { display: flex; flex-direction: column; font-family: var(--fc); font-size: 0.58rem; line-height: 1.7; color: var(--faint); user-select: none; flex-shrink: 0; padding-top: 1px; }
.fc-content { display: flex; flex-direction: column; font-family: var(--fc); font-size: 0.58rem; line-height: 1.7; overflow: hidden; }
.fc-line { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fc-blank { min-height: 1em; }
.fck { color: #C678DD; }
.fcs { color: #98C379; }
.fcv { color: #61AFEF; }
.fco { color: var(--muted); }

/* Bascule quand #skills a la classe cmode-active */
#skills.cmode-active .face-design { opacity: 0; transform: translateY(-10px); }
#skills.cmode-active .face-code   { opacity: 1; transform: translateY(0); }

.tools-row { margin-top: 1.2rem; padding-top: 1.2rem; border-top: 1px solid var(--border); display: flex; gap: 0.6rem; flex-wrap: wrap; }
.tool-pill { font-family: var(--fc); font-size: 0.62rem; letter-spacing: 0.07em; padding: 0.28rem 0.65rem; border: 1px solid var(--faint); color: var(--muted); display: inline-flex; align-items: center; gap: 0.35rem; transition: color 0.3s, border-color 0.3s; cursor: default; }
.tool-pill:hover { color: var(--text); border-color: rgba(240,237,234,.2); }

@media (max-width: 960px) {
  #skills { padding: 5rem 1.5rem; }
  .sk-wrap { grid-template-columns: 1fr; gap: 2.5rem; }
  .tech-grid { grid-template-columns: repeat(2,1fr); }
  .tech-card { height: 110px; }
}
</style>