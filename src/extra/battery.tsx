"use client";

async function getInfo() {
  try {
    let battery = await navigator.getBattery();

    return console.log(battery);
  } catch (error) {
    console.error("An error occurred while fetching battery info: ", error);
    return;
  }
}

export default function BatteryManager() {
  return (
    <div>
      <button type="button" onClick={getInfo}>
        Battery Manager
      </button>
    </div>
  );
}
