<script setup>
import { toRef } from 'vue';
import { useAiMlStack } from '../../composables/useAiMlStack';

import TrainStack from '../stacks/AiMl/TrainStack.vue';
import DataStack from '../stacks/AiMl/DataStack.vue';
import DeploymentStack from '../stacks/AiMl/DeploymentStack.vue';
import PipelineStack from '../stacks/AiMl/PipelineStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useAiMlStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <TrainStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />

  <div class="stack-row">
    <DataStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
    <DeploymentStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
  </div>

  <PipelineStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
</template>
