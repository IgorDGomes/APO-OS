"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// import { Shortcut } from "../../_components/shortcut";
import { Separator } from "../../_components/separator";

const applications = [
  { id: 0, name: "Browser" },
  { id: 1, name: "Github" },
  { id: 2, name: "Text Editor" },
  { id: 3, name: "Terminal" },
  { id: 4, name: "Clock" },
  { id: 5, name: "File Manager" },
];

export function ApplicationsDropdown() {
  const [openTab, setOpenTab] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      // Check if e.target is of type Element, else return null
      if (!(e.target instanceof Element)) return;

      if (!e.target.classList.contains("dropdown") && openTab) {
        setOpenTab(false);
      }
    },
    [openTab]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  if (typeof window === "undefined") {
    return (
      <div>
        <button
          onClick={handleTabOpen}
          className="text-white dropdown"
          aria-expanded={openTab}
          aria-controls="applications-dropdown"
        >
          Applications
        </button>
      </div>
    );
  }

  const desktop = document.getElementById("desktop");
  if (!desktop) return;

  function handleTabOpen() {
    if (openTab) {
      setOpenTab(false);
    } else {
      setOpenTab(true);
    }
  }

  return (
    <div>
      <button
        onClick={handleTabOpen}
        className="text-white dropdown"
        aria-expanded={openTab}
        aria-controls="applications-dropdown"
      >
        Applications
      </button>
      {openTab &&
        createPortal(
          <div className="absolute bg-white/5 backdrop-blur-sm z-50 top-0 left-0 rounded-sm border border-white/20">
            <ul className="min-w-[200px]">
              {applications.map((app, index) => {
                return (
                  <li key={app.id} className="dropdown text-white">
                    {index < applications.length - 1 ? (
                      app.name === "Github" ? (
                        <>
                          <a
                            href="https://github.com/IgorDGomes"
                            target="_blank"
                            className="w-full flex dropdown py-3 pl-6 text-start hover:bg-white/15 transition-colors duration-75"
                          >
                            Github
                          </a>
                          <Separator className="bg-white/20 w-full mx-auto" />
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setOpenTab(false)}
                            className="w-full dropdown py-3 pl-6 text-start hover:bg-white/15 transition-colors duration-75"
                          >
                            {app.name}
                          </button>
                          <Separator className="bg-white/20 w-full mx-auto" />
                        </>
                      )
                    ) : (
                      <button
                        onClick={() => setOpenTab(false)}
                        className="w-full dropdown py-3 pl-6 text-start hover:bg-white/15 transition-colors duration-75"
                      >
                        {app.name}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>,
          desktop
        )}
    </div>
  );
}
