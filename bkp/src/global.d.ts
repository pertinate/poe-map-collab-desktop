import { User } from "electron/shared/user"

declare global {
    interface Window {
        maps: {
            maps: string[][],
            uniqueMaps: string[],
            allMaps: string[][]
        }
        user: User
    }
}
