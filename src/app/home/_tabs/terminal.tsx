"use client";

import {
  EllipsisIcon,
  MinusIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTerminal } from "@/hooks/useTerminal";

export function Terminal() {
  const [userPrompt, setUserPrompt] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    history,
    currentPath,
    settings,
    isAdmin,
    executeCommand,
    updateSettings,
  } = useTerminal();

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!userPrompt.trim()) return;

      executeCommand(userPrompt);
      setUserPrompt("");

      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  }

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  return (
    <div className="h-full flex flex-col">
      <header className="h-10 shrink-0 bg-[#266467] flex items-center justify-between text-white">
        <div className="flex items-center pl-4 gap-4">
          <div className="relative flex items-center">
            <button
              className="text-white/80 hover:text-white"
              onClick={() => setShowSettings((previous) => !previous)}
              title="Terminal settings"
            >
              <EllipsisIcon />
            </button>

            {showSettings && (
              <div className="absolute left-0 top-full mt-3 z-50 w-56 bg-[#333333] border border-white/20 shadow-xl rounded-md p-3 text-white">
                <p className="text-xs font-semibold tracking-wider mb-3">
                  TERMINAL SETTINGS
                </p>

                <div className="mb-4">
                  <p className="text-xs text-white/60 mb-2">Theme</p>

                  <div className="flex gap-2">
                    <button
                      className={`flex-1 py-1 rounded text-xs ${
                        settings.theme === "dark"
                          ? "bg-[#266467] text-white"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                      onClick={() => updateSettings({ theme: "dark" })}
                    >
                      Dark
                    </button>

                    <button
                      className={`flex-1 py-1 rounded text-xs ${
                        settings.theme === "light"
                          ? "bg-[#266467] text-white"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                      onClick={() => updateSettings({ theme: "light" })}
                    >
                      Light
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="terminalTextColor"
                    className="text-xs text-white/60 block mb-2"
                  >
                    Text color
                  </label>

                  <div className="flex items-center gap-3">
                    <input
                      id="terminalTextColor"
                      type="color"
                      value={settings.textColor}
                      onChange={(e) =>
                        updateSettings({ textColor: e.target.value })
                      }
                      className="w-8 h-8 cursor-pointer bg-transparent border-0"
                    />

                    <span className="text-xs uppercase">
                      {settings.textColor}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

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
      </header>

      <div
        ref={outputRef}
        className="flex-1 min-h-0 overflow-y-auto p-2 font-mono text-sm transition-colors"
        style={{
          backgroundColor:
            settings.theme === "dark" ? "#2C2C2C" : "#F4F4F4",
          color: settings.textColor,
        }}
      >
        {history.map((entry) => (
          <div key={entry.id} className="mb-3">
            <div className="flex flex-wrap">
              <span className="text-[#00EEFF]">
                {entry.isAdmin
                  ? "root@apos-desktop"
                  : "somebody@apos-desktop"}
              </span>

              <span className="text-[#0081a1] px-2">
                {entry.path}
              </span>

              <span className="text-[#00EEFF]">$</span>

              <span 
                style={{ color: settings.textColor }}
                className="pl-2 whitespace-pre-wrap break-all"
              >
                {entry.command}
              </span>
            </div>

            {entry.output && (
              <pre 
                style={{ color: settings.textColor }}
                className="whitespace-pre-wrap wrap-break-word pl-2 mt-1"
              >
                {entry.output}
              </pre>
            )}
          </div>
        ))}

        {/* Current prompt always follows the last command */}
        <form
          className="flex items-start"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="text-[#00EEFF] shrink-0">
            {isAdmin ? "root@apos-desktop" : "somebody@apos-desktop"}
          </span>

          <span className="text-[#0081a1] px-2 shrink-0">
            {currentPath}
          </span>

          <span className="text-[#00EEFF]">$</span>

          <textarea
            ref={textareaRef}
            name="promptInput"
            id="promptInput"
            rows={1}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            className="bg-transparent resize-none outline-none text-white w-full min-h-6 overflow-hidden pl-2 pr-4"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ color: settings.textColor }}
          />
        </form>
      </div>
    </div>
  );
}