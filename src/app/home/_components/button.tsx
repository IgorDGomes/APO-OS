import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  link: string;
  name: string;
  className: string;
}

export function Button({ link, name, className }: ButtonProps) {
  return (
    <Link
      href={link}
      className={twMerge(
        "flex items-center justify-center p-2 rounded-md hover:bg-white/30",
        className
      )}
    >
      {name}
    </Link>
  );
}
