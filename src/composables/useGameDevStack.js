import { computed } from 'vue';
import { useStack } from './useStack';
import {
  GAME_AUDIO,
  GAME_DISTRIBUTION,
  GAME_ENGINES,
  GAME_LANGUAGES,
  GAME_NETWORKING,
  GAME_PHYSICS,
} from '../stacks';

const URL_KEYS = [
  ['gameEngine', 'ge', GAME_ENGINES],
  ['gameLanguage', 'gl', GAME_LANGUAGES],
  ['gamePhysics', 'gp', GAME_PHYSICS],
  ['gameAudio', 'ga', GAME_AUDIO],
  ['gameNetworking', 'gn', GAME_NETWORKING],
  ['gameDistribution', 'gd', GAME_DISTRIBUTION],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useGameDevStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('gameEngine', GAME_ENGINES);
        pick('gameLanguage', GAME_LANGUAGES);
        pick('gamePhysics', GAME_PHYSICS);
        pick('gameAudio', GAME_AUDIO);
        pick('gameNetworking', GAME_NETWORKING);
        pick('gameDistribution', GAME_DISTRIBUTION);
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
