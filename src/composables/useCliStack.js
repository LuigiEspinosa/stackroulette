import { computed } from 'vue';
import { useStack } from './useStack';
import {
  CLI_ARG_PARSERS,
  CLI_CONFIG_FORMATS,
  CLI_DISTRIBUTION,
  CLI_LANGUAGES,
} from '../stacks/cli';

const URL_KEYS = [
  ['cliLanguage', 'af', CLI_LANGUAGES],
  ['cliArgParser', 'aet', CLI_ARG_PARSERS],
  ['cliConfigFormat', 'ams', CLI_CONFIG_FORMATS],
  ['cliDistribution', 'avd', CLI_DISTRIBUTION],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useAiMlStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('cliLanguage', CLI_LANGUAGES);
        pick('cliArgParser', CLI_ARG_PARSERS);
        pick('cliConfigFormat', CLI_CONFIG_FORMATS);
        pick('cliDistribution', CLI_DISTRIBUTION);
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
