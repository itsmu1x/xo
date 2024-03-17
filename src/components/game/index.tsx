"use client"
import { useEffect, useState } from "react"
import { use } from "@/components/contexts/pusher"
import Link from "next/link"
import Button from "./button"
import cn from "@/uses/cn"

type Props = { room: Room }

export default function Game({ room: initialRoom }: Props) {
    const [room, setRoom] = useState<Room>(initialRoom)
    const pusher = use()
    type Data = {
        [key in keyof typeof room]: any
    }

    useEffect(() => {
        const subscribe = pusher.subscribe(`${room.identifier}`)

        subscribe.bind("edit", (data: Data) => {
            setRoom((old) => ({ ...old, ...data }))
        })

        return () => {
            subscribe.unbind_all()
            pusher.unsubscribe(`${room.identifier}`)
        }
    }, [])

    return (
        <>
            <h1 className="text-3xl text-center font-bold">
                {room.x.username} vs {room.o?.username ?? "--"}
            </h1>
            <h3
                className={cn("text-xl text-center font-medium text-light/80", {
                    tada: room.result === "x" || room.result === "o",
                })}
            >
                {room.result === "none"
                    ? `${room[`${room.turn}_username`]}'s turn`
                    : room.result === "tie"
                    ? "Tie!"
                    : `${room[`${room.result}_username`]} wins`}
            </h3>

            {room.result !== "none" && (
                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="mt-4 px-4 py-2 shadow-lg bg-primary disabled:bg-primary/80 hover:bg-primary/80 text-white font-semibold rounded-lg duration-300"
                    >
                        Home
                    </Link>
                </div>
            )}

            {room.result === "none" && (
                <div className="grid grid-cols-3 grid-rows-3 gap-4 mx-auto max-w-sm mt-4">
                    {(room.board as Board).map((cell, i) =>
                        cell.map((element, j) => (
                            <Button
                                i={i}
                                j={j}
                                element={element}
                                room={room}
                                key={`${i}${j}`}
                            />
                        ))
                    )}

                    <Link
                        href="/"
                        type="button"
                        className="px-4 col-span-3 text-center py-2 shadow-lg bg-primary disabled:bg-primary/80 hover:bg-primary/80 text-white font-semibold rounded-lg duration-300"
                    >
                        Home
                    </Link>
                </div>
            )}
        </>
    )
}
