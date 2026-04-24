<template>
  <!-- Lien externe -->
  <a
    v-if="externalUrl"
    :href="externalUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="pcard"
    :class="[sizeClass]"
    :data-t="type"
    style="text-decoration: none;"
  >
    <!-- Thumbnail -->
    <div class="ptumb">
      <div class="pt-hatch"></div>
      <div class="pt-blob" :style="{ background: blobColor }"></div>
      <span class="pt-num">{{ num }}</span>
      <div class="pt-tags">
        <span v-for="tag in tags" :key="tag" class="pt-tag">{{ tag }}</span>
      </div>
    </div>

    <!-- Code overlay (mode code only) -->
    <div class="code-ov">
      <div class="cv-lines" v-html="codeHtml"></div>
      <div class="cv-tags">
        <span v-for="tag in tags" :key="tag" class="cv-tag">{{ tag }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="pfoot">
      <div>
        <div class="pm">{{ meta }}</div>
        <div class="pn">{{ title }}</div>
      </div>
      <div class="pa">→</div>
    </div>
  </a>

  <!-- Lien interne avec NuxtLink -->
  <NuxtLink
    v-else-if="slug"
    :to="`/work/${slug}`"
    class="pcard"
    :class="[sizeClass]"
    :data-t="type"
    style="text-decoration: none;"
  >
    <!-- Thumbnail -->
    <div class="ptumb">
      <div class="pt-hatch"></div>
      <div class="pt-blob" :style="{ background: blobColor }"></div>
      <span class="pt-num">{{ num }}</span>
      <div class="pt-tags">
        <span v-for="tag in tags" :key="tag" class="pt-tag">{{ tag }}</span>
      </div>
    </div>

    <!-- Code overlay (mode code only) -->
    <div class="code-ov">
      <div class="cv-lines" v-html="codeHtml"></div>
      <div class="cv-tags">
        <span v-for="tag in tags" :key="tag" class="cv-tag">{{ tag }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="pfoot">
      <div>
        <div class="pm">{{ meta }}</div>
        <div class="pn">{{ title }}</div>
      </div>
      <div class="pa">→</div>
    </div>
  </NuxtLink>

  <!-- Aucun lien (élément neutre) -->
  <div
    v-else
    class="pcard"
    :class="[sizeClass]"
    :data-t="type"
    style="text-decoration: none;"
  >
    <!-- Thumbnail -->
    <div class="ptumb">
      <div class="pt-hatch"></div>
      <div class="pt-blob" :style="{ background: blobColor }"></div>
      <span class="pt-num">{{ num }}</span>
      <div class="pt-tags">
        <span v-for="tag in tags" :key="tag" class="pt-tag">{{ tag }}</span>
      </div>
    </div>

    <!-- Code overlay (mode code only) -->
    <div class="code-ov">
      <div class="cv-lines" v-html="codeHtml"></div>
      <div class="cv-tags">
        <span v-for="tag in tags" :key="tag" class="cv-tag">{{ tag }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="pfoot">
      <div>
        <div class="pm">{{ meta }}</div>
        <div class="pn">{{ title }}</div>
      </div>
      <div class="pa">→</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  num: string
  title: string
  meta: string
  type: 'dev' | 'design'
  size: 'large' | 'small' | 'wide' | 'half'
  tags: string[]
  codeHtml: string
  blobColor?: string
  slug?: string
  externalUrl?: string
}>()

const sizeClass = computed(() => ({
  large: 'pc',
  small: 'ps',
  wide: 'pw',
  half: 'ph',
}[props.size]))

const blobColor = computed(() => props.blobColor ?? 'var(--ca)')
</script>

<style scoped>
.pcard {
  position: relative;
  overflow: hidden;
  background: var(--bg2);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: border-color 0.3s;
  display: flex;
  flex-direction: column;
}
a.pcard { display: flex; flex-direction: column; text-decoration: none; }
.pcard:hover { border-color: rgba(var(--text-rgb), 0.2); }

.pcard a { 
  text-decoration: none;
}

/* Grid sizes */
.pc { grid-column: span 7; }
.ps { grid-column: span 5; }
.pw { grid-column: span 12; }
.ph { grid-column: span 4; }

/* Thumbnail */
.ptumb {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg3);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pw .ptumb { aspect-ratio: 21 / 8; }
.ph .ptumb { aspect-ratio: 4 / 5; }

.pt-num {
  font-family: var(--fd);
  font-weight: 800;
  font-size: clamp(2.5rem, 6vw, 6rem);
  color: var(--faint);
  letter-spacing: -0.06em;
  position: relative;
  z-index: 1;
  transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}
.pcard:hover .pt-num { transform: scale(0.85) translateY(-6px); }

.pt-hatch {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    -45deg, transparent, transparent 12px,
    rgba(var(--text-rgb), 0.02) 12px,
    rgba(var(--text-rgb), 0.02) 13px
  );
}
.pt-blob {
  position: absolute;
  bottom: -30px; right: -30px;
  width: 120px; height: 120px;
  border-radius: 50%;
  opacity: 0.2;
  transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.4s;
}
.pcard:hover .pt-blob { transform: scale(3.5); opacity: 0.35; }

.pt-tags {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 0.75rem 1rem;
  background: linear-gradient(to top, rgba(var(--bg-rgb), 0.9), transparent);
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.3s;
}
.pcard:hover .pt-tags { transform: translateY(0); opacity: 1; }
.pt-tag {
  font-size: 0.6rem;
  letter-spacing: 0.07em;
  padding: 0.22rem 0.55rem;
  border: 1px solid rgba(var(--text-rgb), 0.15);
  color: var(--muted);
  background: rgba(var(--bg-rgb), 0.7);
}

/* Code overlay */
.code-ov {
  position: absolute;
  inset: 0; bottom: auto;
  background: rgba(var(--bg-rgb), 0.96);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

:deep(.cv-lines) {
  font-family: var(--fc);
  font-size: 0.7rem;
  line-height: 2;
  color: var(--muted);
}
.cv-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
.cv-tag {
  font-family: var(--fc);
  font-size: 0.6rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--faint);
  color: var(--muted);
}

/* Footer */
.pfoot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  flex: 1;
}
.pm {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.22rem;
}
.pn {
  font-family: var(--fd);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  transition: color 0.3s;
  color: var(--text);
}
.pcard:hover .pn { color: var(--ca); }

.pa {
  width: 36px; height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.9rem;
  flex-shrink: 0;
  transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.3s;
}
.pcard:hover .pa {
  background: var(--ca);
  border-color: var(--ca);
  color: var(--bg);
  transform: rotate(-45deg);
}

@media (max-width: 960px) {
  .pc, .ps, .ph { grid-column: span 12; }
}
</style>