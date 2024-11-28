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
  const [timeTrigger, setTimeTrigger] = useState(Date.now());

  useEffect(() => {
    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      setTimeTrigger(Date.now());

      const interval = setInterval(() => {
        setTimeTrigger(Date.now());
      }, 60000);

      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  const date = new Date(timeTrigger);
  const hour = hourCorrection(date.getHours());
  const minute = minuteCorrection(date.getMinutes());

  return <p className={"font-medium text-white"}>{`${hour}:${minute}`}</p>;
}

export function HourMinuteSecond({ className }: HourType) {
  const [timeTrigger, setTimeTrigger] = useState(Date.now());

  useEffect(() => {
    const now = new Date();
    const msUntilNextSecond = 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      setTimeTrigger(Date.now());

      const interval = setInterval(() => {
        setTimeTrigger(Date.now());
      }, 1000);

      return () => clearInterval(interval);
    }, msUntilNextSecond);

    return () => clearTimeout(timeout);
  }, []);

  const date = new Date(timeTrigger);
  const hour = hourCorrection(date.getHours());
  const minute = minuteCorrection(date.getMinutes());
  const second = secondCorretion(date.getSeconds());

  return (
    <p
      className={twMerge("font-medium text-white" + className)}
    >{`${hour}:${minute}:${second}`}</p>
  );
}
