"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FolderIcon,
  HouseIcon,
  MinusIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export function FileManager() {
  const [user, setUser] = useState("");
  const [path, setPath] = useState("/pc/");
  const [fileQuantity, setFileQuantity] = useState(0);

  useEffect(() => {
    setUser("somebody");
    setFileQuantity(3);
  }, []);

  return (
    <div className="h-full">
      <header className="bg-[#DDDDDD]">
        <div className="relative h-10 bg-[#888888] flex items-center justify-end text-white">
          <div className="absolute flex items-center justify-center w-full">
            <p className="text-sm tracking-wider">{user} - File Manager</p>
          </div>
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
        <div className="h-8 border-b-2 border-black/10 flex items-center text-sm px-5">
          <button className="h-full hover:bg-black/10 px-2.5 transition-colors">
            File
          </button>
          <button className="h-full hover:bg-black/10 px-2.5 transition-colors">
            Edit
          </button>
          <button className="h-full hover:bg-black/10 px-2.5 transition-colors">
            View
          </button>
          <button className="h-full hover:bg-black/10 px-2.5 transition-colors">
            Help
          </button>
        </div>
        <div className="h-11 border-b-2 border-black/10 flex items-center gap-10 px-4">
          <div className="flex items-center gap-1">
            <button className="hover:bg-black/10">
              <ChevronLeftIcon className="size-8" />
            </button>
            <button className="hover:bg-black/10">
              <ChevronRightIcon className="size-8" />
            </button>
            <button className="hover:bg-black/10">
              <ChevronUpIcon className="size-8" />
            </button>
            <button className="flex items-center justify-center hover:bg-black/10 size-8">
              <HouseIcon />
            </button>
          </div>
          <form
            action=""
            method="post"
            className="w-full h-full flex items-center"
          >
            <div className="flex items-center bg-white h-[85%] w-full rounded-sm overflow-hidden">
              <button className="px-2 border-r-[1px] border-black/20">
                <FolderIcon className="size-7" />
              </button>
              <input
                type="text"
                name="path"
                className="outline-none h-full w-full px-2 tracking-wide font-semibold"
                value={path}
                onChange={(e) => setPath(e.target.value)}
              />
            </div>
          </form>
        </div>
      </header>

      <div className="h-[calc(100%-32px-44px-40px)] bg-[#EFEFEF] grid grid-cols-4 min-h-0">
        <div className="col-span-1 border-r-2 border-black/10"></div>
        <div className="col-span-3 flex flex-col min-h-0">
          {/* FIX SCROLL NOT WORKING */}
          {/* FIX SCROLL NOT WORKING */}
          {/* FIX SCROLL NOT WORKING */}
          {/* FIX SCROLL NOT WORKING */}
          <div className="grid grid-cols-5 grid-rows-5 w-full flex-1">
            {/* First row */}
            <div className="bg-red-700/20"></div>
            <div className="bg-green-700/20"></div>
            <div className="bg-orange-700/20"></div>
            <div className="bg-blue-700/20"></div>
            <div className="bg-gray-700/20"></div>
            {/* Second row */}
            <div className="bg-gray-700/20"></div>
            <div className="bg-blue-700/20"></div>
            <div className="bg-orange-700/50"></div>
            <div className="bg-green-700/20"></div>
            <div className="bg-red-700/20"></div>
            {/* Third row */}
            <div className="bg-red-700/20"></div>
            <div className="bg-green-700/20"></div>
            <div className="bg-orange-700/20"></div>
            <div className="bg-blue-700/20"></div>
            <div className="bg-gray-700/20"></div>
            {/* Fourth row */}
            <div className="bg-gray-700/20"></div>
            <div className="bg-blue-700/20"></div>
            <div className="bg-orange-700/50"></div>
            <div className="bg-green-700/20"></div>
            <div className="bg-red-700/20"></div>
            {/* Fifth row */}
            <div className="bg-red-700/20"></div>
            <div className="bg-green-700/20"></div>
            <div className="bg-orange-700/20"></div>
            <div className="bg-blue-700/20"></div>
            <div className="bg-gray-700/20"></div>
            {/* Sixth row */}
            <div className="bg-gray-700/20"></div>
            <div className="bg-blue-700/20"></div>
            <div className="bg-orange-700/50"></div>
            <div className="bg-green-700/20"></div>
            <div className="bg-red-700/20"></div>
          </div>
          {/* FIX SCROLL NOT WORKING */}
          {/* FIX SCROLL NOT WORKING */}
          {/* FIX SCROLL NOT WORKING */}
          {/* FIX SCROLL NOT WORKING */}

          <div className="w-full h-6 bg-[#DDDDDD] flex items-center pl-4">
            {fileQuantity > 1 ? (
              <span className="text-sm">{fileQuantity} | items</span>
            ) : (
              <span className="text-sm">{fileQuantity} | item</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
