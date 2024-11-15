interface Commands {
    shellCommands: ShellCommands;
}

interface ShellCommands {
    cd: CdCommands;
    ls: LsCommands;
    pwd: string[];
}

interface LsCommands {
    "~": string;
    "/pc": string[]
    "/pc/Users": string[]
    "/pc/Users/Default": string[]
    "/pc/Users/Default/Documents": string[]
    "/pc/Users/Default/Desktop": string[]
    "/pc/Users/Default/Downloads": string[]
    "/pc/Users/Default/Pinned": string[]
    "/pc/Users/Default/Applications": string[]
    "/pc/Program Files": string[]
    "/pc/Program Files/Browser": string[]
    "/pc/Program Files/Browser/Application": string[]
    "/pc/Program Files/Github": string[]
    "/pc/Program Files/Text Editor": string[]
}

interface CdCommands {
    "~": string;
    "/pc": PcCommands;
}

interface PcCommands {
    "/pc/Users": UsersCommands;
    "/pc/Program Files": ProgramFilesCommands;
}

interface UsersCommands {
    "/pc/Users/Default": DefaultUserCommands;
}

interface DefaultUserCommands {
    "pc/Users/Default/Documents": string[];
    "pc/Users/Default/Desktop": string[];
    "pc/Users/Default/Downloads": string[];
    "pc/Users/Default/Pinned": string[];
    "pc/Users/Default/Applications": string[];
}

interface ProgramFilesCommands {
    "Browser": BrowserCommands;
    "Github": string;
    "Text Editor": string;
}

interface BrowserCommands {
    "Application": string;
}

export type {
    Commands,
    ShellCommands,
    CdCommands,
    LsCommands,
    PcCommands,
    UsersCommands,
    DefaultUserCommands,
    ProgramFilesCommands,
    BrowserCommands
}