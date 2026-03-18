import { computed } from 'vue';
import { useStack } from './useStack';
import {
  EMBEDDED_CONNECTIVITY,
  EMBEDDED_LANGUAGES,
  EMBEDDED_PLATFORMS,
  EMBEDDED_RTOS,
} from '../stacks';

const URL_KEYS = [
  ['embeddedLanguage', 'el', EMBEDDED_LANGUAGES],
  ['embeddedRtos', 'er', EMBEDDED_RTOS],
  ['embeddedPlatform', 'ep', EMBEDDED_PLATFORMS],
  ['embeddedConnectivity', 'ec', EMBEDDED_CONNECTIVITY],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useEmbeddedStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('embeddedLanguage', EMBEDDED_LANGUAGES);
        pick('embeddedRtos', EMBEDDED_RTOS);
        pick('embeddedPlatform', EMBEDDED_PLATFORMS);
        pick('embeddedConnectivity', EMBEDDED_CONNECTIVITY);
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
