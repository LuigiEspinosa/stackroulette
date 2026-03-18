<script setup>
import { computed, ref, nextTick, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { sample as _sample } from 'lodash';
import confetti from 'canvas-confetti';
import { MAINSTREAM } from '../stacks/mainstream';

import WebStack from '../components/wrappers/WebStack.vue';
import MobileStack from '../components/wrappers/MobileStack.vue';
import DesktopStack from '../components/wrappers/DesktopStack.vue';
import GameDevStack from '../components/wrappers/GameDevStack.vue';
import AiMlStack from '../components/wrappers/AiMlStack.vue';
import DataEngStack from '../components/wrappers/DataEngStack.vue';
import EmbeddedStack from '../components/wrappers/EmbeddedStack.vue';

// Registry: Adding a new stack type
const STACK_TYPES = {
  web: WebStack,
  mobile: MobileStack,
  desktop: DesktopStack,
  gamedev: GameDevStack,
  aiml: AiMlStack,
  dataeng: DataEngStack,
  embedded: EmbeddedStack,
};

const STACK_META = {
  web: { label: '🌐 Web App Stack', badgeClass: 'badge-web' },
  mobile: { label: '📱 Mobile App Stack', badgeClass: 'badge-mobile' },
  desktop: { label: '🖥️ Desktop App Stack', badgeClass: 'badge-desktop' },
  gamedev: { label: '🎮 Game Dev Stack', badgeClass: 'badge-gamedev' },
  aiml: { label: '🤖 AI / ML Stack', badgeClass: 'badge-aiml' },
  dataeng: { label: '📊 Data Engineering Stack', badgeClass: 'badge-dataeng' },
  embedded: { label: '🔌 Embedded / IoT Stack', badgeClass: 'badge-embedded' },
};

const router = useRouter();
const route = useRoute();

const stackType = ref(null);
const lockedItems = ref({});
const stackRef = ref(null);
const linkCopied = ref(null);

const stackDifficulty = computed(() => {
  const d = stackRef.value?.difficultyItems;
  if (!d?.length) return null;
  const ratio = d.filter((i) => !MAINSTREAM.has(i.name)).length / d.length;
  if (ratio < 0.2) return { label: 'Mainstream Stack', emoji: '🟢' };
  if (ratio < 0.4) return { label: 'Adventurous Stack', emoji: '🔵' };
  if (ratio < 0.6) return { label: 'Hipster Stack', emoji: '🟣' };
  if (ratio < 0.8) return { label: 'Expert Mode', emoji: '🔴' };
  return { label: '10x Mode', emoji: '💀' };
});

const currentStackComponent = computed(() =>
  stackType.value ? STACK_TYPES[stackType.value] : null,
);

function toggleLock(key) {
  if (lockedItems.value[key]) {
    const next = { ...lockedItems.value };
    delete next[key];
    lockedItems.value = next;
  } else {
    lockedItems.value = { ...lockedItems.value, [key]: true };
  }
}

async function updateURL() {
  const params = (await stackRef.value?.getURLParams?.()) ?? {};
  router.replace({ query: { t: stackType.value, ...params } }).catch(() => {});
}

async function generateStack() {
  stackType.value = null;
  await nextTick();
  stackType.value = _sample(Object.keys(STACK_TYPES));
  await nextTick();

  if (stackRef.value) {
    await stackRef.value?.generateStack();
  }

  await updateURL();
}

async function restoreFromURL() {
  const q = route.query;
  if (!q.t || !STACK_TYPES[q.t]) return false;
  stackType.value = q.t;
  await nextTick();
  stackRef.value?.restoreFromURL(q);
  return true;
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  linkCopied.value = true;
  setTimeout(() => {
    linkCopied.value = false;
  }, 2000);
}

defineExpose({ generateStack });

onMounted(async () => {
  if (!(await restoreFromURL())) generateStack();

  const end = Date.now() + 2000;
  const frame = () => {
    if (Date.now() > end) return;
    confetti({
      particleCount: 1,
      startVelocity: 10,
      spread: 360,
      ticks: 200,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
    });
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
});
</script>

<template>
  <div class="home">
    <div class="text-center">
      <p>
        Not sure about what technologies to use for your next project?
        <span class="text-nowrap">Leave it to chance 🍀</span>
      </p>
    </div>

    <h2 class="sub-title text-nowrap">Here's a new stack for you:</h2>

    <div class="text-center">
      <button id="roll" class="btn btn-primary" @click="generateStack">
        👎 Don't like it? <strong>Generate another one!</strong>
      </button>
      <button
        v-if="stackType"
        class="btn btn-link btn-copy-link"
        @click="copyLink"
      >
        {{ linkCopied ? '✓ Copied!' : '🔗 Copy Link' }}
      </button>
    </div>

    <main>
      <div id="result" v-if="stackType">
        <div class="stack-type-badge text-center">
          <span
            v-if="STACK_META[stackType]"
            :class="['badge', STACK_META[stackType].badgeClass]"
          >
            {{ STACK_META[stackType].label }}
          </span>
          <span v-if="stackDifficulty" class="badge badge-difficulty ms-2">
            {{ stackDifficulty.emoji }} {{ stackDifficulty.label }}
          </span>
        </div>

        <component
          :is="currentStackComponent"
          ref="stackRef"
          :locked-items="lockedItems"
          @update="updateURL"
          @lock="toggleLock"
        />
      </div>
      <div v-else class="text-center">
        <img src="../assets/roulette.svg" alt="Loading..." width="80" />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@use 'sass:color';

$stack-color: rgb(108, 190, 255);
$mobile-color: rgb(134, 108, 255);
$desktop-color: rgb(52, 168, 120);
$gamedev-color: rgb(234, 130, 20);
$aiml-color: rgb(139, 92, 246);
$dataeng-color: rgb(20, 184, 166);
$embedded-color: rgb(220, 80, 60);

#result {
  margin-top: 4rem;
}

.stack-type-badge {
  margin-bottom: 2.5rem;

  .badge {
    font-size: 1rem;
    font-weight: 500;
    padding: 0.4rem 1.2rem;
    border-radius: 2rem;
  }

  .badge-difficulty {
    background-color: #f8f9fa;
    color: #555;
    border: 1px solid #dee2e6;
  }

  .badge-web {
    background-color: $stack-color;
    color: color.adjust($stack-color, $lightness: -40%);
    border: 1px solid $stack-color;
  }

  .badge-mobile {
    background-color: $mobile-color;
    color: color.adjust($mobile-color, $lightness: -40%);
    border: 1px solid $mobile-color;
  }

  .badge-desktop {
    background-color: $desktop-color;
    color: color.adjust($desktop-color, $lightness: -40%);
    border: 1px solid $desktop-color;
  }

  .badge-gamedev {
    background-color: $gamedev-color;
    color: color.adjust($gamedev-color, $lightness: -40%);
    border: 1px solid $gamedev-color;
  }

  .badge-aiml {
    background-color: $aiml-color;
    color: color.adjust($aiml-color, $lightness: -40%);
    border: 1px solid $aiml-color;
  }

  .badge-dataeng {
    background-color: $dataeng-color;
    color: color.adjust($dataeng-color, $lightness: -40%);
    border: 1px solid $dataeng-color;
  }

  .badge-embedded {
    background-color: $embedded-color;
    color: color.adjust($embedded-color, $lightness: -40%);
    border: 1px solid $embedded-color;
  }
}

.btn-copy-link {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  color: #6cbeff;
  padding: 0.25rem 0.5rem;
}

.stack-backend-container,
.stack-row {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.stack {
  flex: 1;
  margin: 0 0.7rem;
  position: relative;

  & > h1 {
    font-weight: 500;
  }
}

// Stack wrapper base + per-type themes
.stack-wrapper {
  padding: 2rem;
  border-radius: 0.1875rem;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  margin-bottom: 2rem;
}

@media screen and (max-width: 76px) {
  #result {
    margin-top: 2rem;
    transform: scale(0.95);
  }

  .stack-wrapper {
    flex-wrap: wrap;

    > div {
      flex: 1;
    }
  }
}

@media screen and (max-width: 512px) {
  .stack-wrapper {
    flex-direction: column;
  }

  .stack {
    margin: 0 0 3rem 0;
  }

  .stack-backend-container .stack-row {
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
}
</style>
