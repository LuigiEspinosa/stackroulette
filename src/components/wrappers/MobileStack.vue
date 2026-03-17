<script setup>
import { toRef } from 'vue';
import { useMobileStack } from '../../composables/useMobileStack';

import AppStack from '../stacks/Mobile/AppStack.vue';
import NavStack from '../stacks/Mobile/NavStack.vue';
import BaaSStack from '../stacks/Mobile/BaaSStack.vue';
import DistributionStack from '../stacks/Mobile/DistributionStack.vue';
import TestingStack from '../stacks/Mobile/TestingStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  changeMobileFramework,
  filteredPools,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useMobileStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <AppStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    :change-mobile-framework="changeMobileFramework"
    :filtered-pools="filteredPools"
    @lock="$emit('lock', $event)"
  />

  <NavStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    :filtered-pools="filteredPools"
    @lock="$emit('lock', $event)"
  />

  <div class="stack-row">
    <BaaSStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />

    <DistributionStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      :filtered-pools="filteredPools"
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
