import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModeStore = defineStore('mode', () => {
  const isCode = ref(false)

  function switchMode() {
    isCode.value = !isCode.value
    if (import.meta.client) {
      document.body.classList.toggle('cmode', isCode.value)
    }
  }

  return { isCode, switchMode }
})
