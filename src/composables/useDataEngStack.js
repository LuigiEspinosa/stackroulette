import { computed } from 'vue';
import { useStack } from './useStack';
import {
  DATA_INGESTION,
  DATA_ORCHESTRATION,
  DATA_TRANSFORMATION,
  DATA_WAREHOUSE,
} from '../stacks';

const URL_KEYS = [
  ['dataIngestion', 'di', DATA_INGESTION],
  ['dataTransformation', 'dtr', DATA_TRANSFORMATION],
  ['dataWarehouse', 'dw', DATA_WAREHOUSE],
  ['dataOrchestration', 'do', DATA_ORCHESTRATION],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useDataEngStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('dataIngestion', DATA_INGESTION);
        pick('dataTransformation', DATA_TRANSFORMATION);
        pick('dataWarehouse', DATA_WAREHOUSE);
        pick('dataOrchestration', DATA_ORCHESTRATION);
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
