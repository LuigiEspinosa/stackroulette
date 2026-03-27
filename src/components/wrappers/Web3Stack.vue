<script setup>
import { toRef } from 'vue';
import { useWeb3Stack } from '../../composables/useWeb3Stack';

import ChainStack from '../stacks/Web3/ChainStack.vue';
import FrontendStack from '../stacks/Web3/FrontendStack.vue';
import DataStorageStack from '../stacks/Web3/DataStorageStack.vue';
import OracleStack from '../stacks/Web3/OracleStack.vue';
import TestingStack from '../stacks/Web3/TestingStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useWeb3Stack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <ChainStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />
  <FrontendStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />

  <div class="stack">
    <DataStorageStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
    <OracleStack
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
