<script setup>
import StackItem from '../../../components/StackItem.vue';
import { CLOUD_PROVIDERS, CONTAINERS, CICD } from '../../../stacks/web';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'cloudProvider',
    title: 'Cloud Provider',
    options: CLOUD_PROVIDERS,
  },
  {
    key: 'container',
    title: 'Containers',
    options: CONTAINERS,
  },
  {
    key: 'cicd',
    title: 'CI/CD',
    options: CICD,
  },
];
</script>

<template>
  <section class="stack stack-infra">
    <h1>Infrastructure</h1>
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
