<script setup>
import { toRef } from 'vue';
import { useGameDevStack } from '../../composables/useGameDevStack';

import AppStack from '../stacks/GameDev/AppStack.vue';
import SimulationStack from '../stacks/GameDev/SimulationStack.vue';
import NetworkingStack from '../stacks/GameDev/NetworkingStack.vue';
import DistributionStack from '../stacks/GameDev/DistributionStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useGameDevStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <AppStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />

  <div class="stack-row">
    <SimulationStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
    <NetworkingStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
  </div>

  <DistributionStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
</template>
