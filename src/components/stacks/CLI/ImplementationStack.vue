<script setup>
import StackItem from '../../../components/StackItem.vue';
import {
  CLI_ARG_PARSERS,
  CLI_CONFIG_FORMATS,
  CLI_LANGUAGES,
} from '../../../stacks/cli';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'cliLanguage',
    title: 'Language',
    options: CLI_LANGUAGES,
  },
  {
    key: 'cliArgParser',
    title: 'Arg Parser',
    options: CLI_ARG_PARSERS,
  },
  {
    key: 'cliConfigFormat',
    title: 'Config Format',
    options: CLI_CONFIG_FORMATS,
  },
];
</script>

<template>
  <section class="stack stack-cli-impl">
    <h1>Implementation</h1>
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
