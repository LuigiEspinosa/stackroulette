<script setup>
import { toRef } from 'vue';
import { useWebStack } from '../../composables/useWebStack';

import ToolingStack from '../stacks/ToolingStack.vue';
import FrontendStack from '../stacks/FrontendStack.vue';
import WebAssemblyStack from '../stacks/WebAssemblyStack.vue';
import BackendStack from '../stacks/BackendStack.vue';
import APILayerStack from '../stacks/APILayerStack.vue';
import AuthProviderStack from '../stacks/AuthProviderStack.vue';
import CMSStack from '../stacks/CMSStack.vue';
import MicrofrontendsStack from '../stacks/MicrofrontendsStack.vue';
import InfrastructureStack from '../stacks/InfrastructureStack.vue';
import MonitoringStack from '../stacks/MonitoringStack.vue';
import MessageQueueStack from '../stacks/MessageQueueStack.vue';
import TestingStack from '../stacks/TestingStack.vue';

const props = defineProps({ lockedItems: { type: Object, required: true } });

const emit = defineEmits(['lock', 'update']);

const {
  items,
  generateStack,
  change,
  changeBackendEnv,
  getURLParams,
  restoreFromURL,
  difficultyItems,
} = useWebStack(toRef(props, 'lockedItems'), () => emit('update'));

defineExpose({ generateStack, getURLParams, restoreFromURL, difficultyItems });
</script>

<template>
  <ToolingStack
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

  <WebAssemblyStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />

  <BackendStack
    :items="items"
    :change="change"
    :change-backend-env="changeBackendEnv"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />

  <div class="stack-row">
    <APILayerStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
    <AuthProviderStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
  </div>

  <div class="stack-row">
    <CMSStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
    <MicrofrontendsStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
  </div>

  <InfrastructureStack
    :items="items"
    :change="change"
    :locked-items="lockedItems"
    @lock="$emit('lock', $event)"
  />

  <div class="stack-row">
    <MonitoringStack
      :items="items"
      :change="change"
      :locked-items="lockedItems"
      @lock="$emit('lock', $event)"
    />
    <MessageQueueStack
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
