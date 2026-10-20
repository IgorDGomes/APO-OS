type Modes = "alarm" | "stopwatch" | "timer";

interface ClockData {
  alarm: Alarm[];
  stopwatch: StopwatchData;
  timer: TimerData;
  settings: {
    theme: string;
    notifications: boolean;
  };
}

// Alarm

interface Alarm {
  id: string;
  title: string;
  hour: number;
  minute: number;
  repeat: number[];
  active: boolean;
}

interface AlarmTabProps {
  alarms: Alarm[];
  onAddAlarm: () => void;
  onToggleAlarm: (id: string) => void;
  onUpdateAlarm: (alarm: Alarm) => void;
  onDeleteAlarm: (id: string) => void;
}

interface AlarmSetProps {
  alarm: Alarm;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

interface AlarmEditorProps {
  alarm: Alarm;
  onSave: (alarm: Alarm) => void;
  onClose: () => void;
  onDelete: () => void;
}

// Stopwatch

interface StopwatchLap {
  difference: number;
  mark: number;
}

interface StopwatchData {
  start: number | null;
  elapsed: number;
  running: boolean;
  list: StopwatchLap[];
}

// Timer

interface TimerData {
  duration: number;
  remaining: number;
  running: boolean;
  endAt: number | null;
}

interface TimerTabProps {
  timer: TimerData;
  onSetDuration: (duration: number) => void;
  onStart: (startedAt: number) => void;
  onPause: () => void;
  onReset: () => void;
  onFinish: () => void;
}

export type { 
  Modes,
  ClockData,

  Alarm,
  AlarmTabProps,
  AlarmSetProps,
  AlarmEditorProps,

  StopwatchLap,
  StopwatchData,

  TimerData,
  TimerTabProps
}