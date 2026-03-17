<script setup>
import StackItem from '../../../components/StackItem.vue';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
  changeMobileFramework: { type: Function },
  filteredPools: { type: Object },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'mobileFramework',
    title: 'Framework',
    options: 'changeMobileFramework',
  },
  {
    key: 'mobileLanguage',
    title: 'Language',
    options: "change('mobileLanguage', filteredPools.mobileLanguage)",
  },
  {
    key: 'mobileUiLibrary',
    title: 'UI Library',
    options: "change('mobileUiLibrary', filteredPools.mobileUiLibrary)",
  },
  {
    key: 'mobileStateManagement',
    title: 'Language',
    options:
      "change('mobileStateManagement', filteredPools.mobileStateManagement)",
  },
];
</script>

<template>
  <section class="stack stack-mobile-app">
    <h1>App</h1>
    <div class="stack-wrapper">
      <StackItem
        v-for="stack in STACK_ITEMS"
        :key="stack.key"
        :title="stack.title"
        :item="items[stack.key]"
        :locked="!!lockedItems[stack.key]"
        @lock="$emit('lock', stack.key)"
        @dontlike="stack.options"
      />
    </div>
  </section>
</template>
