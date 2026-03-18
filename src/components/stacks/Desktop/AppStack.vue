<script setup>
import StackItem from '../../../components/StackItem.vue';
import { DESKTOP_BUILD_SYSTEMS } from '../../../stacks';

defineProps({
  items: { type: Object, required: true },
  change: { type: Function, required: true },
  lockedItems: { type: Object, required: true },
  changeDesktopLanguage: { type: Function },
  compatibleFrameworks: { type: Function },
});

defineEmits(['lock']);

const STACK_ITEMS = [
  {
    key: 'desktopFramework',
    title: 'Framework / Toolkit',
    options: `change('desktopFramework', compatibleFrameworks)`,
  },
  {
    key: 'desktopLanguage',
    title: 'Language',
    options: `changeDesktopLanguage`,
  },
  {
    key: 'desktopBuildSystems',
    title: 'Build Systems',
    options: `change('desktopBuildSystems',${DESKTOP_BUILD_SYSTEMS})`,
  },
];
</script>

<template>
  <section class="stack stack-desktop-app">
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
