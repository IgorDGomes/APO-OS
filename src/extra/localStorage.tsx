"use client";

import info from "../extra/info.json";

export default function Home() {
  function createLS() {
    if (localStorage.getItem("deviceInfo")) {
      return console.log("Device already exist!");
    }

    localStorage.setItem("deviceInfo", JSON.stringify(info));
    console.log(JSON.parse(localStorage.getItem("deviceInfo")!));
    return console.log(
      `Size: ${
        Math.round(
          new Blob([localStorage.getItem("deviceInfo")!]).size / 10.24
        ) / 100
      }KiB`
    );
  }

  function removeLS() {
    if (!localStorage.getItem("deviceInfo")) {
      return console.log("Device does not exist!");
    }

    localStorage.removeItem("deviceInfo");
    console.log("Data removed from the device");
    return console.log(
      `Size: ${
        Math.round(
          new Blob([localStorage.getItem("deviceInfo")!]).size / 10.24
        ) / 100
      }KiB`
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-mono font-semibold">Local Storage</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={createLS}
          className="py-2 px-4 text-xl bg-white/20 rounded-lg hover:bg-white/10"
        >
          Create Local Storage
        </button>
        <button
          onClick={removeLS}
          className="py-2 px-4 text-xl bg-white/20 rounded-lg hover:bg-white/10"
        >
          Remove Local Storage
        </button>
      </div>
    </div>
  );
}
