<script setup>
import { ref } from 'vue';
import FrontendStack from '../stacks/FrontendStack.vue';

defineProps({ lockedItems: { type: Object, required: true } });

defineEmits(['lock']);

const STACK_SECTIONS = [{ name: 'frontend', component: FrontendStack }];

const stackRefs = ref({});

function setStackRef(name) {
  return (el) => {
    if (el) stackRefs.value[name] = el;
  };
}

function generateStack() {
  Object.values(stackRefs.value).forEach((stack) => stack?.generateStack?.());
}

defineExpose({ generateStack });
</script>

<template>
  <div class="stack-row">
    <component
      v-for="section in STACK_SECTIONS"
      :key="section.name"
      :is="section.component"
      :ref="setStackRef(section.name)"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
  </div>
</template>
