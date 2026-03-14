<script setup>
import StackItem from '../../components/StackItem.vue';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
  changeBackendEnv: { type: Function },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'backend_environment',
    title: 'Language/Env',
    options: 'changeBackendEnv',
  },
  {
    key: 'backend_framework',
    title: 'Framework',
    options:
      "change('backend_framework', items.backend_environment?.frameworks ?? [])",
  },
];
</script>

<template>
  <section class="stack stack-backend">
    <h1>Back-End</h1>
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
