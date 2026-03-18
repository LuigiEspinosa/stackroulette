<script setup>
import { toRef } from 'vue';
import { useDesktopStack } from '../../composables/useDesktopStack';

import AppStack from '../stacks/Desktop/AppStack.vue';
import DistStack from '../stacks/Desktop/DistStack.vue';
import TestingStack from '../stacks/Desktop/TestingStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  changeDesktopLanguage,
  compatibleFrameworks,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useDesktopStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <AppStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    :change-desktop-language="changeDesktopLanguage"
    :compatible-frameworks="compatibleFrameworks"
    @lock="$emit('lock', $event)"
  />

  <div class="stack-row">
    <DistStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
    <TestingStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
  </div>
</template>
