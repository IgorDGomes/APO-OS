import { HourMinuteSecond as Hour } from "../hour";

interface Alarms {
  hour: string;
  description: string;
  repeat: string[];
  on: boolean;
}

export function AlarmTab() {
  const data = JSON.parse(window.localStorage.getItem("clock") || "{}");
  const alarms = data.inUse?.alarm;

  function displayAlarms() {
    if (!alarms) {
      return;
    }

    return Object.keys(data.inUse.alarm).map((d) => (
      <AlarmSet
        key={d}
        hour={alarms[d].hour}
        description={d}
        repeat={alarms[d].repeat}
        on={alarms[d].on}
      />
    ));
  }

  function addNewAlarm() {
    console.log("Add new alarm");
  }

  return (
    <div className="relative h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-center py-10">
          <Hour className="text-black text-5xl" />
        </div>
        <div className="flex flex-col gap-3 pb-[5%]">{displayAlarms()}</div>
      </div>
      <div className="sticky flex justify-center w-full bottom-0 pb-12">
        <button
          className="px-12 py-2 rounded-xl bg-white hover:bg-[#888888] hover:text-white transition-colors text-lg shadow-lg"
          onClick={addNewAlarm}
        >
          New Alarm
        </button>
      </div>
    </div>
  );
}

function AlarmSet({ hour, description, repeat, on }: Alarms) {
  return (
    <div
      className="flex justify-between mx-9 px-8 py-3 bg-white rounded-xl cursor-pointer hover:bg-white/50"
      onClick={() => {
        console.log(`${description} alarm clicked`);
      }}
    >
      <div className="flex gap-4 items-center">
        <p className="text-2xl">{hour}</p>
        <p className="text-[#4D4D4D]">
          {description}, {repeat.join(" | ")}
        </p>
      </div>
      <button type="button" className="bg-black/10">
        {on ? "On" : "Off"}
      </button>
    </div>
  );
}
