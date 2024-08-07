import { initTRPC } from '@trpc/server';
// import { prisma } from './prisma';
import * as z from 'zod';
import superjson from 'superjson';
import { user } from './constants';
//@ts-ignore
import { app, dialog } from 'electron';
import { writeFile } from 'fs/promises';
import maps, { tieredMaps, uniqueMaps } from './map';
import { EventEmitter } from 'stream';
import { copyFileSync, unlinkSync } from 'fs';

const t = initTRPC.create({
    transformer: superjson,
});

export const ee = new EventEmitter();

export const appRouter = t.router({
    // onMapUpdate: t.procedure.subscription(() => {
    //     return (emit: any) => {
    //         const onMapUpdate = (data: string) => {
    //             emit.next(data);
    //         };
    //         ee.on('update', onMapUpdate);
    //         return () => {
    //             ee.off('update', onMapUpdate);
    //         };
    //     };
    // }),
    // toggleMapCompletion: t.procedure
    //     .input(
    //         z.object({
    //             id: z.string(),
    //             userId: z.string(),
    //             groupId: z.string(),
    //             complete: z.boolean(),
    //         })
    //     )
    //     .mutation(async ({ input }) => {
    //         // await prisma.mapStatus.updateMany({
    //         //     where: {
    //         //         id: input.id,
    //         //         userId: input.userId,
    //         //         groupId: input.groupId,
    //         //     },
    //         //     data: {
    //         //         complete: !input.complete,
    //         //     },
    //         // });
    //     }),
    // getStaticMaps: t.procedure.query(() => maps),
    // getClientPath: t.procedure.query(() => user.clientPath),
    // createGroup: t.procedure.input(z.string()).mutation(async ({ input }) => {
    //     if (!user.id) return;
    //     const data = await prisma.group.create({
    //         data: {
    //             name: input,
    //             owner: {
    //                 connect: {
    //                     id: user.id,
    //                 },
    //             },
    //         },
    //         select: {
    //             id: true,
    //             owner: true,
    //             name: true,
    //         },
    //     });
    //     const membership = await prisma.groupMembership.create({
    //         data: {
    //             userId: user.id,
    //             groupId: data.id,
    //         },
    //     });
    //     await prisma.user.update({
    //         where: {
    //             id: user.id,
    //         },
    //         data: {
    //             groupMemberships: {
    //                 connect: {
    //                     id: membership.id,
    //                 },
    //             },
    //         },
    //     });
    //     await prisma.group.update({
    //         where: {
    //             id: data.id,
    //         },
    //         data: {
    //             groupMemberships: {
    //                 connect: {
    //                     id: membership.id,
    //                 },
    //             },
    //         },
    //     });
    //     const maps = [
    //         ...tieredMaps.map((entry, mapTier) =>
    //             entry.map(map => ({ name: map, tier: mapTier + 1 }))
    //         ),
    //         ...uniqueMaps.map(entry => ({ name: entry, tier: 0 })),
    //     ].flat();
    //     for (let i = 0; i < maps.length; i++) {
    //         const map = maps[i];
    //         await prisma.mapStatus.create({
    //             data: {
    //                 name: map.name,
    //                 tier: map.tier,
    //                 complete: false,
    //                 user: {
    //                     connect: {
    //                         id: user.id,
    //                     },
    //                 },
    //                 group: {
    //                     connect: {
    //                         id: data.id,
    //                     },
    //                 },
    //             },
    //         });
    //     }
    //     return data;
    // }),
    // getGroups: t.procedure.query(async () => {
    //     return await prisma.group.findMany({
    //         where: {
    //             groupMemberships: {
    //                 some: {
    //                     userId: user.id,
    //                 },
    //             },
    //         },
    //     });
    // }),
    // getGroup: t.procedure.input(z.string()).query(async ({ input }) => {
    //     return await prisma.group.findFirst({
    //         where: {
    //             id: input,
    //         },
    //         select: {
    //             id: true,
    //             owner: true,
    //             name: true,
    //             groupMemberships: {
    //                 include: {
    //                     user: {
    //                         include: {
    //                             MapStatus: {
    //                                 where: {
    //                                     groupId: input,
    //                                 },
    //                             },
    //                         },
    //                     },
    //                 },
    //                 orderBy: {
    //                     joinedAt: 'asc',
    //                 },
    //             },
    //         },
    //     });
    // }),
    // joinGroup: t.procedure.input(z.string()).mutation(async ({ input }) => {
    //     if (!user.id) return;
    //     const membership = await prisma.groupMembership.create({
    //         data: {
    //             userId: user.id,
    //             groupId: input,
    //         },
    //     });
    //     await prisma.group.update({
    //         where: {
    //             id: input,
    //         },
    //         data: {
    //             groupMemberships: {
    //                 connect: {
    //                     id: membership.id,
    //                 },
    //             },
    //         },
    //     });
    //     const maps = [
    //         ...tieredMaps.map((entry, mapTier) =>
    //             entry.map(map => ({ name: map, tier: mapTier + 1 }))
    //         ),
    //         ...uniqueMaps.map(entry => ({ name: entry, tier: 0 })),
    //     ].flat();
    //     for (let i = 0; i < maps.length; i++) {
    //         const map = maps[i];
    //         await prisma.mapStatus.create({
    //             data: {
    //                 name: map.name,
    //                 tier: map.tier,
    //                 complete: false,
    //                 user: {
    //                     connect: {
    //                         id: user.id,
    //                     },
    //                 },
    //                 group: {
    //                     connect: {
    //                         id: input,
    //                     },
    //                 },
    //             },
    //         });
    //     }
    // }),
    // // leaveGroup: t.procedure.input(z.string()).mutation(async ({ input }) => {
    // //     await prisma.mapStatus.deleteMany({
    // //         where: {
    // //             userId: user.id,
    // //             groupId: input,
    // //         },
    // //     });
    // //     await prisma.group.update({
    // //         where: {
    // //             id: input,
    // //         },
    // //         data: {
    // //             members: {
    // //                 disconnect: {
    // //                     id: user.id
    // //                 }
    // //             },
    // //             mapStatus: {
    // //                 disconnect
    // //             }
    // //         },
    // //     });
    // // }),
    // triggerClientPathSelect: t.procedure.mutation(async () => {
    //     const clientpath = (
    //         await dialog.showOpenDialog({
    //             properties: ['openFile'],
    //         })
    //     ).filePaths[0];
    //     if (clientpath) {
    //         user.clientPath = clientpath;
    //     }
    // }),
    // backupClientPath: t.procedure.mutation(() => {
    //     copyFileSync(
    //         user.clientPath,
    //         user.clientPath.replace('Client.txt', 'Client.bkp')
    //     );
    // }),
    // deleteClientPath: t.procedure.mutation(() => {
    //     unlinkSync(user.clientPath);
    // }),
    // users: t.procedure.query(() => {
    //     return prisma.user.findMany();
    // }),
    // userById: t.procedure
    //     .input(z.string().optional())
    //     .query(async ({ input: id }) => {
    //         const data = await prisma.user.findUnique({
    //             where: {
    //                 id: id ?? user.id ?? '',
    //             },
    //         });
    //         console.log(data);
    //         return data;
    //     }),
    // createUser: t.procedure
    //     .input(
    //         z.object({
    //             name: z.string(),
    //             nickName: z.string(),
    //         })
    //     )
    //     .mutation(async ({ input: { name, nickName } }) => {
    //         const userInsert = await prisma.user.create({
    //             data: {
    //                 name,
    //                 nickName,
    //                 lastZone: 'N/A',
    //             },
    //             select: {
    //                 id: true,
    //             },
    //         });
    //         user.id = userInsert.id;
    //         const dataPath = app.getPath('userData');
    //         const userIdPath = `${dataPath}/id.json`;
    //         await writeFile(userIdPath, JSON.stringify(user));
    //         return userInsert;
    //     }),
});

export type AppRouter = typeof appRouter;
