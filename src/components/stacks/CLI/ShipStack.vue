<script setup>
import StackItem from '../../../components/StackItem.vue';
import { CLI_DISTRIBUTION } from '../../../stacks/cli';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'cliDistribution',
    title: 'Distribution',
    options: CLI_DISTRIBUTION,
  },
];
</script>

<template>
  <section class="stack stack-cli-dist">
    <h1>Ship It</h1>
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
