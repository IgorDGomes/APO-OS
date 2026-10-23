"use client";

import { useState } from "react";

import { MinusIcon, SquareIcon, XIcon } from "lucide-react";

import { useClock } from "@/hooks/useClock";

import { Modes } from "@/types/clock.type";

import { TimerTab } from "../_components/clockTab/timer";
import { AlarmTab } from "../_components/clockTab/alarm";
import { StopwatchTab } from "../_components/clockTab/stopwatch";

export function Clock() {
  const [activeMode, setActiveMode] = useState<Modes>("alarm");

  const {
    clock,
    addAlarm,
    toggleAlarm,
    updateAlarm,
    deleteAlarm,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    addStopwatchLap,
    setTimerDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    finishTimer,
  } = useClock();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-[#EFEFEF]">
      <header>
        <div className="relative h-10 bg-[#888888] flex items-center justify-end text-white">
          <div className="absolute flex items-center justify-center w-full">
            <p className="text-sm tracking-wider">Clock</p>
          </div>
          <div className="relative z-10 flex items-center h-full text-white/70">
            <button className="flex items-center justify-center hover:bg-black/30 hover:text-white h-full w-14 transition-colors">
              <MinusIcon className="size-6" />
            </button>
            <button className="flex items-center justify-center hover:bg-black/30 hover:text-white h-full w-14 transition-colors">
              <SquareIcon className="size-4" />
            </button>
            <button
              className="flex items-center justify-center hover:bg-red-600/80 hover:text-white h-full w-14 transition-colors"
              onClick={() => {}}
            >
              <XIcon className="size-6" />
            </button>
          </div>
        </div>
      </header>
      <nav className="flex items-center gap-1 rounded-xl bg-black/5 p-1 my-4 w-fit mx-auto">
        {(["alarm", "stopwatch", "timer"] as Modes[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setActiveMode(mode)}
            className={`rounded-lg px-3 py-1.5 text-sm capitalize ${
              activeMode === mode
                ? "bg-white text-black shadow-sm"
                : "text-black/60 hover:text-black"
            }`}
          >
            {mode}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto">
        {activeMode === "alarm" && (
          <AlarmTab
            alarms={clock.alarm}
            onAddAlarm={addAlarm}
            onToggleAlarm={toggleAlarm}
            onUpdateAlarm={updateAlarm}
            onDeleteAlarm={deleteAlarm}
          />
        )}

        {activeMode === "stopwatch" && (
          <StopwatchTab 
            stopwatch={clock.stopwatch}
            onStart={startStopwatch}
            onPause={pauseStopwatch}
            onReset={resetStopwatch}
            onLap={addStopwatchLap}
          />
        )}

        {activeMode === "timer" && (
          <TimerTab
            timer={clock.timer}
            onSetDuration={setTimerDuration}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
            onFinish={finishTimer}
          />
        )}
      </div>
    </div>
  );
}
