import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Runs once when the page opens: load saved data, or use the starting value
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Runs every time the value changes: save it
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage can fail (private mode, full); the app still works
    }
  }, [key, value]);

  return [value, setValue];
}