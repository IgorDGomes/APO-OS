
"use client";

import { useCallback } from "react";

export function useLocalStorage(key: string) {
  const setItem = useCallback(
    (value: unknown) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Failed to save localStorage item:", error);
      }
    },
    [key]
  );

  const getItem = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error("Failed to read localStorage item:", error);
      return undefined;
    }
  }, [key]);

  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to remove localStorage item:", error);
    }
  }, [key]);

  return { setItem, getItem, removeItem };
}
