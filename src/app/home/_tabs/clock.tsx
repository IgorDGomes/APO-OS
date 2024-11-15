"use client";

import { MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { AlarmTab } from "../_components/clockTab/alarm";
import { StopwatchTab } from "../_components/clockTab/stopwatch";
import { TimerTab } from "../_components/clockTab/timer";

export function Clock() {
  const [alarmActive, setAlarmActive] = useState(true);
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  function isAlarmActive() {
    if (alarmActive) {
      return;
    } else {
      setAlarmActive(true);
      setStopwatchActive(false);
      setTimerActive(false);
    }
  }

  function isStopwatchActive() {
    if (stopwatchActive) {
      return;
    } else {
      setStopwatchActive(true);
      setAlarmActive(false);
      setTimerActive(false);
    }
  }

  function isTimerActive() {
    if (timerActive) {
      return;
    } else {
      setTimerActive(true);
      setAlarmActive(false);
      setStopwatchActive(false);
    }
  }

  return (
    <div className="h-full">
      <header className="bg-[#BBBBBB]">
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
        <div className="h-12 grid grid-cols-3">
          <button
            className={alarmActive ? "bg-[#DDDDDD]" : "hover:bg-[#DDDDDD]"}
            onClick={isAlarmActive}
          >
            Alarm
          </button>
          <button
            className={
              stopwatchActive
                ? "bg-[#DDDDDD] border-x-2 border-black"
                : "hover:bg-[#DDDDDD] border-x-2 border-black"
            }
            onClick={isStopwatchActive}
          >
            Stopwatch
          </button>
          <button
            className={timerActive ? "bg-[#DDDDDD]" : "hover:bg-[#DDDDDD]"}
            onClick={isTimerActive}
          >
            Timer
          </button>
        </div>
      </header>

      <div className="h-[calc(100%-40px-48px)] bg-[#EFEFEF] overflow-y-auto">
        {alarmActive && <AlarmTab />}
        {stopwatchActive && <StopwatchTab />}
        {timerActive && <TimerTab />}
      </div>
    </div>
  );
}
