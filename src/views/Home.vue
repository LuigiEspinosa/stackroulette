<script setup>
import { computed, ref, nextTick, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { sample as _sample } from 'lodash';
import confetti from 'canvas-confetti';
import WebStack from '../components/wrappers/WebStack.vue';

// Registry: Adding a new stack type
const STACK_TYPES = {
  web: WebStack,
};

const router = useRouter();
const route = useRoute();

const stackType = ref(null);
const lockedItems = ref({});
const stackRef = ref(null);
const linkCopied = ref(null);

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
#result {
  transform: scale(0.9);
}

.btn-copy-link {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  color: #6cbeff;
  padding: 0.25rem 0.5rem;
}

.stack-row {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.stack {
  flex: 1;
  margin: 0 0.7rem;
  position: relative;

  &:only-of-type {
    margin-bottom: 3rem;
  }

  & > h1 {
    position: absolute;
    top: -2.3rem;
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
}
</style>
