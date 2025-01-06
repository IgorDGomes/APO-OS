"use client";

import { Ellipsis, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function ExplorerTab() {
  const [projectFolderOpen, setProjectFolderOpen] = useState(false);
  const [openEditorsOpen, setOpenEditorsOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);

  return (
    <div className="w-48 border-r border-white/10 flex flex-col bg-[rgb(34,34,37)]">
      <div className="flex justify-between items-center px-3 h-8">
        <span className="text-[0.7rem] font-light uppercase tracking-tighter text-white/80 pl-2">
          Explorer
        </span>
        <button className="hover:bg-white/10 rounded-md p-0.5">
          <Ellipsis className="size-5 text-white/80" />
        </button>
      </div>

      <button
        className="h-5 border-b border-white/10"
        onClick={() => {
          if (!openEditorsOpen) {
            setOpenEditorsOpen(true);
          } else {
            setOpenEditorsOpen(false);
          }
        }}
      >
        {openEditorsOpen ? (
          <div className="flex gap-2 text-white/80">
            <ChevronDown className="size-4" />
            <span className="text-[0.7rem] font-light uppercase">
              Open Editors
            </span>
          </div>
        ) : (
          <div className="flex gap-2 text-white/80">
            <ChevronRight className="size-4" />
            <span className="text-[0.7rem] font-light uppercase">
              Open Editors
            </span>
          </div>
        )}
      </button>

      <button
        className="h-5 border-b border-white/10"
        onClick={() => {
          if (!projectFolderOpen) {
            setProjectFolderOpen(true);
          } else {
            setProjectFolderOpen(false);
          }
        }}
      >
        {projectFolderOpen ? (
          <div className="flex gap-2 text-white/80">
            <ChevronDown className="size-4" />
            <span className="text-[0.7rem] font-light uppercase">Folder</span>
          </div>
        ) : (
          <div className="flex gap-2 text-white/80">
            <ChevronRight className="size-4" />
            <span className="text-[0.7rem] font-light uppercase">Folder</span>
          </div>
        )}
      </button>

      <button
        className="h-5 border-b border-white/10"
        onClick={() => {
          if (!timelineOpen) {
            setTimelineOpen(true);
          } else {
            setTimelineOpen(false);
          }
        }}
      >
        {timelineOpen ? (
          <div className="flex gap-2 text-white/80">
            <ChevronDown className="size-4" />
            <span className="text-[0.7rem] font-light uppercase">Timeline</span>
          </div>
        ) : (
          <div className="flex gap-2 text-white/80">
            <ChevronRight className="size-4" />
            <span className="text-[0.7rem] font-light uppercase">Timeline</span>
          </div>
        )}
      </button>
    </div>
  );
}
