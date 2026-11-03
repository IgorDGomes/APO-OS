"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FileIcon,
  FolderIcon,
  HouseIcon,
  MinusIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useFileManager } from "@/hooks/useFileManager";

export function FileManager() {
  const {
    path,
    files,
    root,
    selectedFile,
    navigateTo,
    goBack,
    goForward,
    goUp,
    goHome,
    selectFile,
    toggleExtensions,
    displayName,
    canGoBack,
    canGoForward,
  } = useFileManager();

  const [user] = useState("somebody");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["/pc/"])
  );

  const handlePathSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateTo(path);
  };

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((current) => {
      const next = new Set(current);

      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }

      return next;
    });
  };

  const renderTree = (
    entries: typeof root,
    parentPath: string,
    depth = 0
  ): React.ReactNode => {
    return [...entries]
      .filter((entry) => entry.folder)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => {
        const folderPath = `${parentPath}${entry.name}/`;

        const isExpanded =
          expandedFolders.has(folderPath) || path.startsWith(folderPath);

        const isActive = path === folderPath;
        const hasSubfolders = entry.children?.some(
          (child) => child.folder
        ) ?? false;
        const isPrivate = entry.name.includes("private");

        return (
          <div key={folderPath}>
            <div
              className={`flex items-center w-full hover:bg-black/10 ${
                isActive ? "bg-black/10" : ""
              }`}
              style={{ paddingLeft: `${depth * 14 + 4}px` }}
            >
              {hasSubfolders || isPrivate ? (
                <button
                  type="button"
                  className="flex items-center justify-center size-5 shrink-0 hover:bg-black/10 rounded-md"
                  onClick={() => toggleFolder(folderPath)}
                  aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
                >
                  {isExpanded ? (
                    <ChevronDownIcon className="size-3" />
                  ) : (
                    <ChevronRightIcon className="size-3" />
                  )}
                </button>
              ) : 
              (
                <div className="size-5" />
              )}
              <button
                type="button"
                className="flex items-center gap-1.5 min-w-0 flex-1 py-1 px-1 text-left text-sm"
                onClick={() => {
                  if (folderPath.split("/").includes("private")) {
                    return;
                  }

                  navigateTo(folderPath);

                  setExpandedFolders((current) => {
                    const next = new Set(current);
                    next.add(folderPath);
                    return next;
                  });
                }}
              >
                <FolderIcon className="size-4 shrink-0 stroke-1" />
                <span className="truncate">{entry.name}</span>
              </button>
            </div>

            {isExpanded && entry.children?.length ? (
              <div>
                {renderTree(entry.children, folderPath, depth + 1)}
              </div>
            ) : null}
          </div>
        );
      });
  };

  return (
    <div className="h-full">
      <header className="bg-[#DDDDDD]">
        <div className="relative h-10 bg-[#888888] flex items-center justify-end text-white">
          <div className="absolute flex items-center justify-center w-full">
            <p className="text-sm tracking-wider">
              {user} - File Manager
            </p>
          </div>

          <div className="relative z-10 flex items-center h-full text-white/70">
            <button
              className="flex items-center justify-center hover:bg-black/30 hover:text-white h-full w-14 transition-colors"
              type="button"
              aria-label="Minimize"
            >
              <MinusIcon className="size-6" />
            </button>

            <button
              className="flex items-center justify-center hover:bg-black/30 hover:text-white h-full w-14 transition-colors"
              type="button"
              aria-label="Maximize"
            >
              <SquareIcon className="size-4" />
            </button>

            <button
              className="flex items-center justify-center hover:bg-red-600/80 hover:text-white h-full w-14 transition-colors"
              onClick={() => {}}
              type="button"
              aria-label="Close"
            >
              <XIcon className="size-6" />
            </button>
          </div>
        </div>

        <div className="h-8 border-b-2 border-black/10 flex items-center text-sm px-5">
          <button
            className="h-full hover:bg-black/10 px-2.5 transition-colors"
            type="button"
          >
            File
          </button>

          <button
            className="h-full hover:bg-black/10 px-2.5 transition-colors"
            type="button"
          >
            Edit
          </button>

          <button
            className="h-full hover:bg-black/10 px-2.5 transition-colors"
            onClick={toggleExtensions}
            type="button"
            title="Toggle file extensions"
          >
            View
          </button>

          <button
            className="h-full hover:bg-black/10 px-2.5 transition-colors"
            type="button"
          >
            Help
          </button>
        </div>

        <div className="h-11 border-b-2 border-black/10 flex items-center gap-10 px-4">
          <div className="flex items-center gap-1">
            <button
              className="hover:bg-black/10 disabled:opacity-30"
              onClick={goBack}
              disabled={!canGoBack}
              type="button"
              aria-label="Go back"
            >
              <ChevronLeftIcon className="size-8" />
            </button>

            <button
              className="hover:bg-black/10 disabled:opacity-30"
              onClick={goForward}
              disabled={!canGoForward}
              type="button"
              aria-label="Go forward"
            >
              <ChevronRightIcon className="size-8" />
            </button>

            <button
              className="hover:bg-black/10"
              onClick={goUp}
              type="button"
              aria-label="Go up"
            >
              <ChevronUpIcon className="size-8" />
            </button>

            <button
              className="flex items-center justify-center hover:bg-black/10 size-8"
              onClick={goHome}
              type="button"
              aria-label="Go home"
            >
              <HouseIcon />
            </button>
          </div>

          <form
            className="w-full h-full flex items-center"
            onSubmit={handlePathSubmit}
          >
            <div className="flex items-center bg-white h-[85%] w-full rounded-sm overflow-hidden">
              <button
                className="px-2 border-r border-black/20"
                type="submit"
                aria-label="Navigate to path"
              >
                <FolderIcon className="size-7" />
              </button>

              <input
                type="text"
                name="path"
                className="outline-none h-full w-full px-2 tracking-wide font-semibold"
                value={path}
                readOnly
              />
            </div>
          </form>
        </div>
      </header>

      <div className="h-[calc(100%-32px-44px-40px)] bg-[#EFEFEF] flex">
        <div className="border-r-2 border-black/10 w-52 shrink-0 overflow-y-auto py-2">
          {renderTree(root, "/")}
        </div>
        <div className="relative w-full min-w-0 h-full grid grid-rows-[1fr_auto] overflow-hidden">
          <div className="min-h-0 overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-4 justify-items-center gap-x-4 gap-y-2 py-4 px-4">
              {files.length > 0 ? [...files]
                .sort((a, b) =>
                  a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                )
                .map((file) => (
                  <button
                    key={`${path}${file.name}`}
                    type="button"
                    onClick={() => {
                      if (!file.folder) {
                        selectFile(file.name);
                      }
                    }}
                    onDoubleClick={() => {
                      if (file.folder && file.name !== "private") {
                        navigateTo(`${path}${file.name}/`);

                        setExpandedFolders((current) => {
                          const next = new Set(current);

                          next.add(`${path}${file.name}/`);

                          return next;
                        });
                      }
                    }}
                    className={`size-28 flex flex-col gap-2 items-center justify-center hover:bg-black/5 rounded-md ${
                      selectedFile === file.name
                        ? "bg-black/10 ring-1 ring-black/20"
                        : ""
                    }`}
                    aria-pressed={!file.folder && selectedFile === file.name}
                  >
                    {file.folder ? (
                      <FolderIcon className="size-[50%] stroke-1" />
                    ) : (
                      <FileIcon className="size-[50%] stroke-1" />
                    )}

                    <h3 className="text-sm text-center px-2">
                      {displayName(file)}
                    </h3>
                  </button>
                )) : (
                  <div className="col-span-full">
                    <span className="">This folder is empty.</span>
                  </div>
                )}
            </div>
          </div>
          <footer className="shrink-0 w-full h-6 bg-[#DDDDDD] flex items-center pl-4">
            {files.length !== 1 ? (
              <span className="text-sm">{files.length} | items</span>
            ) : (
              <span className="text-sm">{files.length} | item</span>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
