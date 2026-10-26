"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BrowserData } from "@/types/browser.type";

export const HOME_URL = "https://apo-os.vercel.app";

export const ALLOWED_URLS = [
  HOME_URL,
  "https://example.com",
  "https://en.wikipedia.org/",
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.51889038085939%2C40.47202439692057%2C-73.61251831054689%2C40.92181441237853&layer=mapnik",
] as const;

function isAllowedUrl(value: string): string | null {
  try {
    const candidate = value.trim();

    if (!candidate) return null;

    const withProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(candidate)
      ? candidate
      : `https://${candidate}`;

    const parsedUrl = new URL(withProtocol);

    // Compare canonical URLs, but return the original allowed URL.
    // This preserves the desired stored format, e.g. https://example.com.
    const match = ALLOWED_URLS.find(
      (allowedUrl) => new URL(allowedUrl).href === parsedUrl.href
    );

    return match ?? null;
  } catch {
    return null;
  }
}

function readInitialHistory(getItem: () => unknown): string[] {
  if (typeof window === "undefined") {
    return [HOME_URL];
  }

  const saved = getItem() as Partial<BrowserData> | undefined;

  if (!saved || !Array.isArray(saved.history)) {
    return [HOME_URL];
  }

  const validHistory = saved.history.filter(
    (item): item is string =>
      typeof item === "string" && isAllowedUrl(item) !== null
  );

  return validHistory.length > 0 ? validHistory : [HOME_URL];
}

export function useBrowser() {
  const { getItem, setItem } = useLocalStorage("browser");

  // Initialize from localStorage instead of calling setState in an effect.
  const [initialHistory] = useState(() => readInitialHistory(getItem));

  const [history, setHistory] = useState<string[]>(initialHistory);
  const [currentIndex, setCurrentIndex] = useState(initialHistory.length - 1);
  const [address, setAddress] = useState(initialHistory.at(-1) ?? HOME_URL);

  const [reloadKey, setReloadKey] = useState(0);
  const [error, setError] = useState("");

  const currentUrl = history[currentIndex] ?? HOME_URL;

  // Persist history in the requested JSON structure.
  useEffect(() => {
    const data: BrowserData = {
      history,
    };

    setItem(data);
  }, [history, setItem]);

  const navigate = useCallback(
    (value: string) => {
      const url = isAllowedUrl(value);

      if (!url) {
        setError("This URL is not allowed.");
        return false;
      }

      // Discard forward history when navigating from an earlier entry.
      const nextHistory = [
        ...history.slice(0, currentIndex + 1),
        url,
      ];

      setHistory(nextHistory);
      setCurrentIndex(nextHistory.length - 1);
      setAddress(url);
      setError("");

      return true;
    },
    [history, currentIndex]
  );

  const goBack = useCallback(() => {
    if (currentIndex <= 0) return;

    const nextIndex = currentIndex - 1;

    setCurrentIndex(nextIndex);
    setAddress(history[nextIndex]);
    setError("");
  }, [currentIndex, history]);

  const goForward = useCallback(() => {
    if (currentIndex >= history.length - 1) return;

    const nextIndex = currentIndex + 1;

    setCurrentIndex(nextIndex);
    setAddress(history[nextIndex]);
    setError("");
  }, [currentIndex, history]);

  const goHome = useCallback(() => {
    navigate(HOME_URL);
  }, [navigate]);

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  return {
    address,
    setAddress,
    currentUrl,
    history,
    currentIndex,
    reloadKey,
    error,
    navigate,
    goBack,
    goForward,
    goHome,
    reload,
    canGoBack,
    canGoForward,
  };
}