<template>
  <div class="stack-item">
    <template v-if="item">
      <button
        class="lock-btn"
        :class="{ locked }"
        @click.stop="$emit()"
        :title="locked ? 'Unlock this pick' : 'Lock this pick'"
      >
        {{ locked ? '🔒' : '🔓' }}
      </button>
      <h1 v-if="title">{{ title }}</h1>
      <a
        :href="item.website"
        target="_blank"
        :title="`Visit ${item.name}'s website`"
      >
        <img :src="getIcon(item.icon)" :alt="item.name" />
        <h2 :style="`background-color: ${color};`">{{ item.name }}</h2>
      </a>

      <div class="dont-like">
        Don't like it?
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

<script src="./StackItem.js" />
<style lang="scss" src="./StackItem.scss" />
