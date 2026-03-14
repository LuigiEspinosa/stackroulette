<script setup>
import { toRef } from 'vue';
import { useWebStack } from '../../composables/useWebStack';
import FrontendStack from '../stacks/FrontendStack.vue';
import DatabaseStack from '../stacks/DatabaseStack.vue';
import BackendStack from '../stacks/BackendStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  changeBackendEnv,
  getURLParams,
  restoreFromURL,
} = useWebStack(toRef(props, 'lockedItems'), () => emit('update'));

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

    <div class="stack-backend-container">
      <BackendStack
        :items="items"
        :change="change"
        :change-backend-env="changeBackendEnv"
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
  </div>
</template>
