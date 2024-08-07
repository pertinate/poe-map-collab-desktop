// import { allMaps } from "./map";

// export type UserMapData = {
//     name: string;
//     complete: boolean;
// };

// export type Group = {
//     id: string;
//     name: string;
//     status: ({
//         user: UserSpecific,
//         maps: UserMapData[]
//     })[];
// };

// export type UserSpecific = {
//     id: string;
//     name: string;
//     nickName: string;
// }

// export type User = {
//     groups: Group[];
// } & UserSpecific;

// const userId = crypto.randomUUID()
// console.log(userId)

export const user: ({ id: string | undefined }) = {
    id: undefined,
    // name: 'Pertinate',
    // nickName: 'Niv',
    // groups: [
    //     {
    //         id: 'sdkfmnglskdmf',
    //         name: 'Great New Group',
    //         status: [
    //             {
    //                 user: {
    //                     id: 'test',
    //                     name: 'Pertinate',
    //                     nickName: 'Niv',
    //                 },
    //                 maps: allMaps.flat().map(entry => ({
    //                     name: entry,
    //                     complete: false
    //                 }))
    //             }
    //         ]
    //     },
    // ],
};