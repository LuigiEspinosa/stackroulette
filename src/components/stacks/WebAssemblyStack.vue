<script setup>
import StackItem from '../../components/StackItem.vue';
import { WASM_TOOLCHAINS } from '../../stacks/web';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'wasmToolchain',
    title: 'Toolchain',
    options: WASM_TOOLCHAINS,
  },
];
</script>

<template>
  <section class="stack stack-wasm">
    <h1>WebAssembly</h1>
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
