"use client";

import { EllipsisIcon, MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

export function Terminal() {
  const [userPrompt, setUserPrompt] = useState("");
  const [directory, setDirectory] = useState("~");

  function handleTextAreaInput(e: ChangeEvent<HTMLTextAreaElement>) {
    const inputEvent = e.nativeEvent as InputEvent;
    if (inputEvent.inputType === "insertLineBreak") {
      executeCommand(userPrompt);
      setUserPrompt("");
      return;
    }

    setUserPrompt(e.target.value);
  }

  function executeCommand(command: string) {
    console.log(command);
    setDirectory("~");
  }

  return (
    <div className="h-full">
      <div className="h-10 bg-[#266467] flex items-center justify-between text-white">
        <div className="flex items-center pl-4 gap-4">
          <button className="text-white/80 hover:text-white">
            <EllipsisIcon />
          </button>
          <p className="text-sm tracking-wider">Terminal</p>
        </div>
        <div className="flex items-center h-full text-white/70">
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
      <div className="h-full bg-[#2C2C2C] py-2 font-mono">
        <div className="flex px-4">
          <span className="text-[#00EEFF]">somebody@apos-desktop</span>
          <span className="text-white px-2">{directory}</span>
        </div>
        <form action="" method="post" className="flex flex-1 h-full">
          <span className="pl-2 text-[#57db27]">$</span>
          <textarea
            name="promptInput"
            id="promptInput"
            className="bg-transparent resize-none outline-none text-white w-full h-full overflow-hidden pl-1 pr-4"
            value={userPrompt}
            onChange={handleTextAreaInput}
          ></textarea>
        </form>
      </div>
    </div>
  );
}

/*
  if (terminal === "on") {
    Search for which directory is active, update the <span>
  }
*/

/*
const activeDirectory = '/';
const userInput = "cd pc/Users/../";
function checkCommand() {
    if (userInput.includes("cd ")) {
        if (userInput.includes("../")) {
            if (activeDirectory === '' || activeDirectory === '/' || activeDirectory === '~') {
                return activeDirectory
            }
        }
    }

    
    if (userInput.includes("cd ")) {
    }


    if (userInput === "pwd") {
    }
}
*/
