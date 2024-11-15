"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EllipsisVerticalIcon,
  HouseIcon,
  LockIcon,
  MinusIcon,
  RotateCwIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const allowedLinks: string[] = [
  "https://apo-os.vercel.app",
  "apo-os.vercel.app",
  "https://example.com",
  "example.com",
];

export function Browser() {
  const [search, setSearch] = useState("");
  const [link, setLink] = useState("");
  const [validLink, setValidLink] = useState(false);

  function isValidLink(e: FormEvent<HTMLFormElement>) {
    if (allowedLinks.includes(search)) {
      if (!search.startsWith("https://")) {
        setSearch("https://" + search);
        setLink("https://" + search);
      } else {
        setLink(search);
        setValidLink(true);
      }
    } else {
      setValidLink(false);
    }

    e.preventDefault();
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
          <div className="flex px-5 gap-3">
            <ArrowLeftIcon />
            <ArrowRightIcon />
            <RotateCwIcon />
            <HouseIcon />
          </div>
          <div className="flex flex-grow h-[85%] rounded-full items-center bg-white">
            <button className="h-full hover:bg-black/20 rounded-s-full transition-colors">
              <LockIcon className=" mx-2.5" />
            </button>
            <form
              action=""
              method="post"
              className="w-full h-full"
              onSubmit={isValidLink}
            >
              <input
                type="text"
                className="font-semibold h-full w-full rounded-e-full px-1 outline-none"
                name="linkInput"
                value={search}
                onChange={(d) => {
                  setSearch(d.target.value);
                }}
              />
            </form>
          </div>
          <div className="flex items-center px-3 gap-2">
            <div className="size-8 rounded-full bg-black/90"></div>
            <EllipsisVerticalIcon />
          </div>
        </div>
        <div className="h-6 flex items-center pl-8">
          <ul className="flex items-center gap-6">
            <li className="text-sm">
              <Link
                href={"https://apo-os.vercel.app"}
                target="iframe"
                onClick={() => {
                  setValidLink(true);
                  setLink("https://apo-os.vercel.app");
                  setSearch("https://apo-os.vercel.app");
                }}
              >
                Apo Os
              </Link>
            </li>
            <li className="text-sm">
              <Link
                href={"https://example.com"}
                target="iframe"
                onClick={() => {
                  setValidLink(true);
                  setLink("https://example.com");
                  setSearch("https://example.com");
                }}
              >
                Example
              </Link>
            </li>
            <li className="text-sm">
              <Link
                href={"https://en.wikipedia.org/"}
                target="iframe"
                onClick={() => {
                  setValidLink(true);
                  setLink("https://en.wikipedia.org/");
                  setSearch("https://en.wikipedia.org/");
                }}
              >
                Wikipedia
              </Link>
            </li>
            <li className="text-sm">
              <Link
                href={
                  "https://www.openstreetmap.org/export/embed.html?bbox=-74.51889038085939%2C40.47202439692057%2C-73.61251831054689%2C40.92181441237853&amp;layer=mapnik"
                }
                target="iframe"
                onClick={() => {
                  setValidLink(true);
                  setLink(
                    "https://www.openstreetmap.org/export/embed.html?bbox=-74.51889038085939%2C40.47202439692057%2C-73.61251831054689%2C40.92181441237853&amp;layer=mapnik"
                  );
                  setSearch(
                    "https://www.openstreetmap.org/export/embed.html?bbox=-74.51889038085939%2C40.47202439692057%2C-73.61251831054689%2C40.92181441237853&amp;layer=mapnik"
                  );
                }}
              >
                Open Street Map
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <div className="h-[calc(100%-44px-40px-24px)] bg-[#EFEFEF]">
        {validLink ? (
          <iframe
            className="w-full h-full bg-black"
            name="iframe"
            src={link}
            sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-popups-to-escape-sandbox"
          ></iframe>
        ) : (
          <p>Not working</p>
        )}
      </div>
    </div>
  );
}
