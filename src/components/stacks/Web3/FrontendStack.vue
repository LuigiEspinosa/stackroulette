<script setup>
import StackItem from '../../../components/StackItem.vue';
import { WEB3_CLIENT_LIBS, WEB3_WALLETS } from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'web3ClientLib',
    title: 'Client Library',
    options: WEB3_CLIENT_LIBS,
  },
  {
    key: 'web3Wallet',
    title: 'Wallet / Auth',
    options: WEB3_WALLETS,
  },
];
</script>

<template>
  <section class="stack stack-web3-client">
    <h1>Frontend</h1>
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
