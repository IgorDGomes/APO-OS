function hourCorrection(hour: number): string | number {
  let fixedHour;

  if (hour < 10) {
    fixedHour = "0" + hour;
  } else {
    return hour;
  }

  return fixedHour;
}

function minuteCorrection(minute: number): string | number {
  let fixedMinute;

  if (minute < 10) {
    fixedMinute = "0" + minute;
  } else {
    return minute;
  }

  return fixedMinute;
}

function secondCorretion(second: number): string | number {
  let fixedSecond;

  if (second < 10) {
    fixedSecond = "0" + second;
  } else {
    return second
  }

  return fixedSecond
}

function millisecondCorretion(millisecond: number): string | number {
  let fixedMillisecond: string | number;

  if (millisecond < 100) {
    fixedMillisecond = "0" + millisecond;

    if (millisecond < 10) {
      fixedMillisecond = "0" + fixedMillisecond;
    }
  } else {
    return millisecond
  }

  return fixedMillisecond
}

export { hourCorrection, minuteCorrection, secondCorretion, millisecondCorretion };
