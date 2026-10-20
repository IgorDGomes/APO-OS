"use client";

import {
  PauseIcon,
  PlayIcon,
  RotateCwIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { TimerTabProps } from "@/types/clock.type";
import { formatTime } from "../../lib/timeCorrection";

const MAX_DURATION = 24 * 60 * 60;

export function TimerTab({
  timer,
  onSetDuration,
  onStart,
  onPause,
  onReset,
  onFinish,
}: TimerTabProps) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!timer.running) return;

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 200);

    return () => window.clearInterval(interval);
  }, [timer.running]);

  const remaining =
    timer.running && timer.endAt !== null && now > 0
      ? Math.max(0, Math.ceil((timer.endAt - now) / 1000))
      : timer.remaining;

  useEffect(() => {
    if (timer.running && timer.endAt !== null && remaining <= 0) {
      onFinish();
    }
  }, [timer.running, timer.endAt, remaining, onFinish]);

  const hours = Math.floor(timer.duration / 3600);
  const minutes = Math.floor((timer.duration % 3600) / 60);
  const seconds = timer.duration % 60;

  const isRunning = timer.running;

  function updateDuration(
    nextHours: number,
    nextMinutes: number,
    nextSeconds: number
  ) {
    const total =
      nextHours * 3600 + nextMinutes * 60 + nextSeconds;

    onSetDuration(Math.min(MAX_DURATION, Math.max(0, total)));
  }

  function updateHours(value: string) {
    if (value === "") {
      updateDuration(0, minutes, seconds);
      return;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;

    const nextHours = Math.max(0, Math.min(24, Math.floor(parsed)));

    // 24 hours is only valid when minutes and seconds are zero.
    if (nextHours === 24) {
      updateDuration(24, 0, 0);
      return;
    }

    updateDuration(nextHours, minutes, seconds);
  }

  function updateMinutes(value: string) {
    if (value === "") {
      updateDuration(hours, 0, seconds);
      return;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;

    const nextMinutes = Math.max(0, Math.min(59, Math.floor(parsed)));
    updateDuration(hours, nextMinutes, seconds);
  }

  function updateSeconds(value: string) {
    if (value === "") {
      updateDuration(hours, minutes, 0);
      return;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;

    const nextSeconds = Math.max(0, Math.min(59, Math.floor(parsed)));
    updateDuration(hours, minutes, nextSeconds);
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* Timer display */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">
          {isRunning
            ? "Timer running"
            : remaining === 0
              ? "Time's up"
              : "Timer"}
        </p>

        <div className="whitespace-nowrap text-5xl font-medium tabular-nums text-black sm:text-7xl">
          {formatTime(remaining)}
        </div>

        {/* Duration inputs */}
        {!isRunning && (
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4">
            <label className="flex flex-col items-center gap-2 text-sm text-gray-500">
              Hours
              <input
                type="number"
                min={0}
                max={24}
                step={1}
                value={hours}
                onChange={(event) => updateHours(event.target.value)}
                aria-label="Timer hours"
                className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-20 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center text-lg text-black outline-none focus:border-gray-400 sm:w-24"
              />
            </label>

            <span className="mt-6 text-2xl text-gray-400">:</span>

            <label className="flex flex-col items-center gap-2 text-sm text-gray-500">
              Minutes
              <input
                type="number"
                min={0}
                max={59}
                step={1}
                value={minutes}
                onChange={(event) => updateMinutes(event.target.value)}
                aria-label="Timer minutes"
                className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-20 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center text-lg text-black outline-none focus:border-gray-400 sm:w-24"
              />
            </label>

            <span className="mt-6 text-2xl text-gray-400">:</span>

            <label className="flex flex-col items-center gap-2 text-sm text-gray-500">
              Seconds
              <input
                type="number"
                min={0}
                max={59}
                step={1}
                value={seconds}
                onChange={(event) => updateSeconds(event.target.value)}
                aria-label="Timer seconds"
                className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-20 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center text-lg text-black outline-none focus:border-gray-400 sm:w-24"
              />
            </label>
          </div>
        )}
      </div>

      {/* Fixed controls */}
      <div className="w-full flex items-center justify-center gap-10 border-t border-gray-200 bg-gray-100 pr-22 pb-8 pt-5">
        <button
          type="button"
          aria-label="Reset timer"
          onClick={onReset}
          className="flex items-center justify-center rounded-full bg-white p-3 text-gray-800 shadow-md transition-colors hover:bg-gray-200"
        >
          <RotateCwIcon size={22} />
        </button>

        <button
          type="button"
          aria-label={isRunning ? "Pause timer" : "Start timer"}
          disabled={!isRunning && timer.duration <= 0}
          onClick={isRunning ? onPause : onStart}
          className="flex items-center justify-center rounded-full bg-white p-4 text-gray-800 shadow-md transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isRunning ? (
            <PauseIcon size={28} />
          ) : (
            <PlayIcon size={28} />
          )}
        </button>
      </div>
    </div>
  );
}