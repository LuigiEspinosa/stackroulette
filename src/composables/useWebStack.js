import { useStack } from './useStack';
import {
  JS_FRAMEWORKS,
  JS_PREPROCESSORS,
  CSS_FRAMEWORKS,
  CSS_PREPROCESSORS,
  DBMS,
} from '../stacks/web';

const URL_KEYS = [
  ['jsFramework', 'jf', JS_FRAMEWORKS],
  ['jsPreprocessor', 'jp', JS_PREPROCESSORS],
  ['cssFramework', 'cf', CSS_FRAMEWORKS],
  ['cssPreprocessor', 'cp', CSS_PREPROCESSORS],
  ['dbms', 'db', DBMS],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useWebStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function generateStack() {
    clear(SLOT_KEYS);
    return new Promise((resolve) =>
      setTimeout(() => {
        pick('jsFramework', JS_FRAMEWORKS);
        pick('jsPreprocessor', JS_PREPROCESSORS);
        pick('cssFramework', CSS_FRAMEWORKS);
        pick('cssPreprocessor', CSS_PREPROCESSORS);
        pick('dbms', DBMS);
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

  return {
    items,
    generateStack,
    change,
    getURLParams,
    restoreFromURL,
  };
}
