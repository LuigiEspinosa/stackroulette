import { ref } from 'vue';
import { sample as _sample } from 'lodash';

export function useStack(lockedItems) {
  const items = ref({});

  function pick(key, pool) {
    if (lockedItems.value[key]) return;
    items.value[key] = _sample(pool);
  }

  function change(key, pool, callback) {
    if (lockedItems.value[key]) return;
    items.value[key] = null;
    setTimeout(() => {
      items.value[key] = _sample(pool);
      callback?.();
    }, 100);
  }

  function clear(keys) {
    keys.forEach((key) => {
      if (!lockedItems.value[key]) items.value[key] = null;
    });
  }

  return { items, pick, change, clear };
}
