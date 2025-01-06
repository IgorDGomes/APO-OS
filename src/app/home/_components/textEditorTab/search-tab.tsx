"use client";

import {
  ChevronDown,
  ChevronRight,
  RotateCw,
  ListX,
  FilePlus2,
  AlignLeft,
  CopyMinus,
} from "lucide-react";
import { useState } from "react";

export function SearchTab() {
  // const [projectFolderOpen, setProjectFolderOpen] = useState(false);
  // const [openEditorsOpen, setOpenEditorsOpen] = useState(false);
  // const [timelineOpen, setTimelineOpen] = useState(false);

  const [searchOptions, setSearchOptions] = useState(false);

  return (
    <div className="w-48 border-r border-white/10 flex flex-col bg-[rgb(34,34,37)]">
      <div className="flex justify-between items-center px-3 h-8">
        <span className="text-[0.7rem] font-light uppercase tracking-tighter text-white/80 pl-2">
          Search
        </span>
        <div className="flex gap-0.5">
          <button className="rounded-md p-0.5 cursor-default">
            <RotateCw className="size-3.5 text-white/50 -rotate-90" />
          </button>

          <button className="rounded-md p-0.5 cursor-default">
            <ListX className="size-3.5 text-white/50" />
          </button>

          <button className="hover:bg-white/10 rounded-md p-0.5">
            <FilePlus2 className="size-3.5 text-white/80" />
          </button>

          <button className="rounded-md p-0.5 cursor-default">
            <AlignLeft className="size-3.5 text-white/50" />
          </button>

          <button className="rounded-md p-0.5 cursor-default">
            <CopyMinus className="size-3.5 text-white/50 collapse-icon" />
          </button>
        </div>
      </div>

      <div className="flex items-center pl-0.5 gap-0.5">
        <button
          className="hover:bg-white/10 h-full rounded-sm"
          onClick={() => {
            if (searchOptions) {
              setSearchOptions(false);
            } else {
              setSearchOptions(true);
            }
          }}
        >
          {searchOptions ? (
            <div className="h-[3.25rem] flex items-center justify-center">
              <ChevronDown className="size-4 text-white/80" />
            </div>
          ) : (
            <ChevronRight className="size-4 text-white/80" />
          )}
        </button>
        {searchOptions ? (
          <div className="flex flex-col justify-between w-full h-full">
            <input
              type="text"
              className="bg-white/10 max-w-[95%] rounded-sm outline-none -outline-offset-2 outline-1 focus:outline-blue-600 focus:ring-offset-transparent pl-2 text-xs h-6 font-light"
              placeholder="Search"
            />
            <input
              type="text"
              className="bg-white/10 max-w-[95%] rounded-sm outline-none -outline-offset-2 outline-1 focus:outline-blue-600 focus:ring-offset-transparent pl-2 text-xs h-6 font-light"
            />
          </div>
        ) : (
          <input
            type="text"
            className="bg-white/10 max-w-[85%] rounded-sm outline-none -outline-offset-2 outline-1 focus:outline-blue-600 focus:ring-offset-transparent pl-2 text-xs h-6 font-light"
            placeholder="Search"
          />
        )}
      </div>
    </div>
  );
}
