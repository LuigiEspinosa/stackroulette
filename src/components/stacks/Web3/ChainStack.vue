<script setup>
import StackItem from '../../../components/StackItem.vue';
import {
  WEB3_FRAMEWORKS,
  WEB3_LANGUAGES,
  WEB3_NETWORKS,
} from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'web3Network',
    title: 'Network',
    options: WEB3_NETWORKS,
  },
  {
    key: 'web3Language',
    title: 'Smart Contract Language',
    options: WEB3_LANGUAGES,
  },
  {
    key: 'web3Framework',
    title: 'Dev Framework',
    options: WEB3_FRAMEWORKS,
  },
];
</script>

<template>
  <section class="stack stack-web3-core">
    <h1>Chain</h1>
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
