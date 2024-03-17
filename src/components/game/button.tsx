"use client"
import { useState, type SVGProps } from "react"
import cn from "@/uses/cn"
import { useUser } from "../contexts/auth"
import { play } from "@/actions/game"
import { toast } from "react-toastify"
import X from "../icons/X"
import Question from "../icons/question"
import O from "../icons/O"

type Props = {
    i: number
    j: number
    room: Room
    element: Player | null
}

export default function Button({ i, j, room, element }: Props) {
    const [loading, setLoading] = useState(false)
    const user = useUser()
    const click = async () => {
        if (loading) return
        setLoading(true)

        try {
            const data = await play({ i, j, roomId: room.identifier })
            if (data) toast.error(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const isX = room.x && element && room[element] === room.x
    const isO = room.o && element && room[element] === room.o
    const canInteract = () => {
        if (!user) return false
        return (
            room.x_username === user.username ||
            room.o_username === user.username
        )
    }

    return (
        <button
            onClick={click}
            disabled={
                loading ||
                element != null ||
                !canInteract() ||
                room.result !== "none"
            }
            aria-label={`Column`}
            className="group relative overflow-hidden aspect-square p-4 flex flex-col gap-4 shadow-xl bg-light/10 disabled:text-gray-500 backdrop-blur-sm rounded-xl"
        >
            <O
                className={cn(
                    "h-full w-full p-2.5 absolute top-0 -left-full duration-1000",
                    {
                        "left-0": isO,
                    }
                )}
            />
            <Question
                className={cn(
                    "h-full w-full p-2.5 absolute top-0 left-0 duration-1000",
                    {
                        "left-full": isO,
                        "-left-full": isX,
                    }
                )}
            />
            <X
                className={cn(
                    "h-full w-full p-2.5 absolute top-0 left-full duration-1000",
                    {
                        "left-0": isX,
                    }
                )}
            />
        </button>
    )
}
