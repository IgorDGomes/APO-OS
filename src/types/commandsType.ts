export type { Directories, TreeDirectory };

interface Directories {
    [key: string]: string[];
}

interface TreeDirectory {
    [key: string]: TreeDirectory | string[] | string
}