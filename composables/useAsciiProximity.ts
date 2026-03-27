import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Makes an ASCII block react to mouse proximity:
 * – lights up and shifts slightly toward the cursor
 * – call glitch() to trigger the character-scramble effect
 */
export function useAsciiProximity(elRef: Ref<HTMLElement | null>, maxDist = 300) {
  let rafId: number
  let mouseX = 0
  let mouseY = 0

  const glyphPool = '█▓▒░╔╗╚╝║═┌┐└┘│─├┤┬┴┼╠╣╦╩╬▄▀■□'

  function onMouseMove(e: MouseEvent) {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  function tick() {
    const el = elRef.value
    if (el) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(mouseX - cx, mouseY - cy)
      const prox = Math.max(0, 1 - dist / maxDist)

      if (prox > 0.02) {
        el.style.opacity = String(0.22 + prox * 0.65)
        el.classList.add('lit')
        const dx = (mouseX - cx) * prox * 0.05
        const dy = (mouseY - cy) * prox * 0.05
        el.style.transform = `translate(${dx}px, ${dy}px)`
      } else {
        el.style.opacity = ''
        el.classList.remove('lit')
        el.style.transform = ''
      }
    }
    rafId = requestAnimationFrame(tick)
  }

  function glitch() {
    const el = elRef.value
    if (!el) return
    const original = el.textContent ?? ''
    let iteration = 0
    const iv = setInterval(() => {
      if (++iteration > 8) {
        el.textContent = original
        clearInterval(iv)
        return
      }
      el.textContent = original.split('').map(ch =>
        ch !== '\n' && ch !== ' ' && Math.random() > 0.6
          ? glyphPool[Math.floor(Math.random() * glyphPool.length)]
          : ch,
      ).join('')
    }, 55)
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(rafId)
  })

  return { glitch }
}
