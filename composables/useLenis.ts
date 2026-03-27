import { onMounted, onUnmounted } from 'vue'

/**
 * Initialise Lenis smooth scroll et le connecte à GSAP ScrollTrigger
 * si GSAP est disponible.
 * À appeler une seule fois dans app.vue.
 */
export function useLenis() {
  let lenis: any = null

  onMounted(async () => {
    if (!import.meta.client) return

    const { default: Lenis } = await import('lenis')
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Sync Lenis RAF with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Lenis → ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
  })

  onUnmounted(() => {
    lenis?.destroy()
  })

  return {
    getLenis: () => lenis,
  }
}
