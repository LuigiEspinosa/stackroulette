import { useStack } from './useStack';
import {
  JS_FRAMEWORKS,
  JS_PREPROCESSORS,
  CSS_FRAMEWORKS,
  CSS_PREPROCESSORS,
} from '../stacks/web';

const URL_KEYS = [
  ['jsFramework', 'jf', JS_FRAMEWORKS],
  ['jsPreprocessor', 'jp', JS_PREPROCESSORS],
  ['cssFramework', 'cf', CSS_FRAMEWORKS],
  ['cssPreprocessor', 'cp', CSS_PREPROCESSORS],
];

const SLOT_KEYS = URL_KEYS.map(([k]) => k);

export function useWebStack(lockedItems, onUpdate) {
  const { items, pick, change: basePick, clear } = useStack(lockedItems);

  function generateStack() {
    clear(SLOT_KEYS);
    setTimeout(() => {
      pick('jsFramework', JS_FRAMEWORKS);
      pick('jsPreprocessor', JS_PREPROCESSORS);
      pick('cssFramework', CSS_FRAMEWORKS);
      pick('cssPreprocessor', CSS_PREPROCESSORS);
    }, 250);
  }

  function change(key, pool, callback) {
    basePick(key, pool, () => {
      callback?.();
      onUpdate?.();
    });
  }

  return {
    items,
    generateStack,
    change,
  };
}
