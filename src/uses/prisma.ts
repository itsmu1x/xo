import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
    return new PrismaClient()
}

export const makeBoard: () => Board = () => {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
}

// @ts-ignore [i won't declare prisma to global, idk why but i won't]
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma as PrismaClient

// @ts-ignore
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

export async function getRooms() {
    return await (prisma as PrismaClient).room.findMany({
        where: {
            result: "none",
            expireAt: {
                gte: new Date(),
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            x: true,
            o: true,
        },
    })
}
