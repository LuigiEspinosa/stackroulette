<script setup>
import StackItem from '../../components/StackItem.vue';
import { API_LAYERS } from '../../stacks/web';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'apiLayer',
    title: 'API Layer',
    options: API_LAYERS,
  },
];
</script>

<template>
  <section class="stack stack-api">
    <h1>API Layer</h1>
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
