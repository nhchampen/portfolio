<template>
  <div ref="elRef" class="ascii" :class="extraClass">{{ content }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAsciiProximity } from '~/composables/useAsciiProximity'

const props = defineProps<{
  content: string
  extraClass?: string
}>()

const elRef = ref<HTMLElement | null>(null)
const { glitch } = useAsciiProximity(elRef)

function onGlitch() { glitch() }

onMounted(() => window.addEventListener('ascii-glitch', onGlitch))
onUnmounted(() => window.removeEventListener('ascii-glitch', onGlitch))
</script>
