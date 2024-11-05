import { Mobile } from "@/components/mobile";
import {
  AlarmClockIcon,
  BatteryFullIcon,
  EarthIcon,
  FileCode2Icon,
  FolderIcon,
  SettingsIcon,
  SquareTerminalIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeXIcon,
  WifiHighIcon,
  WifiIcon,
  WifiLowIcon,
  WifiOffIcon,
} from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GithubIcon } from "./_icons/github";
import { Separator } from "./_components/separator";
import Link from "next/link";
import { Button } from "./_components/button";

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get("username");
  const pass = cookieStore.get("password");

  if (user?.value !== "admin" || pass?.value !== "aReallyStrongPasswordHere") {
    return redirect("/");
  }
  async function doNothing() {
    "use server";
    return null;
  }

  return (
    <>
      <main className="homeBackground h-screen hidden md:flex">
        <div className="h-full w-20 bg-white/10">
          <div className="h-[90%] flex flex-col items-center justify-center">
            <Button action={doNothing}>
              <SquareTerminalIcon className="size-9 stroke-[1.5]" />
            </Button>
            <Separator className="my-2" />
            <Button action={doNothing}>
              <FolderIcon className="size-9 stroke-[1.5]" />
            </Button>
            <Separator className="my-2" />
            <Button action={doNothing}>
              <EarthIcon className="size-9 stroke-[1.5]" />
            </Button>
            <Separator className="my-2" />
            <Button action={doNothing}>
              <FileCode2Icon className="size-9 stroke-[1.5]" />
            </Button>
            <Separator className="my-2" />
            <Link
              href={"https://github.com/IgorDGomes"}
              target="_blank"
              className="hover:bg-white/20 p-2 rounded-md"
            >
              <GithubIcon className="size-9 stroke-[1.5]" />
            </Link>
            <Separator className="my-2" />
            <Button action={doNothing}>
              <AlarmClockIcon className="size-9 stroke-[1.5]" />
            </Button>
          </div>
          <div className="h-[10%] flex items-center justify-center">
            <Button action={doNothing}>
              <SettingsIcon className="size-9 stroke-[1.5]" />
            </Button>
          </div>
        </div>
        <div className="min-h-8 h-[5%] w-full bg-white/20 backdrop-blur flex items-center">
          <div className="flex justify-around w-[20%]">
            <button>Applications</button>
            <button>Pinned</button>
          </div>
          <div className="flex">
            <WifiIcon className="size-6 stroke-[1.5]" />
            <WifiHighIcon className="size-6 stroke-[1.5]" />
            <WifiLowIcon className="size-6 stroke-[1.5]" />
            <WifiOffIcon className="size-6 stroke-[1.5]" />
            <Volume2Icon className="size-6 stroke-[1.5]" />
            <Volume1Icon className="size-6 stroke-[1.5]" />
            <VolumeXIcon className="size-6 stroke-[1.5]" />
            <BatteryFullIcon className="size-6 stroke-[1.5] -rotate-90" />
          </div>
        </div>
      </main>

      <main className="h-screen md:hidden">
        <Mobile />
      </main>
    </>
  );
}
