import { computed } from 'vue';
import { useStack } from './useStack';
import {
  DESKTOP_BUILD_SYSTEMS,
  DESKTOP_FRAMEWORKS,
  DESKTOP_LANGUAGES,
  DESKTOP_PACKAGING,
  DESKTOP_TESTING,
} from '../stacks';

const URL_KEYS = [
  ['desktopFramework', 'df', DESKTOP_FRAMEWORKS],
  ['desktopLanguage', 'dl', DESKTOP_LANGUAGES],
  ['desktopPackaging', 'dp', DESKTOP_PACKAGING],
  ['desktopTesting', 'dt', DESKTOP_TESTING],
  ['desktopBuildSystems', 'dbs', DESKTOP_BUILD_SYSTEMS],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useDesktopStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  const compatibleFrameworks = computed(() => {
    const lang = items.value.desktopLanguage;
    if (!lang) return DESKTOP_FRAMEWORKS;
    const filtered = DESKTOP_FRAMEWORKS.filter((f) =>
      f.languages.includes(lang.name),
    );
    return filtered.length ? filtered : DESKTOP_FRAMEWORKS;
  });

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('desktopFramework', DESKTOP_FRAMEWORKS);
        pick('desktopLanguage', DESKTOP_LANGUAGES);
        pick('desktopPackaging', DESKTOP_PACKAGING);
        pick('desktopTesting', DESKTOP_TESTING);
        pick('desktopBuildSystems', DESKTOP_BUILD_SYSTEMS);
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

  function changeDesktopLanguage() {
    basePick('desktopLanguage', DESKTOP_LANGUAGES, () => {
      const fw = items.value.desktopFramework;
      if (fw && !compatibleFrameworks.value.find((f) => f.name === fw.name)) {
        basePick('desktopFramework', compatibleFrameworks.value, () =>
          onUpdate?.(),
        );
      } else {
        onUpdate?.();
      }
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
    changeDesktopLanguage,
    compatibleFrameworks,
    getURLParams,
    restoreFromURL,
    difficultyItems,
  };
}
