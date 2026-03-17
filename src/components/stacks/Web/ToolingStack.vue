<script setup>
import StackItem from '../../../components/StackItem.vue';
import { WEB_BUNDLERS, WEB_PACKAGE_MANAGERS } from '../../../stacks/web';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'webBundler',
    title: 'Bundler',
    options: WEB_BUNDLERS,
  },
  {
    key: 'packageManager',
    title: 'Package Manager',
    options: WEB_PACKAGE_MANAGERS,
  },
];
</script>

<template>
  <div class="stack-row">
    <section class="stack stack-tooling">
      <h1>Tooling</h1>
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
  </div>
</template>
