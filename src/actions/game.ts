"use server"

import { getSessionUsername, getUserFromCookie } from "@/uses/jwt"
import prisma, { getRooms, makeBoard } from "@/uses/prisma"
import { gameFields } from "@/uses/zod"
import { redirect } from "next/navigation"
import pusher from "@/uses/pusher"
import crypto from "node:crypto"
import { isDraw, isWin } from "@/uses/xo"

export async function createGame() {
    const username = await getSessionUsername()
    if (!username) redirect("/auth/login")

    const exists = await prisma.room.findFirst({
        where: {
            OR: [{ x_username: username }, { o_username: username }],
            result: "none",
            expireAt: {
                gte: new Date(),
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    })
    if (exists) redirect(`/${exists.identifier}`)

    const room = await prisma.room.create({
        data: {
            identifier: `${crypto.randomInt(999999) + 1}`.padStart(7, "0"),
            x_username: username,
            board: makeBoard(),
            expireAt: new Date(Date.now() + 1000 * 60 * 10),
        },
    })

    pusher.trigger("rooms", "rooms", await getRooms())
    redirect(`/${room.identifier}`)
}

export async function play(json: any) {
    const user = await getUserFromCookie()
    if (!user) return undefined

    const zod = gameFields(json)
    if (!zod.success) return zod.error.errors[0].message

    const { i, j, roomId } = zod.data
    const room = await prisma.room.findFirst({
        where: {
            identifier: roomId,
            result: "none",
            expireAt: {
                gte: new Date(),
            },
        },
    })
    if (!room) redirect("/")
    if (room[`${room.turn}_username`] !== user.username) return undefined
    const board = room.board as Board
    if (board[i][j]) return undefined

    board[i][j] = room.turn
    const win = isWin(board, room.turn)
    const tie = isDraw(board)
    const result = win || tie ? (win ? room.turn : "tie") : "none"
    const turn = room.turn === "x" ? "o" : "x"

    pusher.trigger(roomId, "edit", {
        board,
        turn,
        result,
    })

    await prisma.room.update({
        where: { identifier: roomId },
        data: {
            board,
            turn,
            result,
        },
    })
}
