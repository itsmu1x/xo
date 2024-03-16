"use client"
import { useEffect, useState } from "react"
import { use } from "./contexts/pusher"
import Watch from "./icons/watch"
import Link from "next/link"
import Join from "./icons/join"
import cn from "@/uses/cn"

type Props = {
    initialRooms: Room[]
}

export default function Rooms({ initialRooms }: Props) {
    const [rooms, setRooms] = useState<Room[]>(initialRooms)
    const pusher = use()

    useEffect(() => {
        const subscribe = pusher.subscribe("rooms")
        subscribe.bind("rooms", (_rooms: Room[]) => {
            setRooms(_rooms)
        })

        return () => {
            subscribe.unbind_all()
            pusher.unsubscribe("rooms")
        }
    }, [])

    return (
        <div
            className={cn(
                "mt-5 p-4 flex flex-col gap-4 shadow-xl backdrop-blur-sm border border-black bg-white/5 rounded-l-xl h-80 overflow-y-auto",
                {
                    "rounded-r-xl": rooms.length < 5,
                }
            )}
        >
            {rooms?.map((room) => (
                <div
                    key={room.identifier}
                    className="flex items-center justify-around font-medium text-lg"
                >
                    <h1>
                        Room <b>#{room.identifier}</b>
                    </h1>

                    <span
                        className={cn(
                            "inline-flex justify-center gap-1 items-center before:w-4 before:h-4 before:inline-block before:rounded-full before:bg-green-600",
                            {
                                "before:animate-pulse": room.o == null,
                                "before:bg-red-600": room.o != null,
                            }
                        )}
                    >
                        {room.o != null ? 2 : 1}/2
                    </span>

                    <div className="flex gap-2">
                        <Link
                            href={`/${room.identifier}`}
                            aria-label="Watch Game"
                            className="cursor-pointer duration-300 disabled:text-light/75 text-light hover:text-white"
                        >
                            <Watch className="w-8 h-8" />
                        </Link>

                        <Link
                            prefetch={false}
                            href={`/${room.identifier}?join=true`}
                            aria-label="Join Game"
                            className="cursor-pointer duration-300 disabled:text-light/75 text-light hover:text-white"
                        >
                            <Join className="w-8 h-8" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
