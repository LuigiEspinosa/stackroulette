<script setup>
import { toRef } from 'vue';
import FrontendStack from '../stacks/FrontendStack.vue';
import DatabaseStack from '../stacks/DatabaseStack.vue';
import { useWebStack } from '../../composables/useWebStack';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const { items, generateStack, change, getURLParams, restoreFromURL } =
  useWebStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL });
</script>

<template>
  <div class="stack-row">
    <FrontendStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
    <DatabaseStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
  </div>
</template>
