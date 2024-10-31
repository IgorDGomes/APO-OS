"use client";

import { useState } from "react";

interface DeviceType {
  name: string;
  id: number;
}

async function getBltDevices() {
  try {
    const blt = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ["battery_service"],
      //   filters: [
      //     { services: ["heart_rate"] },
      //     { services: ["device_information"] },
      //   ],
    });

    return blt;
  } catch (error) {
    console.error("Bluetooth error: ", error);
    return;
  }
}

export function BluetoothButton() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceType>();

  const handleGetDevices = async () => {
    const device = await getBltDevices();
    if (device) {
      setDeviceInfo({
        name: device.name,
        id: device.id,
      });
      console.log(deviceInfo);
      console.log("Device Info: ", device);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        type="button"
        onClick={handleGetDevices}
        className="bg-white/20 py-2 px-4 rounded-lg text-xl hover:bg-white/10"
      >
        Connect to bluetooth devices
      </button>
      {deviceInfo && (
        <div className="flex flex-col gap-2 border border-white py-4 px-2">
          <p>Connected to: {deviceInfo.name}</p>
          <p>Device ID: {deviceInfo.id}</p>
        </div>
      )}
    </div>
  );
}
