import { computed } from 'vue';
import { useStack } from './useStack';
import {
  AI_EXPERIMENT_TRACKING,
  AI_FRAMEWORKS,
  AI_MODEL_SERVING,
  AI_ORCHESTRATION,
  AI_VECTOR_DBS,
} from '../stacks';

const URL_KEYS = [
  ['aiFramework', 'af', AI_FRAMEWORKS],
  ['aiExperimentTracking', 'aet', AI_EXPERIMENT_TRACKING],
  ['aiModelServing', 'ams', AI_MODEL_SERVING],
  ['aiVectorDb', 'avd', AI_VECTOR_DBS],
  ['aiOrchestration', 'ao', AI_ORCHESTRATION],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useAiMlStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('aiFramework', AI_FRAMEWORKS);
        pick('aiExperimentTracking', AI_EXPERIMENT_TRACKING);
        pick('aiModelServing', AI_MODEL_SERVING);
        pick('aiVectorDb', AI_VECTOR_DBS);
        pick('aiOrchestration', AI_ORCHESTRATION);
        resolve();
      }, 250),
    );
  }

  function change(key, pool, callback) {
    basePick(key, pool, () => {
      callback?.();
      onUpdate?.();
    });
  }

  function getURLParams() {
    return URL_KEYS.reduce((acc, [prop, key]) => {
      if (items.value[prop]) acc[key] = items.value[prop].name;
      return acc;
    }, {});
  }

  function restoreFromURL(query) {
    URL_KEYS.forEach(([prop, key, arr]) => {
      if (query[key])
        items.value[prop] = arr.find((x) => x.name === query[key]) ?? null;
    });
  }

  const difficultyItems = computed(() =>
    SLOT_KEYS.map((k) => items.value[k]).filter(Boolean),
  );

  return {
    items,
    generateStack,
    change,
    getURLParams,
    restoreFromURL,
    difficultyItems,
  };
}
