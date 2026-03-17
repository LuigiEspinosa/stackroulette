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
    key: 'mobileNavigation',
    title: 'Navigation',
  },
  {
    key: 'mobileLocalDb',
    title: 'Local Database',
  },
];
</script>

<template>
  <div class="stack-row">
    <section class="stack stack-mobile-nav">
      <h1>Navigation &amp; Storage</h1>
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
  </div>
</template>
