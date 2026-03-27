<script setup>
import StackItem from '../../../components/StackItem.vue';
import { WEB3_STORAGE } from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'web3Storage',
    title: 'Storage / Indexing',
    options: WEB3_STORAGE,
  },
];
</script>

<template>
  <section class="stack stack-web3-data">
    <h1>Data &amp; Storage</h1>
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
