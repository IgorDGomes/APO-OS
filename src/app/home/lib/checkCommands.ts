import { TreeDirectory } from "@/types/commandsType";
import { tree } from "./commands";

let currentPath = "/";
let currentDirectory: TreeDirectory | string | string[] = tree;
let result: string[] | string;

export function command(input: string) {
    if (input.trim().startsWith("cd")) {
        cdCommand(input);
        return;
    } else if (input.trim().toLowerCase() === "ls") {
        lsCommand();
        return result;
    } else if (input.trim().toLowerCase() === "pwd") {
        pwdCommand();
        return result;
    } else if (input.trim().toLowerCase() === "clear") {
        clearCommand();
        return result;
    } else if (input.trim().toLowerCase() === "tree") {
        treeCommand();
        return result;
    }

    return `bash: ${input}: command not found`;
}

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

//! Need to Fix complex paths ex.: "cd pc/Program\ Files/../Users/Default"
function cdCommand(path: string) {
    const cleanPath = path.substring(3, path.length);

    if (path.trim() === "cd") {
        const newDirectory = resolvePath("/pc/Users/Default");

        if (typeof newDirectory === "object" && newDirectory) {
            currentPath = "~";
            currentDirectory = newDirectory[0] as TreeDirectory;
        }
    } else if (cleanPath.split("/").join("").trim() === ".." && currentPath !== "/") {
        const directories = getPathArray(currentPath);
        directories.pop();
        currentPath = `/${directories.join("/")}`;
        currentDirectory = resolvePath(currentPath)[0] as TreeDirectory;
    } else if (cleanPath.split("/").join("").trim() === ".." && currentPath === "/") {
        currentPath = "/";
        currentDirectory = tree["/"];
    } else {
        const [newDirectory, error] = resolvePath(cleanPath);

        if (typeof newDirectory === "object" && newDirectory) {
            currentPath = `/${getPathArray(cleanPath).join("/")}`;
            currentDirectory = newDirectory;
        } else if (error) {
            return "error";
        }
    }
}

function lsCommand() {
    const pathParts = getPathArray(currentPath);

    for (let i = 0; i < pathParts.length; i++) {
        if (typeof currentDirectory === "string" || Array.isArray(currentDirectory)) {
            return;
        }
        // currentDirectory = currentDirectory[pathParts[i]];
    }

    if (Array.isArray(currentDirectory)) {
        result = currentDirectory.join("    ");
        return;
    } else {
        result = Object.keys(currentDirectory).join("    ");
        return;
    }
}

function pwdCommand() {
    result = currentPath;
    return;
}

function clearCommand() {
    result = "clear";
    return;
}

function treeCommand() {
    result = JSON.stringify(tree, null, 2);
    return;
}





// `bash: ${cmd}: command not found`


// Test

// command("pwd");    // Expected output: /

// command("ls");     // Expected output: bash.exe    bin

// command("cd pc");  // Expected Path: /pc

// command("pwd");    // Expected output: /pc

// command("ls");     // Expected output: Users    Program Files

// command("cd Users/Default/Applications");    // Expected Path: /pc/Users/Default/Applications

// command("ls");     // Expected output: Browser    Clock    File Manager    Github    Settings    Terminal    Text Editor

// command("pwd");    // Expected output: /pc/Users/Default/Applications

// command("cd ..");    Expected Path: /pc/Users/Default

// command("pwd");    // Expected output: /pc/Users/Default

// command("cd ../../Program\ Files");    Expected Path: /pc/Program Files

// command("cd ../../../");    Expected Path: /

// command("pwd");    // Expected output: /

// command("cd ~");    Expected Path: /pc/Users/Default

// command("cd /pc/Program\ Files/Browser");    Expected Path: /pc/Program Files/Browser

// command("clear");  // Clears the terminal