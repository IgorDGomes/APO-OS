import { TreeDirectory } from "@/types/commandsType";
import { tree, directories } from "./commands";

let currentPath = "/";
let currentDirectory: TreeDirectory = tree;

function getPathArray(path: string): string[] {
    return path.split("/").filter(Boolean);
}

function resolvePath(path: string): [TreeDirectory | null, string] {
    const parts = getPathArray(path.startsWith("/") ? path : `${currentPath}/${path}`);
    let dir: TreeDirectory | null = tree;

    for (const part of parts) {
        if (typeof dir === "object" && part in dir) {
            dir = dir[part] as TreeDirectory;
        } else {
            return [null, "Invalid path"];
        }
    }

    return [dir, ""];
}

function command(input: string) {
    if (input.trim().startsWith("cd")) {
        cdCommand(input);
    } else if (input.trim().toLowerCase() === "ls") {
        lsCommand();
    } else if (input.trim().toLowerCase() === "pwd") {
        pwdCommand();
    } else if (input.trim().toLowerCase() === "clear") {
        clearCommand();
    } else if (input.trim().toLowerCase() === "tree") {
        treeCommand();
    }
}

//! Finish Command
function cdCommand(path: string) {
    const cleanPath = path.substring(3, path.length);

    if (path.trim() === "cd") {
        currentPath = "~";

        console.log(currentPath);
        return "~";
    } else if (cleanPath.split("/").join("").trim() === ".." && currentPath !== "/") {
        const directories = getPathArray(currentPath);
        directories.pop();
        currentPath = `/${directories.join("/")}`;
        currentDirectory = resolvePath(currentPath)[0] as TreeDirectory;
    } else {
        // const splitPath = getPathArray(cleanPath);
        const [newDirectory, error] = resolvePath(cleanPath);

        if (cleanPath.split("/").join("").trim() === "..") {
            console.log()
        }
        if (error) {
            return "error";
        } else if (typeof newDirectory === "object" && newDirectory) {
            currentDirectory = newDirectory;
        }
    }
}

//! Fix Command
function lsCommand() {
    const cleanPath = currentPath.split("/").filter(Boolean).join("/");

    if (typeof directories[cleanPath] === "object") {
        return Object.values(directories[cleanPath]).join("    ");
    } else {
        return "";
    }
}

function pwdCommand() {
    return currentPath;
}

//! Clean the console
function clearCommand() {
    return "clear";
}

function treeCommand() {
    return JSON.stringify(tree, null, 2);
}





// `bash: ${cmd}: command not found`


// Test

// command("pwd");    // Expected output: /

// command("ls");     // Expected output: bash.exe    bin

// command("cd pc");  // Change directory to /pc

// command("pwd");    // Expected output: /pc

// command("ls");     // Expected output: Users    Program Files

// command("cd Users/Default/Applications");

// command("ls");     // Expected output: Browser    Clock    File Manager    Github    Settings    Terminal    Text Editor

// command("pwd");    // Expected output: /pc/Users/Default/Applications

// command("cd ..");
// command("pwd");    // Expected output: /pc/Users/Default

// command("clear");  // Clears the terminal