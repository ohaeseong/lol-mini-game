import { isBrowser } from './browser';

export function getStorage<T>(key: string): T {
  if (!isBrowser() || !localStorage) return null;

  const item = localStorage.getItem(key);
  return JSON.parse(item);
}

export function setStorage<T>(key: string, value: T): void | T {
  if (!isBrowser() || !localStorage) return value;

  localStorage.setItem(key, JSON.stringify(value));
}
