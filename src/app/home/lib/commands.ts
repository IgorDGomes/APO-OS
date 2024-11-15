import { Commands } from "@/types/commandsType";

export const commands: Commands = {
    "shellCommands": {
        "cd": {
            "~": "default",
            "/pc": {
                "/pc/Users": {
                    "/pc/Users/Default": {
                        "pc/Users/Default/Documents": ["Videos", "Pictures", "Musics"],
                        "pc/Users/Default/Desktop": [],
                        "pc/Users/Default/Downloads": [],
                        "pc/Users/Default/Pinned": [
                            "Browser",
                            "Text Editor",
                            "Github",
                            "Clock"
                        ],
                        "pc/Users/Default/Applications": [
                            "Terminal",
                            "File Manager",
                            "Browser",
                            "Text Editor",
                            "Github",
                            "Clock",
                            "Settings"
                        ]
                    }
                },
                "/pc/Program Files": {
                    "Browser": {
                        "Application": "browser.exe"
                    },
                    "Github": "https://github.com/IgorDGomes.html",
                    "Text Editor": "TextEditor.exe"
                }
            }
        },
        "ls": {
            "~": "",
            "/pc": ["Users", "Program Files"],
            "/pc/Users": ["Default"],
            "/pc/Users/Default": [
                "Documents",
                "Desktop",
                "Downloads",
                "Pinned",
                "Applications"
            ],
            "/pc/Users/Default/Documents": ["Videos", "Pictures", "Musics"],
            "/pc/Users/Default/Desktop": [],
            "/pc/Users/Default/Downloads": [],
            "/pc/Users/Default/Pinned": ["Browser", "Text Editor", "Github", "Clock"],
            "/pc/Users/Default/Applications": [
                "Terminal",
                "File Manager",
                "Browser",
                "Text Editor",
                "Github",
                "Clock",
                "Settings"
            ],
            "/pc/Program Files": ["Browser", "Github", "Text Editor"],
            "/pc/Program Files/Browser": ["Application"],
            "/pc/Program Files/Browser/Application": ["browser.exe"],
            "/pc/Program Files/Github": ["https://github.com/IgorDGomes.html"],
            "/pc/Program Files/Text Editor": ["TextEditor.exe"]
        },
        "pwd": [
            "~",
            "/",
            "pc",
            "pc/Users",
            "pc/Users/Default",
            "pc/Users/Default/Documents",
            "pc/Users/Default/Desktop",
            "pc/Users/Default/Downloads",
            "pc/Users/Default/Pinned",
            "pc/Users/Default/Applications",
            "pc/Program Files",
            "pc/Program Files/Browser",
            "pc/Program Files/Browser/Application",
            "pc/Program Files/Github",
            "pc/Program Files/Text Editor"
        ]
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