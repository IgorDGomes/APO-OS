import { TreeDirectory } from "@/types/commandsType"

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