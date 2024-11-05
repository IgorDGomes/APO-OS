"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  action: () => void;
}

export function Button({ className, children, action }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center hover:bg-white/20 p-2 rounded-md",
        className
      )}
      onClick={action}
    >
      {children}
    </button>
  );
}
