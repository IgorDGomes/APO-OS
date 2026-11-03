import { useCallback, useEffect, useMemo, useState } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import type { FileEntry, InitialState, SavedFileManager } from "@/types/fileManager.type";

import { ROOT } from "@/data/fileSystem";

const DEFAULT_PATH = "/pc/";

function normalizePath(path: string): string {
  const segments: string[] = [];

  for (const part of path.trim().split("/")) {
    if (!part || part === ".") continue;

    if (part === "..") {
      segments.pop();
    } else {
      segments.push(part);
    }
  }

  return segments.length ? `/${segments.join("/")}/` : "/";
}

function getFolder(path: string): FileEntry[] | null {
  const segments = normalizePath(path).split("/").filter(Boolean);
  let entries = ROOT;

  for (const segment of segments) {
    const folder = entries.find(
      (entry) =>
        entry.folder &&
        entry.name.toLowerCase() === segment.toLowerCase()
    );

    if (!folder) return null;

    entries = folder.children ?? [];
  }

  return entries;
}

function readInitialState(getItem: () => unknown): InitialState {
  const defaults: InitialState = {
    history: [DEFAULT_PATH],
    finalPath: DEFAULT_PATH,
    historyIndex: 0,
    settings: { view: "extension" },
  };

  if (typeof window === "undefined") {
    return defaults;
  }

  try {
    const saved = getItem() as Partial<SavedFileManager> | undefined;

    if (!saved) return defaults;

    const finalPath =
      typeof saved.finalPath === "string" &&
      getFolder(saved.finalPath) !== null
        ? normalizePath(saved.finalPath)
        : DEFAULT_PATH;

    const history = Array.isArray(saved.history)
      ? saved.history
          .filter(
            (item): item is string =>
              typeof item === "string" &&
              getFolder(item) !== null
          )
          .map(normalizePath)
      : [];

    const validHistory = history.length ? history : [finalPath];

    const storedIndex =
      Number.isInteger(saved.historyIndex)
        ? saved.historyIndex!
        : validHistory.length - 1;

    const historyIndex = Math.max(
      0,
      Math.min(storedIndex, validHistory.length - 1)
    );

    // Ensure the current path agrees with the history position.
    if (validHistory[historyIndex] !== finalPath) {
      validHistory.splice(historyIndex + 1);
      validHistory.push(finalPath);
    }

    return {
      history: validHistory,
      finalPath,
      historyIndex:
        validHistory.indexOf(finalPath) >= 0
          ? validHistory.indexOf(finalPath)
          : validHistory.length - 1,
      settings: {
        view:
          saved.settings?.view === "name"
            ? "name"
            : "extension",
      },
    };
  } catch {
    return defaults;
  }
}

export function useFileManager() {
  const { getItem, setItem } = useLocalStorage("fileManager");

  const [initialState] = useState(() => readInitialState(getItem));

  const [path, setPath] = useState(initialState.finalPath);
  const [history, setHistory] = useState(initialState.history);
  const [historyIndex, setHistoryIndex] = useState(
    initialState.historyIndex
  );
  const [settings, setSettings] = useState(initialState.settings);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Persist the current explorer state.
  useEffect(() => {
    const saved: SavedFileManager = {
      history,
      finalPath: path,
      historyIndex,
      settings,
    };

    setItem(saved);
  }, [history, path, historyIndex, settings, setItem]);

  // Navigate to a folder and discard forward history.
  const navigateTo = useCallback(
    (target: string): boolean => {
      const nextPath = normalizePath(target);

      if (getFolder(nextPath) === null) return false;

      const nextHistory = history.slice(0, historyIndex + 1);

      if (nextHistory[nextHistory.length - 1] !== nextPath) {
        nextHistory.push(nextPath);
      }

      setPath(nextPath);
      setHistory(nextHistory);
      setHistoryIndex(nextHistory.length - 1);
      setSelectedFile(null);

      return true;
    },
    [history, historyIndex]
  );

  // Navigate backward through history.
  const goBack = useCallback(() => {
    if (historyIndex <= 0) return;

    const nextIndex = historyIndex - 1;

    setHistoryIndex(nextIndex);
    setPath(history[nextIndex]);
    setSelectedFile(null);
  }, [history, historyIndex]);

  // Navigate forward through history.
  const goForward = useCallback(() => {
    if (historyIndex >= history.length - 1) return;

    const nextIndex = historyIndex + 1;

    setHistoryIndex(nextIndex);
    setPath(history[nextIndex]);
    setSelectedFile(null);
  }, [history, historyIndex]);

  // Navigate to the parent folder.
  const goUp = useCallback(() => {
    if (path === "/") return;

    const segments = normalizePath(path)
      .split("/")
      .filter(Boolean);

    segments.pop();

    navigateTo(
      segments.length ? `/${segments.join("/")}/` : "/"
    );
  }, [path, navigateTo]);

  // Navigate to the virtual root.
  const goHome = useCallback(() => {
    navigateTo("/");
  }, [navigateTo]);

  // Select a file without opening it.
  const selectFile = useCallback((name: string) => {
    const currentFiles = getFolder(path);

    const file = currentFiles?.find(
      (entry) => entry.name === name && !entry.folder
    );

    if (file) {
      setSelectedFile(file.name);
    }
  }, [path]);

  // Toggle file extension visibility.
  const toggleExtensions = useCallback(() => {
    setSettings((current) => ({
      ...current,
      view: current.view === "extension" ? "name" : "extension",
    }));
  }, []);

  // Get and sort the current folder's contents.
  const files = useMemo(
    () =>
      [...(getFolder(path) ?? [])].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        })
      ),
    [path]
  );

  // Format filenames according to the extension setting.
  const displayName = useCallback(
    (file: FileEntry) => {
      if (file.folder || settings.view === "extension") {
        return file.name;
      }

      const dot = file.name.lastIndexOf(".");

      return dot > 0 ? file.name.slice(0, dot) : file.name;
    },
    [settings.view]
  );

  const showExtensions = settings.view === "extension";
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  return {
  path,
  files,
  selectedFile,
  settings,
  navigateTo,
  goBack,
  goForward,
  goUp,
  goHome,
  selectFile,
  toggleExtensions,
  displayName,
  showExtensions,
  canGoBack,
  canGoForward,
  root: ROOT,
};
}