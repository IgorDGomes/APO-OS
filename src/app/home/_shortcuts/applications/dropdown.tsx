"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shortcut } from "../../_components/shortcut";
import { Terminal } from "../../_tabs/terminal";
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white">
        <span>Applications</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {applications.map((app) => {
          if (applications.indexOf(app) === applications.length - 1) {
            return (
              <>
                <DropdownMenuItem className="py-2 xl:px-10" key={app.name}>
                  <Shortcut content={<Terminal />}>{`${app.name}`}</Shortcut>
                </DropdownMenuItem>
              </>
            );
          }
          return (
            <>
              <DropdownMenuItem className="py-2 xl:px-10" key={app.id}>
                <Shortcut content={<Terminal />}>{`${app.name}`}</Shortcut>
              </DropdownMenuItem>
              <Separator className="w-[95%] mx-auto" />
            </>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
