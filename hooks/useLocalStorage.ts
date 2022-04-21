import { useState, useEffect } from 'react';

type Props = {
  key: string;
  defaultValue: string | boolean | number;
};
function getStorageValue(key: Props['key'], defaultValue: Props['defaultValue']) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (!saved) {
      return defaultValue;
    }

    const initial = JSON.parse(saved);
    return initial || defaultValue;
  }
}

export const useLocalStorage = (key: Props['key'], defaultValue: Props['defaultValue']) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
