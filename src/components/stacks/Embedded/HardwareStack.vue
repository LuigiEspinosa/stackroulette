<script setup>
import StackItem from '../../../components/StackItem.vue';
import {
  EMBEDDED_LANGUAGES,
  EMBEDDED_PLATFORMS,
  EMBEDDED_RTOS,
} from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'embeddedPlatform',
    title: 'Platform',
    options: EMBEDDED_PLATFORMS,
  },
  {
    key: 'embeddedLanguage',
    title: 'Language',
    options: EMBEDDED_LANGUAGES,
  },
  {
    key: 'embeddedRtos',
    title: 'RTOS',
    options: EMBEDDED_RTOS,
  },
];
</script>

<template>
  <section class="stack stack-embedded-hw">
    <h1>Hardware</h1>
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
