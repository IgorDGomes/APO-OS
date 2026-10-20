
"use client";

import { useCallback, useEffect, useState } from "react";
import type { Alarm, ClockData, StopwatchData, StopwatchLap } from "@/types/clock.type";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const defaultClock: ClockData = {
  alarm: [],
  stopwatch: {
    start: null,
    elapsed: 0,
    running: false,
    list: [],
  },
  timer: {
    duration: 90,
    remaining: 90,
    running: false,
    endAt: null,
  },
  settings: {
    theme: "light",
    notifications: true,
  },
};

// Hook to help manage the local storage

export function useClock() {
  const [clock, setClock] = useState<ClockData>(defaultClock);
  const [loaded, setLoaded] = useState(false);

  const { getItem, setItem } = useLocalStorage("clock");

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(() => {
      if (cancelled) return;

      const saved = getItem() as Partial<ClockData>;

      if (saved && typeof saved === "object") {
        const savedStopwatch = saved.stopwatch as Partial<StopwatchData>;

        const stopwatchStart =
          typeof savedStopwatch?.start === "number"
            ? savedStopwatch.start
            : null;

        const stopwatchRunning =
          typeof savedStopwatch?.running === "boolean"
            ? savedStopwatch.running
            : stopwatchStart !== null;

        setClock({
          ...defaultClock,
          ...saved,
          alarm: Array.isArray(saved.alarm)
            ? saved.alarm
            : defaultClock.alarm,
          stopwatch: {
            ...defaultClock.stopwatch,
            ...savedStopwatch,
            start: stopwatchStart,
            elapsed:
              typeof savedStopwatch?.elapsed === "number" &&
              Number.isFinite(savedStopwatch.elapsed)
                ? savedStopwatch.elapsed
                : 0,
            running: stopwatchRunning,
            list: Array.isArray(savedStopwatch?.list)
              ? savedStopwatch.list
              : [],
          },
          timer: {
            ...defaultClock.timer,
            ...saved.timer,
            duration: Math.max(
              0,
              Math.min(
                24 * 60 * 60,
                Number.isFinite(saved.timer?.duration)
                  ? Math.floor(saved.timer!.duration)
                  : defaultClock.timer.duration
              )
            ),
            remaining: Math.max(
              0,
              Math.min(
                24 * 60 * 60,
                Number.isFinite(saved.timer?.remaining)
                  ? Math.floor(saved.timer!.remaining)
                  : defaultClock.timer.remaining
              )
            ),
            running: saved.timer?.running === true,
            endAt:
              typeof saved.timer?.endAt === "number" &&
              Number.isFinite(saved.timer.endAt)
                ? saved.timer.endAt
                : null,
          },
          settings: {
            ...defaultClock.settings,
            ...saved.settings,
          },
        });
      }

      setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [getItem]);

  useEffect(() => {
    if (!loaded) return;

    setItem(clock);
  }, [clock, loaded, setItem]);

  // Alarm actions

  const addAlarm = useCallback(() => {
    const newAlarm: Alarm = {
      id: crypto.randomUUID(),
      title: "New Alarm",
      hour: 7,
      minute: 0,
      repeat: [],
      active: true,
    };

    setClock((previous) => ({
      ...previous,
      alarm: [...previous.alarm, newAlarm],
    }));
  }, []);

  const toggleAlarm = useCallback((id: string) => {
    setClock((previous) => ({
      ...previous,
      alarm: previous.alarm.map((alarm) =>
        alarm.id === id
          ? { ...alarm, active: !alarm.active }
          : alarm
      ),
    }));
  }, []);

  const updateAlarm = useCallback((updatedAlarm: Alarm) => {
    setClock((previous) => ({
      ...previous,
      alarm: previous.alarm.map((alarm) =>
        alarm.id === updatedAlarm.id ? updatedAlarm : alarm
      ),
    }));
  }, []);

  const deleteAlarm = useCallback((id: string) => {
    setClock((previous) => ({
      ...previous,
      alarm: previous.alarm.filter((alarm) => alarm.id !== id),
    }));
  }, []);

  // Stopwatch actions

  const startStopwatch = useCallback(() => {
    setClock((previous) => {
      if (previous.stopwatch.running) return previous;

      return {
        ...previous,
        stopwatch: {
          ...previous.stopwatch,
          start: Date.now(),
          running: true,
        },
      };
    });
  }, []);

  const pauseStopwatch = useCallback(() => {
    setClock((previous) => {
      const stopwatch = previous.stopwatch;

      if (!stopwatch.running || stopwatch.start === null) {
        return previous;
      }

      const elapsed =
        stopwatch.elapsed + Math.max(0, Date.now() - stopwatch.start);

      return {
        ...previous,
        stopwatch: {
          ...stopwatch,
          start: null,
          elapsed,
          running: false,
        },
      };
    });
  }, []);

  const resetStopwatch = useCallback(() => {
    setClock((previous) => ({
      ...previous,
      stopwatch: {
        start: null,
        elapsed: 0,
        running: false,
        list: [],
      },
    }));
  }, []);

  const addStopwatchLap = useCallback(() => {
    setClock((previous) => {
      const stopwatch = previous.stopwatch;

      if (!stopwatch.running || stopwatch.start === null) {
        return previous;
      }

      const elapsed =
        stopwatch.elapsed + Math.max(0, Date.now() - stopwatch.start);

      const previousMark =
        stopwatch.list.length > 0
          ? stopwatch.list[stopwatch.list.length - 1].mark
          : 0;

      const lap: StopwatchLap = {
        difference: elapsed - previousMark,
        mark: elapsed,
      };

      return {
        ...previous,
        stopwatch: {
          ...stopwatch,
          list: [...stopwatch.list, lap],
        },
      };
    });
  }, []);

// Timer actions
  const setTimerDuration = useCallback((duration: number) => {
    const MAX_DURATION = 24 * 60 * 60;

    const safeDuration = Math.max(
      0,
      Math.min(MAX_DURATION, Math.floor(duration))
    );

    setClock((previous) => {
      if (previous.timer.running) return previous;

      return {
        ...previous,
        timer: {
          duration: safeDuration,
          remaining: safeDuration,
          running: false,
          endAt: null,
        },
      };
    });
  }, []);

  const startTimer = useCallback(() => {
    setClock((previous) => {
      if (previous.timer.running) return previous;

      const remaining =
        previous.timer.remaining > 0
          ? previous.timer.remaining
          : previous.timer.duration;

      if (remaining <= 0) return previous;

      return {
        ...previous,
        timer: {
          ...previous.timer,
          remaining,
          running: true,
          endAt: Date.now() + remaining * 1000,
        },
      };
    });
  }, []);

  const pauseTimer = useCallback(() => {
    setClock((previous) => {
      const timer = previous.timer;

      if (!timer.running || timer.endAt === null) {
        return previous;
      }

      const remaining = Math.max(
        0,
        Math.ceil((timer.endAt - Date.now()) / 1000)
      );

      return {
        ...previous,
        timer: {
          ...timer,
          remaining,
          running: false,
          endAt: null,
        },
      };
    });
  }, []);

  const resetTimer = useCallback(() => {
    setClock((previous) => ({
      ...previous,
      timer: {
        ...previous.timer,
        remaining: previous.timer.duration,
        running: false,
        endAt: null,
      },
    }));
  }, []);

  const finishTimer = useCallback(() => {
    setClock((previous) => ({
      ...previous,
      timer: {
        ...previous.timer,
        remaining: 0,
        running: false,
        endAt: null,
      },
    }));
  }, []);

  return {
    clock,
    setClock,
    loaded,

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
  };
}
