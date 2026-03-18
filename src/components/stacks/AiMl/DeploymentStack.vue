<script setup>
import StackItem from '../../../components/StackItem.vue';
import { AI_VECTOR_DBS } from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'aiVectorDb',
    title: 'Vector DB',
    options: AI_VECTOR_DBS,
  },
];
</script>

<template>
  <section class="stack stack-ai-data">
    <h1>Data</h1>
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
