"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FileIcon,
  FolderIcon,
  HouseIcon,
  MinusIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export function FileManager() {
  const [user, setUser] = useState("");
  const [path, setPath] = useState("/pc/");
  const [fileQuantity, setFileQuantity] = useState(0);
  const files = [
    { name: "Project Proposal.pdf", folder: false },
    { name: "Design Mockups", folder: true },
    { name: "Meeting Notes.docx", folder: false },
    { name: "Development", folder: true },
    { name: "Budget.xlsx", folder: false },
    { name: "Marketing", folder: true },
    { name: "Client Feedback.txt", folder: false },
    { name: "Sales Data", folder: true },
    { name: "User Research.pdf", folder: false },
    { name: "Wireframes", folder: true },
    { name: "Sprint Planning.docx", folder: false },
    { name: "QA Reports", folder: true },
    { name: "Roadmap.pptx", folder: false },
    { name: "HR Policies", folder: true },
    { name: "Onboarding Guide.pdf", folder: false },
    { name: "Legal", folder: true },
    { name: "Terms and Conditions.docx", folder: false },
    { name: "Privacy Policy.pdf", folder: false },
    { name: "Invoices", folder: true },
    { name: "2023 Invoice.xlsx", folder: false },
    { name: "Reports", folder: true },
    { name: "Annual Report 2023.pdf", folder: false },
    { name: "Performance Metrics.docx", folder: false },
    { name: "Engineering", folder: true },
    { name: "API Documentation.pdf", folder: false },
    { name: "Code Review", folder: true },
    { name: "Testing Checklist.xlsx", folder: false },
    { name: "Design Assets", folder: true },
    { name: "Brand Guidelines.pdf", folder: false },
    { name: "Social Media", folder: true },
    { name: "Post Schedule.xlsx", folder: false },
    { name: "Campaigns", folder: true },
    { name: "Ad Creatives", folder: true },
    { name: "Video Scripts.docx", folder: false },
    { name: "HR", folder: true },
    { name: "Employee Handbook.pdf", folder: false },
    { name: "Payroll", folder: true },
    { name: "Timesheets.xlsx", folder: false },
    { name: "IT", folder: true },
    { name: "System Logs.txt", folder: false },
    { name: "Employee Passwords.xlsx", folder: false },
  ];

  useEffect(() => {
    setUser("somebody");
    setFileQuantity(files.length);
  }, [files.length]);

  return (
    <div className="h-full">
      <header className="bg-[#DDDDDD]">
        <div className="relative h-10 bg-[#888888] flex items-center justify-end text-white">
          <div className="absolute flex items-center justify-center w-full">
            <p className="text-sm tracking-wider">{user} - File Manager</p>
          </div>
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
        <div className="h-8 border-b-2 border-black/10 flex items-center text-sm px-5">
          <button className="h-full hover:bg-black/10 px-2.5 transition-colors">
            File
          </button>
          <button className="h-full hover:bg-black/10 px-2.5 transition-colors">
            Edit
          </button>
          <button className="h-full hover:bg-black/10 px-2.5 transition-colors">
            View
          </button>
          <button className="h-full hover:bg-black/10 px-2.5 transition-colors">
            Help
          </button>
        </div>
        <div className="h-11 border-b-2 border-black/10 flex items-center gap-10 px-4">
          <div className="flex items-center gap-1">
            <button className="hover:bg-black/10">
              <ChevronLeftIcon className="size-8" />
            </button>
            <button className="hover:bg-black/10">
              <ChevronRightIcon className="size-8" />
            </button>
            <button className="hover:bg-black/10">
              <ChevronUpIcon className="size-8" />
            </button>
            <button className="flex items-center justify-center hover:bg-black/10 size-8">
              <HouseIcon />
            </button>
          </div>
          <form
            action=""
            method="post"
            className="w-full h-full flex items-center"
            onSubmit={(i) => i.preventDefault()}
          >
            <div className="flex items-center bg-white h-[85%] w-full rounded-sm overflow-hidden">
              <button className="px-2 border-r-[1px] border-black/20">
                <FolderIcon className="size-7" />
              </button>
              <input
                type="text"
                name="path"
                className="outline-none h-full w-full px-2 tracking-wide font-semibold"
                value={path}
                onChange={(e) => setPath(e.target.value)}
              />
            </div>
          </form>
        </div>
      </header>

      <div className="h-[calc(100%-32px-44px-40px)] bg-[#EFEFEF] flex">
        <div className="border-r-2 border-black/10 w-52"></div>
        <div className="relative flex-1 flex flex-col overflow-auto">
          <div className="grid grid-cols-4 self-center gap-x-4 gap-y-2 py-4">
            {files
              .sort((a, b) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
              )
              .map((file, index) => {
                return (
                  <button
                    key={index}
                    className="size-32 flex flex-col gap-2 items-center justify-center hover:bg-black/5 rounded-md"
                  >
                    {file.folder ? (
                      <FolderIcon className="size-[50%] stroke-1" />
                    ) : (
                      <FileIcon className="size-[50%] stroke-1" />
                    )}
                    <h3 className="text-sm text-center px-2">{file.name}</h3>
                  </button>
                );
              })}
          </div>

          <div className="sticky bottom-0 w-full h-6 bg-[#DDDDDD] flex items-center pl-4">
            {fileQuantity > 1 ? (
              <span className="text-sm">{fileQuantity} | items</span>
            ) : (
              <span className="text-sm">{fileQuantity} | item</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
