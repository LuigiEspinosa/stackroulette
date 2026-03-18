<script setup>
import StackItem from '../../../components/StackItem.vue';
import { AI_EXPERIMENT_TRACKING, AI_FRAMEWORKS } from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'aiFramework',
    title: 'Framework',
    options: AI_FRAMEWORKS,
  },
  {
    key: 'aiExperimentTracking',
    title: 'Experimental Tracking',
    options: AI_EXPERIMENT_TRACKING,
  },
];
</script>

<template>
  <section class="stack stack-ai-train">
    <h1>Training</h1>
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
