<script setup>
import { toRef } from 'vue';
import { useCliStack } from '../../composables/useCliStack';

import ImplementationStack from '../stacks/CLI/ImplementationStack.vue';
import ShipStack from '../stacks/CLI/ShipStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useCliStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <ImplementationStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
  <ShipStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
</template>
