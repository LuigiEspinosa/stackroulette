import { computed } from 'vue';
import { useStack } from './useStack';
import {
  MOBILE_BAAS,
  MOBILE_DISTRIBUTION,
  MOBILE_FRAMEWORKS,
  MOBILE_LANGUAGES,
  MOBILE_LOCAL_DB,
  MOBILE_NAVIGATION,
  MOBILE_STATE_MANAGEMENT,
  MOBILE_TESTING,
  MOBILE_UI_LIBRARIES,
} from '../stacks';

const URL_KEYS = [
  ['mobileFramework', 'mfw', MOBILE_FRAMEWORKS],
  ['mobileLanguage', 'ml', MOBILE_LANGUAGES],
  ['mobileUiLibrary', 'mu', MOBILE_UI_LIBRARIES],
  ['mobileStateManagement', 'ms', MOBILE_STATE_MANAGEMENT],
  ['mobileNavigation', 'mn', MOBILE_NAVIGATION],
  ['mobileLocalDb', 'md', MOBILE_LOCAL_DB],
  ['mobileBaas', 'mb', MOBILE_BAAS],
  ['mobileDistribution', 'mdist', MOBILE_DISTRIBUTION],
  ['mobileTesting', 'mt', MOBILE_TESTING],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

const ECO_POOLS = [
  'mobileLanguage',
  'mobileUiLibrary',
  'mobileStateManagement',
  'mobileNavigation',
  'mobileLocalDb',
  'mobileDistribution',
];

const POOL_MAP = {
  mobileLanguage: MOBILE_FRAMEWORKS,
  mobileUiLibrary: MOBILE_LANGUAGES,
  mobileStateManagement: MOBILE_STATE_MANAGEMENT,
  mobileNavigation: MOBILE_NAVIGATION,
  mobileLocalDb: MOBILE_LOCAL_DB,
  mobileDistribution: MOBILE_DISTRIBUTION,
};

export function useMobileStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function byEco(list) {
    const eco = items.value.mobileFramework?.ecosystem;
    return eco
      ? list.filter((x) => !x.ecosystems || x.ecosystems.includes(eco))
      : list;
  }

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('mobileFramework', MOBILE_FRAMEWORKS);
        pick('mobileLanguage', byEco(MOBILE_LANGUAGES));
        pick('mobileUiLibrary', byEco(MOBILE_UI_LIBRARIES));
        pick('mobileStateManagement', byEco(MOBILE_STATE_MANAGEMENT));
        pick('mobileNavigation', byEco(MOBILE_NAVIGATION));
        pick('mobileLocalDb', byEco(MOBILE_LOCAL_DB));
        pick('mobileBaas', MOBILE_BAAS);
        pick('mobileDistribution', byEco(MOBILE_DISTRIBUTION));
        pick('mobileTesting', MOBILE_TESTING);
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

  function changeMobileFramework() {
    const cascadeKeys = ['mobileFramework', ...ECO_POOLS];
    clear(cascadeKeys);
    setTimeout(() => {
      pick('mobileFramework', MOBILE_FRAMEWORKS);
      ECO_POOLS.forEach((key) => pick(key, byEco(POOL_MAP[key])));
      onUpdate?.();
    }, 100);
  }

  const filteredPools = computed(() => ({
    mobileLanguage: byEco(MOBILE_LANGUAGES),
    mobileUiLibrary: byEco(MOBILE_UI_LIBRARIES),
    mobileStateManagement: byEco(MOBILE_STATE_MANAGEMENT),
    mobileNavigation: byEco(MOBILE_NAVIGATION),
    mobileLocalDb: byEco(MOBILE_LOCAL_DB),
    mobileDistribution: byEco(MOBILE_DISTRIBUTION),
  }));

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
    changeMobileFramework,
    filteredPools,
    getURLParams,
    restoreFromURL,
    difficultyItems,
  };
}
