<template>
  <div class="mq-band" aria-hidden="true">
    <div class="mq-inner" ref="innerRef">
      <template v-for="_ in 2" :key="_">
        <template v-for="(item, i) in items" :key="i">
          <span class="mq-item" :class="{ a: item === '✦' }">{{ item }}</span>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const items = [
  'Vue.js','✦','Nuxt','✦','Design','✦','Laravel','✦',
  'Graphisme','✦','React','✦','Java','✦','Springboot','✦',
  'Branding','✦','TypeScript','✦',
]

const innerRef = ref<HTMLElement | null>(null)

function pause()  { if (innerRef.value) innerRef.value.style.animationPlayState = 'paused' }
function resume() { if (innerRef.value) innerRef.value.style.animationPlayState = 'running' }

onMounted(() => {
  innerRef.value?.addEventListener('mouseenter', pause)
  innerRef.value?.addEventListener('mouseleave', resume)
})
onUnmounted(() => {
  innerRef.value?.removeEventListener('mouseenter', pause)
  innerRef.value?.removeEventListener('mouseleave', resume)
})
</script>

<style scoped>
.mq-band {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  white-space: nowrap;
  padding: 0.85rem 0;
}
.mq-inner {
  display: inline-flex;
  animation: mqScroll 22s linear infinite;
}
.mq-item {
  font-family: var(--fd);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0 2.2rem;
  color: var(--faint);
}
.mq-item.a { color: var(--ca); transition: color 0.4s; }
</style>
