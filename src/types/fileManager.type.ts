type InitialState = {
  history: string[];
  finalPath: string;
  historyIndex: number;
  settings: FileManagerSettings;
};

type FileEntry = {
  name: string;
  folder: boolean;
  children?: FileEntry[];
};

type FileManagerSettings = {
  view: "extension" | "name";
};

type SavedFileManager = {
  history: string[];
  finalPath: string;
  settings: FileManagerSettings;
  historyIndex?: number;
};

export type {
  InitialState,
  FileEntry,
  FileManagerSettings,
  SavedFileManager,
}