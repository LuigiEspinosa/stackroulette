<script setup>
import StackItem from '../../../components/StackItem.vue';
import {
  JS_PREPROCESSORS,
  JS_FRAMEWORKS,
  CSS_FRAMEWORKS,
  CSS_PREPROCESSORS,
} from '../../../stacks/web';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'jsPreprocessor',
    title: 'Language/Compiler',
    options: JS_PREPROCESSORS,
  },
  {
    key: 'jsFramework',
    title: 'JS Framework',
    options: JS_FRAMEWORKS,
  },
  {
    key: 'cssPreprocessor',
    title: 'CSS Preprocessor',
    options: CSS_PREPROCESSORS,
  },
  {
    key: 'cssFramework',
    title: 'CSS Framework',
    options: CSS_FRAMEWORKS,
  },
];
</script>

<template>
  <section class="stack stack-frontend">
    <h1>Front-End</h1>
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
