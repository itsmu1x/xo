"use client"
import { useState, type SVGProps } from "react"
import cn from "@/uses/cn"
import { useUser } from "../contexts/auth"
import { play } from "@/actions/game"
import { toast } from "react-toastify"

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

function X(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
            {...props}
        >
            <path
                fill="currentColor"
                d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496"
            ></path>
        </svg>
    )
}

function O(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            {...props}
        >
            <path
                fill="currentColor"
                d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12m0-1A5 5 0 1 1 8 3a5 5 0 0 1 0 10"
            ></path>
        </svg>
    )
}

function Question(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeDasharray={32}
                strokeDashoffset={32}
                strokeLinecap="round"
                strokeWidth={2}
                d="M7 8C7 5.23858 9.23857 3 12 3C14.7614 3 17 5.23858 17 8C17 9.6356 16.2147 11.0878 15.0005 12C14.1647 12.6279 12 14 12 17"
            >
                <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.5s"
                    values="32;0"
                ></animate>
            </path>
            <circle cx={12} cy={21} r={1} fill="currentColor" fillOpacity={0}>
                <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="0.5s"
                    dur="0.2s"
                    values="0;1"
                ></animate>
            </circle>
        </svg>
    )
}
