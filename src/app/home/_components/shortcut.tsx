"use client";

import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  content?: ReactNode;
  action?: () => void;
}

export function Shortcut({
  className,
  children,
  content,
  action,
}: ButtonProps): ReactNode {
  const [showPortal, setShowPortal] = useState(false);

  if (typeof window === "undefined") {
    return;
  }

  const desktop = document.getElementById("desktop")!;

  function handleClick() {
    if (showPortal === false) {
      setShowPortal(true);
    } else {
      setShowPortal(false);
    }
  }

  return (
    <>
      <button
        className={className}
        onClick={() => {
          handleClick();
          if (action) {
            action();
          }
        }}
      >
        {children}
      </button>
      {showPortal &&
        content &&
        createPortal(
          <div className="absolute min-w-[700px] w-[60%] h-[80%] rounded-lg overflow-hidden dropdown">
            {content}
          </div>,
          desktop
        )}
    </>
  );
}
