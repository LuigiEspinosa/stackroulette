<script setup>
import { toRef } from 'vue';
import { useEmbeddedStack } from '../../composables/useEmbeddedStack';
import HardwareStack from '../stacks/Embedded/HardwareStack.vue';
import ConnectivityStack from '../stacks/Embedded/ConnectivityStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useEmbeddedStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <HardwareStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
  <ConnectivityStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
</template>
