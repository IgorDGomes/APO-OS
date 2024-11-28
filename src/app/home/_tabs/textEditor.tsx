"use client";

import { useState } from "react";
import {
  Bell,
  Blocks,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  CircleUserRound,
  Copy,
  Files,
  LayoutPanelLeft,
  Minus,
  PanelBottom,
  PanelLeft,
  PanelRight,
  RadioTower,
  Search,
  Settings,
  SquareChevronRight,
  TriangleAlert,
  X,
} from "lucide-react";
import { ExplorerTab } from "../_components/textEditorTab/explorer-tab";
import { SearchTab } from "../_components/textEditorTab/search-tab";
import { ExtensionsTab } from "../_components/textEditorTab/extensions-tab";
import { TextArea } from "../_components/textEditorTab/text-editor";

export default function TextEditor() {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [extensionsOpen, setExtensionsOpen] = useState(false);

  const [tabOpen, setTabOpen] = useState(true);

  function isExplorerTabOpen() {
    if (!explorerOpen) {
      setExplorerOpen(true);

      setSearchOpen(false);
      setExtensionsOpen(false);
    }

    if (tabOpen && explorerOpen) {
      setTabOpen(false);
      setExplorerOpen(false);
    } else if (!tabOpen) {
      setTabOpen(true);
    }
  }

  function isSearchTabOpen() {
    if (!searchOpen) {
      setSearchOpen(true);

      setExplorerOpen(false);
      setExtensionsOpen(false);
    }

    if (tabOpen && searchOpen) {
      setTabOpen(false);
      setExplorerOpen(false);
    } else if (!tabOpen) {
      setTabOpen(true);
    }
  }

  function isExtensionsTabOpen() {
    if (!extensionsOpen) {
      setExtensionsOpen(true);

      setExplorerOpen(false);
      setSearchOpen(false);
    }

    if (tabOpen && extensionsOpen) {
      setTabOpen(false);
      setExplorerOpen(false);
    } else if (!tabOpen) {
      setTabOpen(true);
    }
  }

  return (
    <div className="flex h-full items-center justify-center bg-white/50">
      <div className=" bg-zinc-950/80 h-full min-w-[50svw] w-full">
        {/* Navigation */}
        <div className="bg-zinc-900 w-full h-7 flex items-center justify-between pl-3">
          <div className="flex items-center h-full">
            <SquareChevronRight className="text-white size-5" />
            <div className="flex items-center h-full pl-2 text-xs tracking-wide text-white/75 overflow-hidden">
              <button className="hover:bg-white/10 hover:text-white rounded-[0.25rem] px-2 h-[calc(100%-8px)] cursor-default">
                File
              </button>
              <button className="hover:bg-white/10 hover:text-white rounded-[0.25rem] px-2 h-[calc(100%-8px)] cursor-default">
                Edit
              </button>
              <button className="hover:bg-white/10 hover:text-white rounded-[0.25rem] px-2 h-[calc(100%-8px)] cursor-default">
                Selection
              </button>
              <button className="hover:bg-white/10 hover:text-white rounded-[0.25rem] px-2 h-[calc(100%-8px)] cursor-default">
                View
              </button>
              <button className="hover:bg-white/10 hover:text-white rounded-[0.25rem] px-2 h-[calc(100%-8px)] cursor-default hidden">
                Go
              </button>
              <button className="hover:bg-white/10 hover:text-white rounded-[0.25rem] px-2 h-[calc(100%-8px)] cursor-default hidden">
                Run
              </button>
              <button className="hover:bg-white/10 hover:text-white rounded-[0.25rem] px-2 h-[calc(100%-8px)] cursor-default hidden">
                Terminal
              </button>
              <button className="hover:bg-white/10 hover:text-white rounded-[0.25rem] px-2 h-[calc(100%-8px)] cursor-default hidden">
                Help
              </button>
            </div>
          </div>
          <div className="flex">
            <span className="text-xs text-white/75 text-nowrap">
              display.cpp - folder - Code Editor
            </span>
          </div>
          <div className="flex gap-[0.125rem] items-center h-full">
            <button className="flex items-center justify-center p-1 hover:bg-white/10 rounded-md h-[calc(100%-8px)]">
              <PanelLeft className="text-white size-4" />
            </button>
            <button className="flex items-center justify-center p-1 hover:bg-white/10 rounded-md h-[calc(100%-8px)]">
              <PanelBottom className="text-white size-4" />
            </button>
            <button className="flex items-center justify-center p-1 hover:bg-white/10 rounded-md h-[calc(100%-8px)]">
              <PanelRight className="text-white size-4" />
            </button>
            <button className="flex items-center justify-center p-1 hover:bg-white/10 rounded-md h-[calc(100%-8px)]">
              <LayoutPanelLeft className="text-white size-4" />
            </button>
            <div className="flex items-center h-full text-white/75">
              <button className="px-4 hover:bg-white/10 h-full cursor-default">
                <Minus className="size-5" />
              </button>
              <button className="px-4 hover:bg-white/10 h-full cursor-default">
                <Copy className="rotate-90 size-4" />
              </button>
              <button className="px-4 hover:bg-red-600 h-full cursor-default">
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex h-[calc(100%-28px-20px)]">
          <div className="w-12 border-r border-white/10 flex flex-col justify-between">
            <div className="w-12 flex flex-col">
              <button onClick={isExplorerTabOpen}>
                {explorerOpen ? (
                  <div className="border-l-[2.5px] border-blue-500 h-fit w-full flex justify-center px-2 py-3">
                    <Files className="size-7 text-white" />
                  </div>
                ) : (
                  <div className="h-fit w-full flex justify-center pl-[10.5px] pr-2 py-3">
                    <Files className="size-7 text-white/70 hover:text-white" />
                  </div>
                )}
              </button>
              <button onClick={isSearchTabOpen}>
                {searchOpen ? (
                  <div className="border-l-[2.5px] border-blue-500 h-fit w-full flex justify-center px-2 py-3">
                    <Search className="size-7 text-white rotate-90" />
                  </div>
                ) : (
                  <div className="h-fit w-full flex justify-center pl-[10.5px] pr-2 py-3">
                    <Search className="size-7 text-white/70 rotate-90 hover:text-white" />
                  </div>
                )}
              </button>
              <button onClick={isExtensionsTabOpen}>
                {extensionsOpen ? (
                  <div className="border-l-[2.5px] border-blue-500 h-fit w-full flex justify-center px-2 py-3">
                    <Blocks className="size-7 text-white" />
                  </div>
                ) : (
                  <div className="h-fit w-full flex justify-center pl-[10.5px] pr-2 py-3">
                    <Blocks className="size-7 text-white/70 hover:text-white" />
                  </div>
                )}
              </button>
            </div>

            <div className="w-12 flex flex-col">
              <button>
                <div className="h-fit w-full flex justify-center pl-[10.5px] pr-2 py-3">
                  <CircleUserRound className="size-7 text-white/70 hover:text-white" />
                </div>
              </button>
              <button>
                <div className="h-fit w-full flex justify-center pl-[10.5px] pr-2 py-3">
                  <Settings className="size-7 text-white/70 hover:text-white" />
                </div>
              </button>
            </div>
          </div>

          {searchOpen && <SearchTab />}

          {explorerOpen && <ExplorerTab />}

          {extensionsOpen && <ExtensionsTab />}

          <TextArea />
        </div>
        {/* Footer */}
        <div className="h-5 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-1">
            <button className="relative flex  items-center w-9 bg-blue-500 hover:bg-blue-500/90 hover:">
              <ChevronRight className="size-4 absolute bottom-0 left-2 text-white" />
              <ChevronLeft className="size-4 absolute top-0 right-2 text-white" />
            </button>

            <div className="flex gap-1.5 hover:bg-white/10 px-1.5 text-white/80">
              <button className="flex items-center gap-1">
                <CirclePlus className="size-4 rotate-45" />
                <span className="text-sm font-light">0</span>
              </button>

              <button className="flex items-center gap-1">
                <TriangleAlert className="size-4" />
                <span className="text-sm font-light">0</span>
              </button>
            </div>

            <button className="flex items-center mx-0.5 hover:bg-white/10 text-white/80 px-2 gap-1">
              <RadioTower className="size-4" />
              <span className="text-sm font-light">0</span>
            </button>
          </div>

          <div className="text-white/80 flex gap-2 items-center px-4 h-full">
            <button className="text-xs font-light hover:bg-white/10 px-2 h-full">
              Ln 999, Col 999
            </button>
            <button className="text-xs font-light hover:bg-white/10 px-2 h-full">
              Spaces: 99
            </button>
            <button className="text-xs font-light hover:bg-white/10 px-2 h-full">
              UTF-8
            </button>
            <button className="text-xs font-light hover:bg-white/10 px-2 h-full">
              LF
            </button>
            <button className="text-xs font-light hover:bg-white/10 px-2 h-full">
              <Bell className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
