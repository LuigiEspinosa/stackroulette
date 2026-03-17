<script setup>
import { ref } from 'vue';

defineProps({
  title: { type: String, required: true },
  item: { type: Object },
  locked: { type: Boolean, default: false },
});

defineEmits(['dontlike', 'lock']);

const color = ref('#000000');

const iconModules = import.meta.glob('../assets/icons/*', {
  eager: true,
  import: 'default',
});

function extractDominantColor(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const size = 50;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);

      const data = ctx.getImageData(0, 0, size, size).data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
      }

      if (count > 0) {
        resolve(
          `rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`,
        );
      } else {
        resolve('#888888');
      }
    };

    img.onerror = () => resolve('#888888');
    img.src = url;
  });
}

function getIcon(pic) {
  const imageBody = iconModules[`../assets/icons/${pic}`] || '';
  if (imageBody) {
    extractDominantColor(imageBody).then((c) => (color.value = c));
  }
  return imageBody;
}
</script>

<template>
  <div class="stack-item">
    <template v-if="item">
      <h1 v-if="title">
        {{ title }}

        <button
          class="lock-btn"
          :class="{ locked }"
          @click.stop="$emit('lock')"
          :title="locked ? 'Unlock this pick' : 'Lock this pick'"
        >
          {{ locked ? '🔒' : '🔓' }}
        </button>
      </h1>
      <a
        :href="item.website"
        target="_blank"
        :title="`Visit ${item.name}'s website`"
      >
        <img :src="getIcon(item.icon)" :alt="item.name" />
        <h2 :style="`background-color: ${color}`">{{ item.name }}</h2>
      </a>
      <div class="dont-like">
        Don't Like it?
        <button
          class="btn btn-link"
          @click="$emit('dontlike', item)"
          :disabled="locked"
        >
          Change
        </button>
      </div>
    </template>
    <template v-else>
      <img src="../assets/roulette.svg" alt="Loading..." />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.stack-item {
  text-align: center;
  position: relative;
  z-index: 1;
  margin: 0.35rem;
  min-width: 210px;

  h1 {
    font-weight: 300;
    font-size: 1.2rem;
    letter-spacing: -0.1rem;
    color: #bfb6d9;
    font-style: italic;
    align-self: flex-start;
    margin-bottom: 2rem;

    .lock-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.8rem;
      opacity: 0.35;
      transition: opacity 0.2s;
      padding: 0;
      line-height: 1;
      color: #bfb6d9;

      &:hover,
      &:locked {
        opacity: 1;
      }
    }
  }

  & > a {
    display: flex;
    flex-direction: column;
    transform: scale(1);
    transition: transform 0.2s;
    margin-bottom: 0.3rem;

    &:hover,
    &:visited {
      text-decoration: none;
      transform: scale(1.1);
    }
  }

  h2 {
    color: #e8e4ff;
    background-color: #1a1325;
    font-size: 1.6rem;
    padding: 0.125rem 0.75rem;
    margin-top: 1rem;
    border-radius: 0.75rem;
    text-align: center;
    letter-spacing: -0.15rem;
    font-weight: 300;
    white-space: nowrap;
    align-self: center;
    border: 1px solid #2a1f3f;
  }

  img {
    max-height: 100px;
    min-height: 90px;
    min-width: 100px;
    max-width: 200px;
    align-self: center;
  }

  .dont-like {
    font-size: 0.8rem;
    letter-spacing: 0;
    color: #9b93b8;
    font-family: sans-serif;

    & > button {
      font-size: 0.8rem;
      vertical-align: baseline;
      padding: 0;
      background-color: transparent;
      border-color: transparent;
      border-radius: 0;
      letter-spacing: 0;
      color: #b388ff;

      &:hover {
        color: #d2b8ff;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .stack-item {
    margin-bottom: 1rem;
  }
}
</style>
