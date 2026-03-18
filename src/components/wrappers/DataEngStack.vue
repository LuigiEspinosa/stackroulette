<script setup>
import { toRef } from 'vue';
import { useDataEngStack } from '../../composables/useDataEngStack';
import PipelineStack from '../stacks/DataEng/PipelineStack.vue';
import OrchestrationStack from '../stacks/DataEng/OrchestrationStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useDataEngStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <PipelineStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
  <OrchestrationStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
</template>
