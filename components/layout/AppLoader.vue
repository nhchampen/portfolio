<template>
  <Teleport to="body">
    <div class="loader" ref="loaderRef">

      <div class="lo-grid"></div>
      <div class="lo-scanline" ref="scanlineEl"></div>

      <div class="lo-stream lo-stream-l" ref="streamL">
        <div v-for="(l, i) in streamLeft" :key="i" class="lo-stream-line">{{ l }}</div>
      </div>
      <div class="lo-stream lo-stream-r" ref="streamR">
        <div v-for="(l, i) in streamRight" :key="i" class="lo-stream-line">{{ l }}</div>
      </div>

      <div class="lo-center">
        <div class="lo-name" ref="nameEl">
          <span class="lo-n-first">MAEL</span>
          <span class="lo-n-last">SOUCHET</span>
        </div>
        <div class="lo-tagline" ref="taglineEl">
          <span class="lo-tg-d">Graphiste → Développeur Fullstack</span>
          <span class="lo-tg-c">// initializing dual_process.exe</span>
        </div>
        <div class="lo-bar-wrap" ref="barWrapEl">
          <div class="lo-bar-track">
            <div class="lo-bar-fill" ref="barFill"></div>
            <div class="lo-bar-glow" ref="barGlow"></div>
          </div>
          <div class="lo-bar-labels">
            <span class="lo-bar-status" ref="statusEl">LOADING</span>
            <span class="lo-bar-pct" ref="pctEl">0%</span>
          </div>
        </div>
      </div>

      <div class="lo-corner lo-c-tl"><span>SYS</span><span>INIT</span></div>
      <div class="lo-corner lo-c-tr"><span>v1.0</span><span>2025</span></div>
      <div class="lo-corner lo-c-bl"><span>EPITECH</span><span>LYON</span></div>
      <div class="lo-corner lo-c-br"><span>WEB</span><span>DEV</span></div>

    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loaderRef  = ref<HTMLElement | null>(null)
const scanlineEl = ref<HTMLElement | null>(null)
const nameEl     = ref<HTMLElement | null>(null)
const taglineEl  = ref<HTMLElement | null>(null)
const barWrapEl  = ref<HTMLElement | null>(null)
const barFill    = ref<HTMLElement | null>(null)
const barGlow    = ref<HTMLElement | null>(null)
const statusEl   = ref<HTMLElement | null>(null)
const pctEl      = ref<HTMLElement | null>(null)
const streamL    = ref<HTMLElement | null>(null)
const streamR    = ref<HTMLElement | null>(null)

function genStream(count: number): string[] {
  const hex  = () => Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4,'0').toUpperCase()
  const bin  = () => Math.random().toString(2).slice(2, 10)
  const addr = () => `0x${Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase().padStart(8,'0')}`
  const words = ['INIT','LOAD','BOOT','LINK','SYNC','AUTH','EXEC','PASS','OK','READY','NULL','FETCH','BUILD','PUSH','EMIT','MAP','REF','WATCH']
  const pick = () => words[Math.floor(Math.random() * words.length)]
  const lines = []
  for (let i = 0; i < count; i++) {
    const r = Math.random()
    if      (r < 0.25) lines.push(`${hex()} ${hex()} ${hex()} ${hex()}`)
    else if (r < 0.45) lines.push(addr())
    else if (r < 0.60) lines.push(bin() + ' ' + bin())
    else if (r < 0.75) lines.push(`[${pick()}] ${hex()}`)
    else               lines.push(`${pick()} → ${pick()}`)
  }
  return lines
}

const streamLeft  = ref(genStream(60))
const streamRight = ref(genStream(60))

const phases = [
  { label: 'LOADING',   pct: 0   },
  { label: 'COMPILING', pct: 20  },
  { label: 'MOUNTING',  pct: 45  },
  { label: 'RENDERING', pct: 68  },
  { label: 'READY',     pct: 92  },
  { label: 'LAUNCH',    pct: 100 },
]

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function animateProgress(from: number, to: number, dur: number) {
  const start = performance.now()
  return new Promise<void>(resolve => {
    function tick(now: number) {
      const t      = Math.min((now - start) / dur, 1)
      const eased  = t < 0.5 ? 2*t*t : -1+(4-2*t)*t
      const val    = from + (to - from) * eased
      if (barFill.value) barFill.value.style.width = val + '%'
      if (barGlow.value) barGlow.value.style.left  = val + '%'
      if (pctEl.value)   pctEl.value.textContent   = Math.round(val) + '%'
      if (t < 1) requestAnimationFrame(tick)
      else resolve()
    }
    requestAnimationFrame(tick)
  })
}

onMounted(async () => {
  if (!import.meta.client) return
  document.body.style.overflow = 'hidden'

  const { gsap } = await import('gsap')

  gsap.to(scanlineEl.value, {
    top: '100%', duration: 2, ease: 'none', repeat: -1,
    onRepeat: () => { if (scanlineEl.value) scanlineEl.value.style.top = '-2px' },
  })
  if (streamL.value) gsap.to(streamL.value, { y: '-40%', duration: 6, ease: 'none', repeat: -1 })
  if (streamR.value) gsap.to(streamR.value, { y: '-40%', duration: 8, ease: 'none', repeat: -1 })

  await sleep(200)

  gsap.fromTo(nameEl.value,
    { opacity: 0, letterSpacing: '0.8em' },
    { opacity: 1, letterSpacing: '-0.045em', duration: 0.7, ease: 'power3.out' },
  )
  await sleep(400)

  gsap.fromTo(taglineEl.value,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
  )
  await sleep(200)

  gsap.fromTo(barWrapEl.value,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
  )

  let prev = 0
  for (const phase of phases) {
    if (statusEl.value) statusEl.value.textContent = phase.label
    await animateProgress(prev, phase.pct, phase.pct === 100 ? 300 : 420)
    prev = phase.pct
    await sleep(phase.pct === 100 ? 100 : 80)
  }

  await sleep(300)

  gsap.fromTo(loaderRef.value,
    { filter: 'brightness(1)' },
    { filter: 'brightness(2.5)', duration: 0.08, yoyo: true, repeat: 1 },
  )
  await sleep(180)

  gsap.to(loaderRef.value, {
    yPercent: -100, duration: 0.75, ease: 'power4.inOut',
    onComplete: () => {
      document.body.style.overflow = ''
      loaderRef.value?.remove()
    },
  })
})
</script>

