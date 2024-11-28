import { SquareChevronRight } from "lucide-react";

export function TextArea() {
  return (
    <div className="w-[calc(100%-240px)] pl-10 pt-1 bg-zinc-800">
      <div className="flex flex-col items-center justify-center h-full">
        <SquareChevronRight className="size-60 text-black/50" />
        <div>
          <p className="text-white/40 text-sm">Show All Commands</p>
        </div>
        <div>
          <p className="text-white/40 text-sm">Go to File</p>
        </div>
        <div>
          <p className="text-white/40 text-sm">Find in Files</p>
        </div>
        <div>
          <p className="text-white/40 text-sm">Toggle Full Screen</p>
        </div>
        <div>
          <p className="text-white/40 text-sm">Show Settings</p>
        </div>
      </div>
    </div>
  );
}
