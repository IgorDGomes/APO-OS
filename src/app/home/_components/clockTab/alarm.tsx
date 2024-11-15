import { HourMinuteSecond as Hour } from "../hour";

interface Alarms {
  hour: string;
  description: string;
  repeat: string;
  toggle: boolean;
}

export function AlarmTab() {
  return (
    <div className="relative h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-center py-10">
          <Hour className="text-black text-5xl" />
        </div>
        <div className="flex flex-col gap-3 pb-[5%]">
          <AlarmSet
            hour={"08:30"}
            description="Wake Up"
            repeat="Monday"
            toggle
          />
          <AlarmSet
            hour={"13:30"}
            description="Medicine"
            repeat="Monday"
            toggle
          />
          <AlarmSet
            hour={"19:00"}
            description="Workout"
            repeat="Monday"
            toggle
          />
          <AlarmSet
            hour={"22:15"}
            description="Medicine"
            repeat="Monday"
            toggle
          />
          <AlarmSet
            hour={"22:15"}
            description="Medicine"
            repeat="Monday"
            toggle
          />
          <AlarmSet
            hour={"22:15"}
            description="Medicine"
            repeat="Monday"
            toggle
          />
        </div>
      </div>
      <div className="sticky flex justify-center w-full bottom-0 pb-12">
        <button className="px-12 py-2 rounded-xl bg-white hover:bg-[#888888] hover:text-white transition-colors text-lg shadow-lg">
          New Alarm
        </button>
      </div>
    </div>
  );
}

function AlarmSet({ hour, description, repeat, toggle }: Alarms) {
  return (
    <div
      className="flex justify-between mx-9 px-8 py-3 bg-white rounded-xl cursor-pointer hover:bg-white/50"
      onClick={() => {
        console.log("clicked");
      }}
    >
      <div className="flex gap-4 items-center">
        <p className="text-2xl">{hour}</p>
        <p className="text-[#4D4D4D]">
          {description}, {repeat}
        </p>
      </div>
      <button type="button">{toggle}</button>
    </div>
  );
}
