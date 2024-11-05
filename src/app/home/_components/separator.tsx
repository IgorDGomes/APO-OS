import { twMerge } from "tailwind-merge";

export function Separator({ className }: { className: string }) {
  return (
    <div className={twMerge("bg-white/50 h-[1px] w-[75%]", className)}></div>
  );
}
