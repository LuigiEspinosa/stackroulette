<script setup>
import StackItem from '../../../components/StackItem.vue';
import { MOBILE_BAAS } from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'mobileBaas',
    title: 'Backend / BaaS',
    options: MOBILE_BAAS,
  },
];
</script>

<template>
  <section class="stack stack-mobile-baas">
    <h1>Backend &amp; Services</h1>
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
