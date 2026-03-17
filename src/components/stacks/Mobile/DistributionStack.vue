<script setup>
import StackItem from '../../../components/StackItem.vue';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
  filteredPools: { type: Object },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'mobileDistribution',
    title: 'CI/CD & Distribution',
  },
];
</script>

<template>
  <section class="stack stack-mobile-dist">
    <h1>Distribution</h1>
    <div class="stack-wrapper">
      <StackItem
        v-for="stack in STACK_ITEMS"
        :key="stack.key"
        :title="stack.title"
        :item="items[stack.key]"
        :locked="!!lockedItems[stack.key]"
        @lock="$emit('lock', stack.key)"
        @dontlike="change(stack.key, filteredPools[stack.key])"
      />
    </div>
  </section>
</template>
