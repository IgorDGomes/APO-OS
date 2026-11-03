interface TerminalHistoryEntry {
  id: number;
  command: string;
  output: string;
  path: string;
  isAdmin: boolean;
}

interface TerminalSettings {
  theme: "dark" | "light";
  textColor: string;
}

interface TerminalState {
  history: TerminalHistoryEntry[];
  currentPath: string;
  settings: TerminalSettings;
}

export type {
    TerminalHistoryEntry,
    TerminalSettings,
    TerminalState,
}