import { computed } from 'vue';
import { useStack } from './useStack';
import {
  JS_FRAMEWORKS,
  JS_PREPROCESSORS,
  CSS_FRAMEWORKS,
  CSS_PREPROCESSORS,
  DBMS,
  BACKEND_ENVIRONMENTS,
  CMS,
  CONTAINERS,
  CLOUD_PROVIDERS,
  API_LAYERS,
  AUTH_PROVIDERS,
  MICROFRONTENDS,
  CICD,
  MONITORING,
  MESSAGE_QUEUES,
  TESTING_FRAMEWORKS,
  E2E_FRAMEWORKS,
  WASM_TOOLCHAINS,
  WEB_BUNDLERS,
  WEB_PACKAGE_MANAGERS,
} from '../stacks/web';

const URL_KEYS = [
  ['jsFramework', 'jf', JS_FRAMEWORKS],
  ['jsPreprocessor', 'jp', JS_PREPROCESSORS],
  ['cssFramework', 'cf', CSS_FRAMEWORKS],
  ['cssPreprocessor', 'cp', CSS_PREPROCESSORS],
  ['dbms', 'db', DBMS],
  ['backend_environment', 'be', BACKEND_ENVIRONMENTS],
  [
    'backend_framework',
    'bf',
    BACKEND_ENVIRONMENTS.flatMap((e) => e.frameworks),
  ],
  ['cms', 'cm', CMS],
  ['container', 'ct', CONTAINERS],
  ['cloudProvider', 'cl', CLOUD_PROVIDERS],
  ['apiLayer', 'al', API_LAYERS],
  ['authProvider', 'ap', AUTH_PROVIDERS],
  ['microfrontend', 'mf', MICROFRONTENDS],
  ['cicd', 'cd', CICD],
  ['monitoring', 'mn', MONITORING],
  ['messageQueue', 'mq', MESSAGE_QUEUES],
  ['testingFramework', 'tf', TESTING_FRAMEWORKS],
  ['e2eFramework', 'ef', E2E_FRAMEWORKS],
  ['wasmToolchain', 'wt', WASM_TOOLCHAINS],
  ['webBundler', 'wb', WEB_BUNDLERS],
  ['packageManager', 'pm', WEB_PACKAGE_MANAGERS],
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
        pick('backend_environment', BACKEND_ENVIRONMENTS);
        pick(
          'backend_framework',
          items.value.backend_environment?.frameworks ?? [],
        );
        pick('cssFramework', CSS_FRAMEWORKS);
        pick('cssPreprocessor', CSS_PREPROCESSORS);
        pick('dbms', DBMS);
        pick('cms', CMS);
        pick('container', CONTAINERS);
        pick('cloudProvider', CLOUD_PROVIDERS);
        pick('apiLayer', API_LAYERS);
        pick('authProvider', AUTH_PROVIDERS);
        pick('microfrontend', MICROFRONTENDS);
        pick('cicd', CICD);
        pick('monitoring', MONITORING);
        pick('messageQueue', MESSAGE_QUEUES);
        pick('testingFramework', TESTING_FRAMEWORKS);
        pick('e2eFramework', E2E_FRAMEWORKS);
        pick('wasmToolchain', WASM_TOOLCHAINS);
        pick('webBundler', WEB_BUNDLERS);
        pick('packageManager', WEB_PACKAGE_MANAGERS);
        resolve();
      }, 250),
    );
  }

  // Re-pick framwork from the newly selected environment's list.
  function changeBackendEnv() {
    basePick('backend_environment', BACKEND_ENVIRONMENTS, () => {
      basePick(
        'backend_framework',
        items.value.backend_environment?.frameworks ?? [],
        () => {
          onUpdate?.();
        },
      );
    });
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
    changeBackendEnv,
    getURLParams,
    restoreFromURL,
    difficultyItems,
  };
}
