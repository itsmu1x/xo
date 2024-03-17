"use client"
import Question from "../icons/question"
import cn from "@/uses/cn"
import O from "../icons/O"
import X from "../icons/X"

type Props = {
    play: (data: { i: number; j: number; player: Player }) => any
    room: OfflineRoom
    player: Player
    i: number
    j: number
}

export default function OfflineButton({ play, player, i, j, room }: Props) {
    const isX = room.board[i][j] === "x"
    const isO = room.board[i][j] === "o"

    return (
        <button
            disabled={isX || isO || room.result !== "none"}
            onClick={() => play({ i, j, player })}
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
