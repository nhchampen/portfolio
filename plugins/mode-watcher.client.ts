import { watch } from 'vue'
import { useModeStore } from '~/stores/mode'

export default defineNuxtPlugin(() => {
  const mode = useModeStore()

  function syncTargets(isCode: boolean) {
    document.querySelectorAll('[data-mode-target]').forEach(el => {
      el.classList.toggle('cmode-active', isCode)
    })
  }

  if (import.meta.client) {
    watch(
      () => mode.isCode,
      (val) => syncTargets(val),
      { immediate: true },
    )
  }
})