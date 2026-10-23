"use client";

import { useEffect, useState } from "react";

import {
  PlayIcon,
  PauseIcon,
  RotateCwIcon,
  TimerIcon,
} from "lucide-react";

import { StopwatchTabProps } from "@/types/clock.type";

import { formatTimeFromMs } from "../../lib/timeCorrection";

export function StopwatchTab({
  stopwatch,
  onStart,
  onPause,
  onReset,
  onLap,
}: StopwatchTabProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!stopwatch.running) return;

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 50);

    return () => window.clearInterval(interval);
  }, [stopwatch.running]);

  const elapsed =
    stopwatch.elapsed +
    (stopwatch.running && stopwatch.start !== null
      ? Math.max(0, now - stopwatch.start)
      : 0);

  const hasStarted = stopwatch.elapsed > 0 || stopwatch.list.length > 0;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex shrink-0 flex-col items-center py-8">
        <span className="text-5xl font-medium tabular-nums text-black">
          {formatTimeFromMs(elapsed)}
        </span>

        <span className="mt-2 text-sm text-gray-500">
          {stopwatch.running
            ? "Running"
            : hasStarted
              ? "Paused"
              : "Ready"}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
        {stopwatch.list.length === 0 ? (
          <div className="flex h-full min-h-24 items-center justify-center">
            <p className="text-sm text-gray-400">
              Start the stopwatch and tap Mark to record laps.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {[...stopwatch.list].reverse().map((lap, index) => {
              const lapNumber = stopwatch.list.length - index;

              return (
                <div
                  className="flex shrink-0 items-center rounded-xl bg-white px-5 py-4 shadow-sm"
                  key={`${lap.mark}-${lapNumber}`}
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <p className="text-lg font-semibold tabular-nums text-gray-800">
                      Lap {String(lapNumber).padStart(2, "0")}
                    </p>

                    <p className="text-sm tabular-nums text-gray-500">
                      +{formatTimeFromMs(lap.difference)}
                    </p>

                    <p className="text-lg font-semibold tabular-nums text-gray-900">
                      {formatTimeFromMs(lap.mark)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-center gap-10 border-t border-gray-200 bg-gray-100 px-4 pb-8 pt-5">
        <button
          type="button"
          aria-label="Reset stopwatch"
          disabled={!hasStarted && elapsed === 0}
          className="flex items-center justify-center rounded-full bg-white p-3 text-gray-800 shadow-md transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onReset}
        >
          <RotateCwIcon size={22} />
        </button>

        <button
          type="button"
          aria-label={stopwatch.running ? "Pause stopwatch" : "Start stopwatch"}
          className="flex items-center justify-center rounded-full bg-white p-4 text-gray-800 shadow-md transition-colors hover:bg-gray-200"
          onClick={stopwatch.running ? onPause : onStart}
        >
          {stopwatch.running ? (
            <PauseIcon size={28} />
          ) : (
            <PlayIcon size={28} />
          )}
        </button>

        <button
          type="button"
          aria-label="Mark lap"
          disabled={!stopwatch.running}
          className="flex items-center justify-center rounded-full bg-white p-3 text-gray-800 shadow-md transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onLap}
        >
          <TimerIcon size={22} />
        </button>
      </div>
    </div>
  );
}