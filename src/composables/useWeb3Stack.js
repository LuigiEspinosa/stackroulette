import { computed } from 'vue';
import { useStack } from './useStack';
import {
  WEB3_CLIENT_LIBS,
  WEB3_FRAMEWORKS,
  WEB3_LANGUAGES,
  WEB3_NETWORKS,
  WEB3_ORACLES,
  WEB3_STORAGE,
  WEB3_TESTING,
  WEB3_WALLETS,
} from '../stacks';

const URL_KEYS = [
  ['web3Network', 'wn', WEB3_NETWORKS],
  ['web3Language', 'wl', WEB3_LANGUAGES],
  ['web3Framework', 'wf', WEB3_FRAMEWORKS],
  ['web3ClientLib', 'wcl', WEB3_CLIENT_LIBS],
  ['web3Wallet', 'ww', WEB3_WALLETS],
  ['web3Storage', 'ws', WEB3_STORAGE],
  ['web3Oracle', 'wo', WEB3_ORACLES],
  ['web3Testing', 'wt', WEB3_TESTING],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useWeb3Stack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('web3Network', WEB3_NETWORKS);
        pick('web3Language', WEB3_LANGUAGES);
        pick('web3Framework', WEB3_FRAMEWORKS);
        pick('web3ClientLib', WEB3_CLIENT_LIBS);
        pick('web3Wallet', WEB3_WALLETS);
        pick('web3Storage', WEB3_STORAGE);
        pick('web3Oracle', WEB3_ORACLES);
        pick('web3Testing', WEB3_TESTING);
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
