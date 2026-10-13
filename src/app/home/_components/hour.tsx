"use client";

import { useEffect, useState } from "react";
import {
  hourCorrection,
  minuteCorrection,
  secondCorretion,
} from "../lib/timeCorrection";
import { twMerge } from "tailwind-merge";

type HourType = { className?: string };

export function HourMinute() {
  const [timeTrigger, setTimeTrigger] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => setTimeTrigger(Date.now());

    updateTime();

    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      updateTime();

      const interval = setInterval(updateTime, 60_000);

      // Store the interval ID so it can be cleaned up.
      intervalId = interval;
    }, msUntilNextMinute);

    let intervalId: ReturnType<typeof setInterval> | undefined;

    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  if (timeTrigger === null) {
    return <p className="font-medium text-white">--:--</p>;
  }

  const date = new Date(timeTrigger);
  const hour = hourCorrection(date.getHours());
  const minute = minuteCorrection(date.getMinutes());

  return <p className="font-medium text-white">{`${hour}:${minute}`}</p>;
}

export function HourMinuteSecond({ className }: HourType) {
  const [timeTrigger, setTimeTrigger] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => setTimeTrigger(Date.now());

    updateTime();

    const now = new Date();
    const msUntilNextSecond = 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      updateTime();

      const interval = setInterval(updateTime, 1000);
      intervalId = interval;
    }, msUntilNextSecond);

    let intervalId: ReturnType<typeof setInterval> | undefined;

    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  if (timeTrigger === null) {
    return (
      <p className={twMerge("font-medium text-white", className)}>--:--:--</p>
    );
  }

  const date = new Date(timeTrigger);
  const hour = hourCorrection(date.getHours());
  const minute = minuteCorrection(date.getMinutes());
  const second = secondCorretion(date.getSeconds());

  return (
    <p className={twMerge("font-medium text-white", className)}>
      {`${hour}:${minute}:${second}`}
    </p>
  );
}