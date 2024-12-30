import { Mobile } from "@/components/mobile";
import {
  AlarmClockIcon,
  BatteryFullIcon,
  EarthIcon,
  FileCode2Icon,
  FolderIcon,
  LogOutIcon,
  SettingsIcon,
  SquareTerminalIcon,
  Volume2Icon,
  WifiIcon,
} from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GithubIcon } from "./_icons/github";
import { Separator } from "./_components/separator";
import Link from "next/link";
import { Button } from "./_components/button";
import { deleteCookies } from "./lib/logout";
import { HourMinute as Hour } from "./_components/hour";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Terminal } from "./_tabs/terminal";
import { FileManager } from "./_tabs/fileManager";
import { Browser } from "./_tabs/browser";
import { Clock } from "./_tabs/clock";
import TextEditor from "./_tabs/textEditor";
import { OpenSettings } from "./_components/settingsTab/checkOS";

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get("username");
  const pass = cookieStore.get("password");

  if (user?.value !== "admin" || pass?.value !== "aReallyStrongPasswordHere") {
    return redirect("/");
  }

  return (
    <>
      <main className="homeBackground h-screen hidden md:flex">
        {/*! Change size of icons, when its a smaller screen */}
        <div className="h-full w-20 bg-white/10">
          <div className="h-[90%] flex flex-col items-center justify-center">
            <Button content={<Terminal />}>
              <SquareTerminalIcon className="stroke-white size-9 stroke-[1.5]" />
            </Button>
            <Separator className="my-2" />
            <Button content={<FileManager />}>
              <FolderIcon className="stroke-white size-9 stroke-[1.5]" />
            </Button>
            <Separator className="my-2" />
            <Button content={<Browser />}>
              <EarthIcon className="stroke-white size-9 stroke-[1.5]" />
            </Button>
            <Separator className="my-2" />
            <Button content={<TextEditor />}>
              <FileCode2Icon className="stroke-white size-9 stroke-[1.5]" />
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
            <Button content={<Clock />}>
              <AlarmClockIcon className="stroke-white size-9 stroke-[1.5]" />
            </Button>
          </div>
          <div className="h-[10%] flex items-center justify-center">
            <OpenSettings>
              <SettingsIcon className="stroke-white size-9 stroke-[1.5]" />
            </OpenSettings>
          </div>
        </div>
        <div className="w-full">
          <div className="min-h-8 h-[5%] w-full bg-background/20 backdrop-blur flex items-center justify-between">
            <div className="flex justify-around w-[20%]">
              <button className="text-white">Applications</button>
              <button className="text-white">Pinned</button>
            </div>
            <div className="flex min-w-80 w-[20%] max-w-80 justify-evenly">
              <Hour />
              <div className="flex">
                <BatteryFullIcon className="stroke-white size-6 stroke-[1.5] -rotate-90" />
                <span className="text-white">100%</span>
              </div>
              <div className="flex">
                <WifiIcon className="stroke-white size-6 stroke-[1.5] -rotate-45" />
                <Volume2Icon className="stroke-white size-6 stroke-[1.5]" />
              </div>
              <Dialog>
                <DialogTrigger>
                  <LogOutIcon className="stroke-white size-5 stroke-[1.5]" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Logout</DialogTitle>
                    <DialogDescription>
                      When logged out, it will be necessary to login again.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-2 pt-4">
                    <h3 className="font-semibold">
                      Are you sure you want to exit?
                    </h3>
                    <div className="flex gap-4">
                      <Button
                        action={deleteCookies}
                        className="rounded-lg py-2 px-4 border hover:bg-red-600/90 hover:text-white font-medium flex-1"
                      >
                        Yes
                      </Button>
                      <DialogClose className="rounded-lg py-2 px-4 border hover:bg-black/70 text-black hover:text-white font-medium flex-1">
                        No
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div
            id="desktop"
            className="relative h-[95%] w-full flex items-center justify-center"
          ></div>
        </div>
      </main>

      <main className="h-screen md:hidden">
        <Mobile />
      </main>
    </>
  );
}
