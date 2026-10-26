"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EllipsisVerticalIcon,
  GlobeIcon,
  HouseIcon,
  LockIcon,
  MinusIcon,
  RotateCwIcon,
  SquareIcon,
  WifiOffIcon,
  XIcon,
} from "lucide-react";
import { HOME_URL, useBrowser } from "@/hooks/useBrowser";

const BOOKMARKS = [
  { name: "Apo OS", url: HOME_URL },
  { name: "Example", url: "https://example.com" },
  { name: "Wikipedia", url: "https://en.wikipedia.org" },
  { name: "Map", url: "https://www.openstreetmap.org/export/embed.html?bbox=-74.51889038085939%2C40.47202439692057%2C-73.61251831054689%2C40.92181441237853&layer=mapnik" },
]

export function Browser() {
  const {
    address,
    setAddress,
    currentUrl,
    reloadKey,
    error,
    navigate,
    goBack,
    goForward,
    goHome,
    reload,
    canGoBack,
    canGoForward,
  } = useBrowser();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(address);
  }

  return (
    <div className="h-full">
      <header className="bg-[#DDDDDD]">
        <div className="relative h-10 bg-[#888888] flex items-center justify-end text-white">
          <div className="absolute flex items-center justify-center w-full"></div>
          <div className="relative z-10 flex items-center h-full text-white/70">
            <button className="flex items-center justify-center hover:bg-black/30 hover:text-white h-full w-14 transition-colors">
              <MinusIcon className="size-6" />
            </button>
            <button className="flex items-center justify-center hover:bg-black/30 hover:text-white h-full w-14 transition-colors">
              <SquareIcon className="size-4" />
            </button>
            <button
              className="flex items-center justify-center hover:bg-red-600/80 hover:text-white h-full w-14 transition-colors"
              onClick={() => {}}
            >
              <XIcon className="size-6" />
            </button>
          </div>
        </div>
        <div className="h-11 flex items-center">
          <div className="flex px-5 gap-1">
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              aria-label="Go back"
              title="Back"
              className="p-1 rounded-md hover:not-disabled:bg-gray-100 disabled:opacity-30 hover:cursor-pointer disabled:cursor-default"
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              onClick={goForward}
              disabled={!canGoForward}
              aria-label="Go forward"
              title="Forward"
              className="p-1 rounded-md hover:not-disabled:bg-gray-100 disabled:cursor-default disabled:opacity-30"
            >
              <ArrowRightIcon />
            </button>
            <button
              type="button"
              onClick={reload}
              aria-label="Reload page"
              title="Reload"
              className="p-1 ml-1 rounded-md hover:bg-gray-100"
            >
              <RotateCwIcon />
            </button>
            <button
              type="button"
              onClick={goHome}
              aria-label="Go home"
              title="Home"
              className="p-1 ml-1 rounded-md hover:bg-gray-100"
            >
              <HouseIcon />
            </button>
          </div>
          <div className="flex grow h-[85%] rounded-full items-center bg-white">
            <button className="h-full hover:bg-black/20 rounded-s-full transition-colors">
              <LockIcon className=" mx-2.5" />
            </button>
            <form
              method="post"
              className="w-full h-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="font-semibold h-full w-full rounded-e-full px-1 outline-none"
                aria-label="Address bar"
                placeholder="Enter a URL"
                name="linkInput"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </form>
          </div>
          <div className="flex items-center px-3 gap-2">
            <div className="size-8 rounded-full bg-black/90"></div>
            <EllipsisVerticalIcon />
          </div>
        </div>
        <div className="h-6 flex items-center pl-8">
          {BOOKMARKS.map((bookmark) => (
            <button
              key={bookmark.name}
              type="button"
              onClick={() => navigate(bookmark.url)}
              className="flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-xs hover:bg-gray-200"
            >
              <GlobeIcon size={14} className="text-gray-500" />
              {bookmark.name}
            </button>
          ))}
        </div>
      </header>

      <div className="h-[calc(100%-44px-40px-24px)] bg-[#EFEFEF]">
        {error ? (
          <div className="bg-[#EFEFEF] w-full h-full flex justify-center">
            <div className="flex flex-col gap-4 pt-20">
              <div className="flex items-end gap-6">
                <WifiOffIcon className="size-20 stroke-[1.5]" />
                <p className="font-bold text-lg">No Internet</p>
              </div>
              <div>
                <h3 className="font-semibold">Try:</h3>
                <ul className="list-disc pl-10">
                  <li className="text-sm">Checking the network cables</li>
                  <li className="text-sm">Reconnecting to Wi-Fi</li>
                  <li className="text-sm">USING ONLY WHAT IS GIVEN</li>
                </ul>
              </div>
            </div>
          </div>
        ): (
          <div className="min-h-0 h-full bg-white">
            <iframe
              key={reloadKey}
              src={currentUrl}
              title="Browser content"
              className="h-full w-full border-0"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
