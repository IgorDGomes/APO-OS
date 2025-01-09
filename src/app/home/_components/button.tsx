"use client";

import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  openedClassName?: string;
  className?: string;
  children: ReactNode;
  content?: ReactNode;
  action?: () => void;
}

export function Button({
  openedClassName,
  className,
  children,
  content,
  action,
}: ButtonProps): ReactNode {
  const [showPortal, setShowPortal] = useState(false);
  const [active, setActive] = useState(false);

  if (typeof window === "undefined") {
    return (
      <button className="flex items-center justify-center hover:bg-white/20 p-2 rounded-md">
        {children}
      </button>
    );
  }

  const desktop = document.getElementById("desktop")!;

  function handleClick() {
    if (action) {
      action();
    } else if (showPortal === false) {
      setActive(true);
      setShowPortal(true);
    } else {
      setActive(false);
      setShowPortal(false);
    }
  }

  return (
    <>
      <button
        className={
          active
            ? twMerge(
                "flex items-center justify-center bg-white/20 p-2 rounded-md",
                openedClassName
              )
            : twMerge(
                "flex items-center justify-center hover:bg-white/20 p-2 rounded-md",
                className
              )
        }
        onClick={handleClick}
      >
        {children}
      </button>
      {showPortal &&
        content &&
        createPortal(
          <div className="absolute min-w-[700px] w-[60%] h-[80%] rounded-lg overflow-hidden z-50">
            {content}
          </div>,
          desktop
        )}
    </>
  );
}
