
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue, enabled = true) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue !== null
        ? JSON.parse(savedValue)
        : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!enabled) return;

    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, storedValue, enabled]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
