import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function set(next: T | ((prev: T) => T)) {
    setValue((prev) => {
      const resolved = next instanceof Function ? next(prev) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // ignore write errors (e.g. storage full or unavailable)
      }
      return resolved;
    });
  }

  return [value, set] as const;
}
