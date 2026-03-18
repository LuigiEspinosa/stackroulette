<script setup>
import StackItem from '../../../components/StackItem.vue';
import { GAME_AUDIO, GAME_PHYSICS } from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'gamePhysics',
    title: 'Physics',
    options: GAME_PHYSICS,
  },
  {
    key: 'gameAudio',
    title: 'Audio',
    options: GAME_AUDIO,
  },
];
</script>

<template>
  <section class="stack stack-game-sim">
    <h1>Simulation</h1>
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
