
"use client";

import { useState } from "react";
import { HourMinuteSecond as Hour } from "../hour";
import type { Alarm, AlarmEditorProps, AlarmSetProps, AlarmTabProps } from "@/types/clock.type";

const weekdays = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
];

function getRepeatLabel(repeat: number[]): string {
  if (repeat.length === 0) return "Once";
  if (repeat.length === 7) return "Every day";

  return repeat
    .slice()
    .sort((a, b) => a - b)
    .map((day) => weekdays.find((d) => d.value === day)?.label)
    .filter(Boolean)
    .join(" | ");
}


export function AlarmTab({
  alarms,
  onAddAlarm,
  onToggleAlarm,
  onUpdateAlarm,
  onDeleteAlarm,
}: AlarmTabProps) {
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null);

  function handleDelete(alarm: Alarm) {
    const confirmed = window.confirm(
      `Delete the alarm "${alarm.title}"?`
    );

    if (!confirmed) return;

    onDeleteAlarm(alarm.id);

    if (editingAlarm?.id === alarm.id) {
      setEditingAlarm(null);
    }
  }

  function handleSave(alarm: Alarm) {
    onUpdateAlarm(alarm);
    setEditingAlarm(null);
  }

  return (
    <div className="relative min-h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-center py-10">
          <Hour className="text-5xl text-black" />
        </div>

        <div className="flex flex-col gap-3 pb-8">
          {alarms.length === 0 ? (
            <p className="text-center text-[#888888]">
              No alarms yet
            </p>
          ) : (
            alarms.map((alarm) => (
              <AlarmSet
                key={alarm.id}
                alarm={alarm}
                onEdit={() => setEditingAlarm({ ...alarm })}
                onDelete={() => handleDelete(alarm)}
                onToggle={() => onToggleAlarm(alarm.id)}
              />
            ))
          )}
        </div>
      </div>

      <div className="sticky bottom-0 flex w-full justify-center bg-[#EFEFEF]/90 py-5">
        <button
          type="button"
          className="rounded-xl bg-white px-12 py-2 text-lg shadow-lg transition-colors hover:bg-[#888888] hover:text-white"
          onClick={onAddAlarm}
        >
          New Alarm
        </button>
      </div>

      {editingAlarm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setEditingAlarm(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="alarm-editor-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <AlarmEditor
              key={editingAlarm.id}
              alarm={editingAlarm}
              onSave={handleSave}
              onClose={() => setEditingAlarm(null)}
              onDelete={() => handleDelete(editingAlarm)}
            />
          </div>
        </div>
      )}
    </div>
  );
}




function AlarmSet({
  alarm,
  onEdit,
  onToggle,
}: AlarmSetProps) {
  const formattedTime = `${String(alarm.hour).padStart(2, "0")}:${String(
    alarm.minute
  ).padStart(2, "0")}`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Edit alarm ${alarm.title}`}
      onClick={onEdit}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onEdit();
        }
      }}
      className={`mx-4 flex cursor-pointer flex-col gap-3 rounded-xl px-5 py-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black sm:mx-9 sm:px-8 ${
        alarm.active ? "bg-white" : "bg-white/50"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-4 text-left">
          <span
            className={`text-2xl tabular-nums ${
              alarm.active ? "text-black" : "text-black/40"
            }`}
          >
            {formattedTime}
          </span>

          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[#4D4D4D]">
              {alarm.title}
            </span>
            <span className="text-sm text-[#888888]">
              {getRepeatLabel(alarm.repeat)}
            </span>
          </span>
        </div>

        <button
          type="button"
          aria-pressed={alarm.active}
          aria-label={`${alarm.active ? "Deactivate" : "Activate"} alarm ${alarm.title}`}
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          className={`shrink-0 rounded-lg px-3 py-1 ${
            alarm.active
              ? "bg-black/10 text-black"
              : "bg-black/5 text-black/50"
          }`}
        >
          {alarm.active ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
}



function AlarmEditor({
  alarm,
  onSave,
  onClose,
  onDelete,
}: AlarmEditorProps) {
  const [title, setTitle] = useState(alarm.title);
  const [hour, setHour] = useState(String(alarm.hour));
  const [minute, setMinute] = useState(String(alarm.minute));
  const [repeat, setRepeat] = useState<number[]>(alarm.repeat);
  const [active, setActive] = useState(alarm.active);

  function toggleDay(day: number) {
    setRepeat((previous) =>
      previous.includes(day)
        ? previous.filter((value) => value !== day)
        : [...previous, day].sort((a, b) => a - b)
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedHour = Number(hour);
    const parsedMinute = Number(minute);

    if (
      !title.trim() ||
      !Number.isInteger(parsedHour) ||
      parsedHour < 0 ||
      parsedHour > 23 ||
      !Number.isInteger(parsedMinute) ||
      parsedMinute < 0 ||
      parsedMinute > 59
    ) {
      return;
    }

    onSave({
      ...alarm,
      title: title.trim(),
      hour: parsedHour,
      minute: parsedMinute,
      repeat,
      active,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 id="alarm-editor-title" className="text-xl font-semibold">
        Edit Alarm
      </h2>

      <label className="flex flex-col gap-1 text-sm">
        Title
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={60}
          required
          className="rounded-lg border border-black/15 px-3 py-2 text-base outline-none focus:border-black/50"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Hour (0-23)
          <input
            type="number"
            min={0}
            max={23}
            step={1}
            value={hour}
            onChange={(event) => setHour(event.target.value)}
            required
            className="rounded-lg border border-black/15 px-3 py-2 text-base outline-none focus:border-black/50"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Minute (0-59)
          <input
            type="number"
            min={0}
            max={59}
            step={1}
            value={minute}
            onChange={(event) => setMinute(event.target.value)}
            required
            className="rounded-lg border border-black/15 px-3 py-2 text-base outline-none focus:border-black/50"
          />
        </label>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium">Repeat</legend>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {weekdays.map((day) => (
            <label
              key={day.value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border px-2 py-2 text-sm ${
                repeat.includes(day.value)
                  ? "border-black bg-black text-white"
                  : "border-black/15 hover:bg-black/5"
              }`}
            >
              <input
                type="checkbox"
                checked={repeat.includes(day.value)}
                onChange={() => toggleDay(day.value)}
                className="sr-only"
              />
              {day.label}
            </label>
          ))}
        </div>

        <p className="text-xs text-[#888888]">
          Select no days for a one-time alarm.
        </p>
      </fieldset>

      <label className="flex items-center justify-between rounded-lg bg-black/5 px-3 py-3">
        <span className="text-sm">Alarm enabled</span>
        <input
          type="checkbox"
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          className="size-4 accent-black"
        />
      </label>

      <div className="flex items-center justify-between gap-2 pt-2">
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg px-4 py-2 text-red-600 hover:bg-red-50"
        >
          Delete
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 hover:bg-black/5"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-black px-5 py-2 text-white hover:bg-black/75"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
