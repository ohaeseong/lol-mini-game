/* eslint-disable react-hooks/rules-of-hooks */
import React, { Dispatch, SetStateAction } from 'react';
import { isBrowser } from '../utils/browser';
import { safelyGet } from '../../common/utils/misc';
import { isFunction } from 'lodash';

interface ICustomStorage<T = any> {
  get: () => T;
  set: (value: T) => void;
}

const cache: { [key: string]: ICustomStorage } = {};

const createStorage = <T>(
  prefix: string,
  defaultValue: T
): ICustomStorage<T> => {
  if (!cache[prefix]) {
    cache[prefix] = {
      get() {
        if (!isBrowser() || !localStorage) return defaultValue;

        const serialized = localStorage.getItem(prefix);
        if (!serialized) return defaultValue;

        return safelyGet(() => JSON.parse(serialized));
      },
      set(value: T) {
        if (!isBrowser() || !localStorage) return;

        const serialized = JSON.stringify(value);
        localStorage.setItem(prefix, serialized);
      },
    };
  }

  return cache[prefix];
};

/**
 * useState synced with localStorage
 * @param key key for localStorage sync must be something like "x:y"
 * @param defaultValue defaultValue for React.useState
 */
export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  if (!key && typeof key !== 'string') {
    throw new Error('Key for localStorage must be provided');
  }

  if (!key.split(':').filter((x) => x).length) {
    throw new Error(
      'Key must be two part of string "x:y". ie) application:userName'
    );
  }

  if (!isBrowser() || !localStorage) return null;

  const storage = createStorage(key, defaultValue);

  const [state, setState] = React.useState<T>(storage.get());

  return [state, syncedSetState];

  function syncedSetState(action: SetStateAction<T>) {
    setState((x) => {
      const nextState = isFunction(action) ? action(x) : action;
      if (x !== nextState) storage.set(nextState);

      return nextState;
    });
  }
}