<style scoped>
.loader {
  --text: #F0EDEA;
  --muted: #6A6A74;
  --ca: #B8FF57;
  position: fixed; inset: 0; z-index: 9999;
  background: #1E1E20;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}

.lo-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(184,255,87,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(184,255,87,.04) 1px, transparent 1px);
  background-size: 44px 44px;
  pointer-events: none;
}

.lo-scanline {
  position: absolute; left: 0; right: 0; top: -2px; height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--ca) 50%, transparent 100%);
  opacity: 0.5; pointer-events: none; z-index: 2;
  box-shadow: 0 0 18px 4px rgba(184,255,87,.15);
}

.lo-stream {
  position: absolute; top: 0; width: 180px;
  display: flex; flex-direction: column; gap: 0.3rem;
  pointer-events: none; z-index: 1;
}
.lo-stream-l { left: 0; mask-image: linear-gradient(to right, black 60%, transparent); }
.lo-stream-r { right: 0; text-align: right; mask-image: linear-gradient(to left, black 60%, transparent); }

.lo-stream-line {
  font-family: var(--fc); font-size: 0.55rem; line-height: 1.8;
  color: rgba(184,255,87,.18); letter-spacing: 0.06em;
  white-space: nowrap; padding: 0 1.25rem;
}

.lo-center {
  position: relative; z-index: 3;
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
  width: min(600px, 80vw);
}

.lo-name {
  display: flex; flex-direction: column; align-items: center;
  opacity: 0; line-height: 0.85;
}
.lo-n-first, .lo-n-last {
  font-family: var(--fd); font-weight: 800;
  font-size: clamp(4.5rem, 14vw, 11rem);
  letter-spacing: -0.045em; line-height: 0.88; color: #F0EDEA;
}
.lo-n-last {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(240,237,234,.2);
}

.lo-tagline {
  position: relative; height: 1.3em; opacity: 0;
}
.lo-tg-d, .lo-tg-c {
  position: absolute; left: 50%; transform: translateX(-50%);
  font-size: clamp(.7rem, 1.4vw, .85rem); letter-spacing: 0.14em;
  text-transform: uppercase; white-space: nowrap;
  transition: opacity 0.4s, transform 0.4s;
}
.lo-tg-d { color: #6A6A74; opacity: 1; }
.lo-tg-c {
  font-family: var(--fc); color: var(--ca); opacity: 0;
  transform: translateX(-50%) translateY(8px);
}

.lo-bar-wrap { width: 100%; opacity: 0; }
.lo-bar-track {
  width: 100%; height: 2px; background: rgba(240,237,234,.07);
  position: relative; overflow: visible; margin-bottom: 0.6rem;
}
.lo-bar-fill {
  position: absolute; top: 0; left: 0; bottom: 0;
  width: 0%; background: var(--ca); transition: background 0.4s;
}
.lo-bar-glow {
  position: absolute; top: -3px; bottom: -3px; left: 0;
  width: 20px; margin-left: -10px;
  background: var(--ca); filter: blur(6px); opacity: 0.6;
  transition: background 0.4s;
}
.lo-bar-labels { display: flex; justify-content: space-between; align-items: center; }
.lo-bar-status {
  font-family: var(--fc); font-size: 0.6rem; letter-spacing: 0.18em;
  color: var(--ca); transition: color 0.4s;
}
.lo-bar-pct {
  font-family: var(--fc); font-size: 0.65rem; letter-spacing: 0.08em;
  color: var(--muted); min-width: 3ch; text-align: right;
}

.lo-corner {
  position: absolute; display: flex; flex-direction: column; gap: 0.15rem;
  font-family: var(--fc); font-size: 0.52rem; letter-spacing: 0.14em;
  text-transform: uppercase; color: rgba(184,255,87,.25); line-height: 1.4;
  pointer-events: none;
}
.lo-corner span:first-child { color: rgba(184,255,87,.5); }
.lo-c-tl { top: 1.5rem; left: 1.75rem; }
.lo-c-tr { top: 1.5rem; right: 1.75rem; text-align: right; }
.lo-c-bl { bottom: 1.5rem; left: 1.75rem; }
.lo-c-br { bottom: 1.5rem; right: 1.75rem; text-align: right; }
.lo-c-tl::before, .lo-c-tr::before { content: ''; display: block; width: 24px; height: 1px; background: rgba(184,255,87,.3); margin-bottom: 0.4rem; }
.lo-c-tr::before { margin-left: auto; }
.lo-c-bl::after, .lo-c-br::after { content: ''; display: block; width: 24px; height: 1px; background: rgba(184,255,87,.3); margin-top: 0.4rem; }
.lo-c-br::after { margin-left: auto; }

@media (max-width: 600px) {
  .lo-stream { width: 100px; }
  .lo-stream-line { font-size: 0.48rem; padding: 0 0.75rem; }
  .lo-corner { font-size: 0.45rem; }
}
</style>