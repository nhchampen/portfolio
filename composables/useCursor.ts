import { onMounted, onUnmounted } from 'vue'

export function useCursor() {
  let curEl: HTMLElement | null = null
  let ringEl: HTMLElement | null = null
  let rx = 0, ry = 0
  let mx = 0, my = 0
  let rafId: number

  function onMove(e: MouseEvent) {
    mx = e.clientX
    my = e.clientY
    if (curEl) {
      curEl.style.left = mx + 'px'
      curEl.style.top  = my + 'px'
    }
  }

  function lerp() {
    rx += (mx - rx) * 0.1
    ry += (my - ry) * 0.1
    if (ringEl) {
      ringEl.style.left = rx + 'px'
      ringEl.style.top  = ry + 'px'
    }
    rafId = requestAnimationFrame(lerp)
  }

  function addHoverTargets(selector: string) {
    document.querySelectorAll<HTMLElement>(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (curEl) curEl.style.transform = 'translate(-50%,-50%) scale(2.6)'
        if (ringEl) { ringEl.style.width = '52px'; ringEl.style.height = '52px' }
      })
      el.addEventListener('mouseleave', () => {
        if (curEl) curEl.style.transform = 'translate(-50%,-50%) scale(1)'
        if (ringEl) { ringEl.style.width = '36px'; ringEl.style.height = '36px' }
      })
    })
  }

  onMounted(() => {
    curEl  = document.getElementById('app-cursor')
    ringEl = document.getElementById('app-cursor-ring')
    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(lerp)
    addHoverTargets('a, button, .pcard, .tech-card, .toggle-wrap')
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMove)
    cancelAnimationFrame(rafId)
  })
}
