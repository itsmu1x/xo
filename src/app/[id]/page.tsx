import Game from "@/components/game"
import { getUserFromCookie } from "@/uses/jwt"
import prisma from "@/uses/prisma"
import pusher from "@/uses/pusher"
import { redirect } from "next/navigation"

type Props = {
    params: { id: string }
    searchParams: { join?: string }
}

export default async function Room({
    params: { id },
    searchParams: { join },
}: Props) {
    const room = await prisma.room.findFirst({
        where: {
            identifier: id,
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
    if (!room) redirect("/")

    if (!!join) {
        const user = await getUserFromCookie()
        if (user && !room.o && room.x_username !== user.username) {
            room.o = user
            room.o_username = user.username
            pusher.trigger(id, "edit", {
                o: user,
                o_username: user.username,
            })
            await prisma.room.update({
                where: {
                    identifier: room.identifier,
                },
                data: {
                    o_username: user.username,
                },
            })
        }
    }

    return <Game room={room} />
}
