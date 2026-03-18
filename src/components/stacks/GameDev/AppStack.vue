<script setup>
import StackItem from '../../../components/StackItem.vue';
import { GAME_ENGINES, GAME_LANGUAGES } from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'gameEngine',
    title: 'Engine',
    options: GAME_ENGINES,
  },
  {
    key: 'gameLanguage',
    title: 'Language',
    options: GAME_LANGUAGES,
  },
];
</script>

<template>
  <section class="stack stack-game-app">
    <h1>Engine &amp; Language</h1>
    <div class="stack-wrapper">
      <StackItem
        v-for="stack in STACK_ITEMS"
        :key="stack.key"
        :title="stack.title"
        :item="items[stack.key]"
        :locked="!!lockedItems[stack.key]"
        @lock="$emit('lock', stack.key)"
        @dontlike="change(stack.key, stack.options)"
      />
    </div>
  </section>
</template>
