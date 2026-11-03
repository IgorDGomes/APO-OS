"use client";

import { useCallback, useEffect, useState } from "react";
import { ROOT } from "@/data/fileSystem";
import { SECRET } from "@/data/secret";
import { FileEntry } from "@/types/fileManager.type";
import {
  TerminalHistoryEntry,
  TerminalState,
} from "@/types/terminal.type";

const STORAGE_KEY = "terminal";
const SECRET_PATH = "/pc/private/secret.hex";

const DEFAULT_STATE: TerminalState = {
  history: [],
  currentPath: "/",
  settings: {
    theme: "dark",
    textColor: "#FFF",
  },
};

function loadTerminalState(): TerminalState {
  if (typeof window === "undefined") return DEFAULT_STATE;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return DEFAULT_STATE;

    const parsed = JSON.parse(saved) as Partial<TerminalState>;

    return {
      history: Array.isArray(parsed.history) ? parsed.history : [],
      currentPath:
        typeof parsed.currentPath === "string"
          ? parsed.currentPath
          : "/",
      settings: {
        ...DEFAULT_STATE.settings,
        ...(parsed.settings ?? {}),
      },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function normalizePath(input: string, currentPath: string): string {
  let segments: string[];

  if (input.startsWith("/")) {
    segments = input.split("/").filter(Boolean);
  } else {
    segments = [
      ...currentPath.split("/").filter(Boolean),
      ...input.split("/"),
    ];
  }

  const resolved: string[] = [];

  for (const segment of segments) {
    if (!segment || segment === ".") continue;

    if (segment === "..") {
      resolved.pop();
      continue;
    }

    resolved.push(segment);
  }

  return resolved.length > 0 ? `/${resolved.join("/")}` : "/";
}

function getDirectory(path: string): FileEntry[] | null {
  if (path === "/") return ROOT;

  const segments = path.split("/").filter(Boolean);
  let entries = ROOT;

  for (const segment of segments) {
    const entry = entries.find(
      (item) => item.name === segment && item.folder
    );

    if (!entry) return null;

    entries = entry.children ?? [];
  }

  return entries;
}

function isPrivatePath(path: string): boolean {
  return path.split("/").includes("private");
}

function downloadHexFile(): string {
  const blob = new Blob([SECRET], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "secret.hex";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);

  return "Download started: secret.hex";
}

export function useTerminal() {
  const [terminalState, setTerminalState] =
    useState<TerminalState>(loadTerminalState);

  // Admin privileges are session-only and are not saved in localStorage.
  const [isAdmin, setIsAdmin] = useState(false);

  const { history, currentPath, settings } = terminalState;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(terminalState));
  }, [terminalState]);

  const executeCommand = useCallback(
    (rawCommand: string) => {
      const command = rawCommand.trim();

      if (!command) return;

      const parts = command.split(/\s+/);
      const name = parts[0].toLowerCase();
      const args = parts.slice(1);

      let output = "";
      let nextPath = currentPath;
      let nextAdmin = isAdmin;

      // Clear the visible terminal history.
      if (name === "clear") {
        if (args.length > 0) {
          output = "Usage: clear";
        } else {
          setTerminalState((previous) => ({
            ...previous,
            history: [],
          }));
          return;
        }
      } else {
        switch (name) {
          case "help": {
            if (args.length > 0) {
              output = "Usage: help";
              break;
            }

            output = [
              "Available commands:",
              "",
              "  cd <directory>                          Change directory",
              "  ls                                      List directory contents",
              "  pwd                                     Print working directory",
              "  cat <path-to-hex.hex>                   Display hexadecimal contents",
              "  download <path-to-download-content.hex> Download hexadecimal file",
              "  clear                                   Clear terminal",
              "  help                                    Display available commands",
            ].join("\n");

            break;
          }

          case "sudo": {
            if (args.length !== 1 || args[0] !== "su") {
              output = "Usage: sudo su";
              break;
            }

            if (isAdmin) {
              output = "You are already an administrator.";
              break;
            }

            nextAdmin = true;
            output = "Administrator privileges granted.";
            break;
          }

          case "exit": {
            if (args.length > 0) {
              output = "Usage: exit";
              break;
            }

            if (!isAdmin) {
              output = "You are not in administrator mode.";
              break;
            }

            nextAdmin = false;
            output = "Leaving administrator mode.";
            break;
          }

          case "pwd": {
            output =
              args.length === 0
                ? currentPath
                : "Usage: pwd";
            break;
          }

          case "ls": {
            if (args.length > 0) {
              output = "Usage: ls";
              break;
            }

            const entries = getDirectory(currentPath);

            if (!entries) {
              output = "Directory not found.";
              break;
            }

            output =
              entries.length === 0
                ? "Directory is empty."
                : entries
                    .map((entry) =>
                      entry.folder ? `${entry.name}/` : entry.name
                    )
                    .join("\n");

            break;
          }

          case "cd": {
            if (args.length > 1) {
              output = "Usage: cd <directory>";
              break;
            }

            const target = args[0] ?? "/";
            const resolvedPath = normalizePath(target, currentPath);

            if (!nextAdmin && isPrivatePath(resolvedPath)) {
              output = "Permission denied. Administrator privileges required.";
              break;
            }

            const directory = getDirectory(resolvedPath);

            if (!directory) {
              output = `Folder not found: ${target}`;
              break;
            }

            nextPath = resolvedPath;
            break;
          }

          case "cat":
          case "download": {
            if (args.length !== 1) {
              output = `Usage: ${name} <path-to-download-content.hex>`;
              break;
            }

            if (!nextAdmin) {
              output = "Permission denied. Administrator privileges required.";
              break;
            }

            const targetPath = normalizePath(args[0], currentPath);

            if (targetPath !== SECRET_PATH) {
              output = "Permission denied.";
              break;
            }

            const privateDirectory = getDirectory("/pc/private");

            const secretExists = privateDirectory?.some(
              (entry) => entry.name === "secret.hex" && !entry.folder
            );

            if (!secretExists) {
              output = "File not found: secret.hex";
              break;
            }

            if (name === "cat") {
              output = `${SECRET.trim().slice(0, 50)}...`;
            } else {
              output = downloadHexFile();
            }

            break;
          }

          default: {
            output = `Command not found: ${name}. Type 'help' to see available commands.`;
          }
        }
      }

      const newEntry: TerminalHistoryEntry = {
        id:
          history.reduce(
            (max, entry) => Math.max(max, entry.id),
            0
          ) + 1,
        command,
        output,
        path: currentPath,
        isAdmin: nextAdmin,
      };

      setIsAdmin(nextAdmin);

      setTerminalState((previous) => ({
        ...previous,
        currentPath: nextPath,
        history: [...previous.history, newEntry],
      }));
    },
    [currentPath, history, isAdmin]
  );

  const updateSettings = useCallback(
    (settings: Partial<TerminalState["settings"]>) => {
      setTerminalState((previous) => ({
        ...previous,
        settings: {
          ...previous.settings,
          ...settings,
        },
      }));
    },
    []
  );

  return {
    history,
    currentPath,
    settings,
    isAdmin,
    executeCommand,
    updateSettings,
  };
}