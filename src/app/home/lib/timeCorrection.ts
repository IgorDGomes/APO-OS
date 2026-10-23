function hourCorrection(hour: number): string {
  return String(hour).padStart(2, "0");
}

function minuteCorrection(minute: number): string {
  return String(minute).padStart(2, "0");
}

function secondCorretion(second: number): string {
  return String(second).padStart(2, "0");
}

function millisecondCorretion(millisecond: number): string {
  return String(millisecond).padStart(3, "0");
}

function formatTimeFromSec(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

function formatTimeFromMs(milliseconds: number): string {
  const totalMilliseconds = Math.max(0, milliseconds);
  const hours = Math.floor(totalMilliseconds / 3_600_000);
  const minutes = Math.floor((totalMilliseconds % 3_600_000) / 60_000);
  const seconds = Math.floor((totalMilliseconds % 60_000) / 1_000);
  const ms = Math.floor(totalMilliseconds % 1_000);

  const totalMinutes = hours * 60 + minutes;

  return `${minuteCorrection(totalMinutes)}:${secondCorretion(seconds)}.${millisecondCorretion(ms)}`;
}

export {
  hourCorrection,
  minuteCorrection,
  secondCorretion,
  millisecondCorretion,
  formatTimeFromSec,
  formatTimeFromMs
};