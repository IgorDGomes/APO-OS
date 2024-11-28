"use client";

import { PlayIcon, RotateCwIcon, TimerIcon } from "lucide-react";
import { useState } from "react";

export function StopwatchTab() {
  const [stopwatch, setStopwatch] = useState("00:00.001");

  const data = JSON.parse(window.localStorage.getItem("clock") || "{}");
  const stopwatchRecord = data.inUse?.stopwatch;

  function displayStopwatch() {
    if (!stopwatchRecord) {
      return;
    }

    return stopwatchRecord.stops.map((d: string, index: number) => {
      return (
        <div
          className="flex mx-9 px-8 py-3 bg-white rounded-xl"
          key={d + index}
        >
          <div className="w-full flex justify-between items-center gap-4">
            <p className="font-semibold text-2xl">
              {index < 10 ? "0" + (index + 1) : index}
            </p>
            <p>+00:01.00</p>
            <p className="font-semibold text-2xl">{d}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="relative h-full">
        <div className="flex flex-col">
          <div className="flex flex-col items-center py-10">
            <span className="text-black text-5xl">{stopwatch}</span>
            <span className="text-2xl">00:00.000</span>
          </div>
          <div className="flex flex-col gap-3 pb-[5%]">
            {displayStopwatch()}
          </div>
        </div>
        <div className="sticky flex items-center justify-center gap-10 w-full bottom-0 pb-12">
          <button
            className="flex items-center justify-center p-3 rounded-full bg-white hover:bg-[#888888] hover:text-white transition-colors text-lg shadow-lg"
            onClick={() => setStopwatch("00:00.000")}
          >
            <RotateCwIcon />
          </button>
          <button
            className="flex items-center justify-center p-4 rounded-full bg-white hover:bg-[#888888] hover:text-white transition-colors text-lg shadow-lg"
            onClick={() => {
              setStopwatch("00:00.001");
            }}
          >
            <PlayIcon />
          </button>
          <button className="flex items-center justify-center p-3 rounded-full bg-white hover:bg-[#888888] hover:text-white transition-colors text-lg shadow-lg">
            <TimerIcon />
          </button>
        </div>
      </div>
    </>
  );
}
