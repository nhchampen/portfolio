<template>
  <Teleport to="body">
    <div class="terminal-loader" ref="loaderRef">
      <div class="terminal-body" ref="terminalBody">
        <div class="terminal-output" ref="outputRef">
          <div class="terminal-line" v-for="(line, index) in lines" :key="index">
            <span class="command">{{ line.command }}</span>
            <span class="output" v-if="line.output">{{ line.output }}</span>
          </div>
        </div>
        <div class="terminal-line current">
          <span class="command">{{ currentCommand }}</span>
          <span class="terminal-cursor" ref="cursorRef">█</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loaderRef = ref<HTMLElement | null>(null)
const outputRef = ref<HTMLElement | null>(null)
const cursorRef = ref<HTMLElement | null>(null)

const lines = ref<Array<{ command: string; output?: string }>>([])
const currentCommand = ref('')

const installationSteps = [
  { command: '[    0.000000] Linux version 6.1.0 (build@kernel.org) (gcc 12.2.0) #1 SMP', output: '' },
  { command: '[    0.000001] Command line: BOOT_IMAGE=/boot/vmlinuz root=UUID=xxx ro quiet', output: '' },
  { command: '[    0.000002] x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'', output: '' },
  { command: '[    0.000003] x86/fpu: Supporting XSAVE feature 0x002: \'SSE registers\'', output: '' },
  { command: '[    0.000004] Tech stack init: Loading Nuxt.js kernel modules...', output: 'OK' },
  { command: '[    0.000005] Tech stack init: Mounting Vue filesystem...', output: 'OK' },
  { command: '[    0.000006] Tech stack init: Starting portfolio services...', output: 'OK' },
  { command: '[    0.000007] random: crng init done', output: '' },
  { command: '[    0.000008] Freeing unused kernel memory: 2048K', output: '' },
  { command: '[    0.000009] Write protecting the kernel read-only data: 24576k', output: '' },
  { command: '[    0.000010] Launching application...', output: 'Ready' },
]

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function typeText(text: string, speed = 4) {
  currentCommand.value = ''
  for (let i = 0; i < text.length; i++) {
    currentCommand.value += text[i]
    await sleep(speed)
  }
  await sleep(8)
}

async function runInstallation() {
  for (const step of installationSteps) {
    await typeText(step.command)
    lines.value.push({ command: step.command, output: step.output })
    currentCommand.value = ''
    await sleep(16)
    // Scroll to bottom
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight
    }
  }
  await sleep(60)
}

onMounted(async () => {
  if (!import.meta.client) return
  document.body.style.overflow = 'hidden'

  await runInstallation()

  // Smooth transition to site
  const { gsap } = await import('gsap')
  gsap.to(loaderRef.value, {
    opacity: 0, duration: 0.3, ease: 'power2.out',
    onComplete: () => {
      document.body.style.overflow = ''
      window.dispatchEvent(new CustomEvent('loader-done'))
      loaderRef.value?.remove()
    },
  })
})
</script>

<style scoped>
.terminal-loader {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--fc);
  padding: 20px;
}

.terminal-body {
  width: 100%; height: 100%;
  color: var(--text);
  font-size: 12px;
  line-height: 1.2;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 20px;
}

.terminal-output {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
}

.terminal-line {
  margin-bottom: 2px;
}

.prompt {
  color: #28ca42;
}

.command {
  color: var(--text);
}

.output {
  color: #888;
  margin-left: 10px;
}

.terminal-cursor {
  display: inline-block;
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>