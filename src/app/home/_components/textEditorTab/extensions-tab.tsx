"use client";

import {
  ChevronDown,
  ChevronRight,
  Ellipsis,
  Filter,
  ListX,
  RotateCw,
} from "lucide-react";
import { useState } from "react";

export function ExtensionsTab() {
  const [isInstalledExtensionsOpen, setIsInstalledExtensionsOpen] =
    useState(false);
  const [isRecommendedExtensionsOpen, setIsRecommendedExtensionsOpen] =
    useState(false);

  return (
    <div className="w-48 border-r border-white/10 flex flex-col bg-[rgb(34,34,37)]">
      <div className="flex justify-between items-center px-3 h-8">
        <span className="text-[0.7rem] font-light uppercase tracking-tighter text-white/80 pl-2">
          Search
        </span>
        <div className="flex gap-0.5">
          <button className="hover:bg-white/10 rounded-md p-1">
            <RotateCw className="size-4 text-white/80 -rotate-90" />
          </button>
          <button className="hover:bg-white/10 rounded-md p-1">
            <Ellipsis className="size-4 text-white/80" />
          </button>
        </div>
      </div>
      <div className="flex items-center rounded-sm gap-0.5 my-2 bg-white/10 max-w-[95%] mx-auto">
        <input
          type="text"
          className="bg-transparent w-[80%] outline-none -outline-offset-2 outline-1 focus:outline-blue-600 focus:ring-offset-transparent pl-2 text-xs h-6 font-light"
          placeholder="Search Extensions in..."
        />
        <button className="cursor-default">
          <ListX className="size-3.5 text-white/40" />
        </button>
        <button className="hover:bg-white/10 rounded-md p-[3px]">
          <Filter className="size-3.5 text-white/80" />
        </button>
      </div>
      <div>
        <button
          className="h-5 w-full border-b border-white/10 pb-1 mt-1"
          onClick={() => {
            if (!isInstalledExtensionsOpen) {
              setIsInstalledExtensionsOpen(true);
            } else {
              setIsInstalledExtensionsOpen(false);
            }
          }}
        >
          {isInstalledExtensionsOpen ? (
            <div className="flex gap-2 text-white/80">
              <ChevronDown className="size-4" />
              <span className="text-[0.7rem] font-light uppercase">
                Installed
              </span>
            </div>
          ) : (
            <div className="flex gap-2 text-white/80">
              <ChevronRight className="size-4" />
              <span className="text-[0.7rem] font-light uppercase">
                Installed
              </span>
            </div>
          )}
        </button>
        <button
          className="h-5"
          onClick={() => {
            if (!isRecommendedExtensionsOpen) {
              setIsRecommendedExtensionsOpen(true);
            } else {
              setIsRecommendedExtensionsOpen(false);
            }
          }}
        >
          {isRecommendedExtensionsOpen ? (
            <div className="flex gap-2 text-white/80">
              <ChevronDown className="size-4" />
              <span className="text-[0.7rem] font-light uppercase">
                Recommended
              </span>
            </div>
          ) : (
            <div className="flex gap-2 text-white/80">
              <ChevronRight className="size-4" />
              <span className="text-[0.7rem] font-light uppercase">
                Recommended
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
