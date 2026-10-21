export type { TreeDirectory };

interface TreeDirectory {
    [key: string]: TreeDirectory | string[] | string
}