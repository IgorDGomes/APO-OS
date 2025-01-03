import { Directories, TreeDirectory } from "@/types/commandsType"

export const directories: Directories = {
    "~": ["Documents", "Desktop", "Downloads", "Pinned", "Applications"],
    "/": ["bash.exe", "bin"],
    "bin": [""],
    "pc": ["Users", "Program Files"],
    "pc/Users": ["Default"],
    "pc/Users/Default": [
        "Documents",
        "Desktop",
        "Downloads",
        "Pinned",
        "Applications"
    ],
    "pc/Users/Default/Applications": [
        "Browser",
        "Clock",
        "File Manager",
        "Github",
        "Settings",
        "Terminal",
        "Text Editor"
    ],
    "pc/Users/Default/Desktop": [""],
    "pc/Users/Default/Documents": ["Musics", "Pictures", "Videos"],
    "pc/Users/Default/Documents/Musics": [""],
    "pc/Users/Default/Documents/Pictures": [""],
    "pc/Users/Default/Documents/Videos": [""],
    "pc/Users/Default/Downloads": [""],
    "pc/Users/Default/Pinned": ["Browser", "Clock", "Github", "Text Editor"],
    "pc/Program Files": ["Browser", "Github", "Text Editor"],
    "pc/Program Files/Browser": ["Application"],
    "pc/Program Files/Browser/Application": ["browser.exe"],
    "pc/Program Files/Github": ["https://github.com/IgorDGomes.html"],
    "pc/Program Files/Text Editor": ["textEditor.exe"],
}

export const tree: TreeDirectory = {
    "/": {
        "bash.exe": "",
        "bin": {}
    },
    "pc": {
        "Users": {
            "Default": {
                "Applications": {
                    "Browser": ["browser.exe"],
                    "Clock": ["clock.exe"],
                    "File Manager": [""],
                    "Github": ["https://github.com/IgorDGomes.html"],
                    "Settings": [""],
                    "Terminal": ["bash.exe"],
                    "Text Editor": ["textEditor.exe"]
                },
                "Desktop": {},
                "Documents": {
                    "Musics": {},
                    "Pictures": {},
                    "Videos": {}
                },
                "Downloads": {},
                "Pinned": [
                    "Browser",
                    "Clock",
                    "Github",
                    "Text Editor"
                ]
            }
        },
        "Program Files": {
            "Browser": {
                "Application": ["browser.exe"]
            },
            "Github": [],
            "Text Editor": ["textEditor.exe"]
        }
    }
}


// export function findMatch(obj: Record<string, object | string[] | string>, userInput: string): boolean {
//     for (const key in obj) {
//         if (typeof obj[key] === "object" && obj[key] !== null) {
//             console.log(obj[key])
//             const found = findMatch(obj[key] as Record<string, object | string[] | string>, userInput);
//             if (found) return true;
//         }
//     }

//     return false
// }

export function findMatch(arr: string[], userInput: string) {
    arr.map((item) => {
        if (item === userInput) {
            console.log(item + "===" + userInput)
            return true
        } else {
            return false
        }
    })
}