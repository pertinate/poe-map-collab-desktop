import prisma from "../main/prisma";
import { user } from "../shared/user";

export const callbacks = {
    getUser: async () => {
        if (!user.id) {

        }
        return {
            id: 'lol'
        }
    },
    createUser: async (data: ({
        name: string,
        nickName: string
    })) => {
        await prisma.user.create({
            data: {
                name: data.name,
                nickName: data.nickName
            },
            select: {
                id: true
            }
        })
    }
};

export type CallbackKey = keyof typeof callbacks;

export type ChannelKey = `${CallbackKey}-${'server' | 'client'}`

export type CallbackParams<T extends CallbackKey> = Parameters<(typeof callbacks)[T]>

export type CallbackReturn<T extends CallbackKey> = ReturnType<(typeof callbacks)[T]>