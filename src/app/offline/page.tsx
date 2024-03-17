"use client"
import { getWinner, isDraw, minimax } from "@/uses/xo"
import OfflineButton from "@/components/offline/button"
import { useState } from "react"
import Question from "@/components/icons/question"
import cn from "@/uses/cn"
import O from "@/components/icons/O"
import X from "@/components/icons/X"
import Link from "next/link"

type PlayProps = {
    i: number
    j: number
    player: Player
}

const makeBoard: () => Board = () => [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function Page() {
    const [room, setRoom] = useState<OfflineRoom | null>()
    const createRoom = (player: Player) => {
        setRoom({
            player,
            board: makeBoard(),
            bot: player === "x" ? "o" : "x",
            result: "none",
        })
    }

    const play = ({ i, j, player }: PlayProps) => {
        if (!room || room.board[i][j]) return
        const board: Board = JSON.parse(JSON.stringify(room.board))
        board[i][j] = player

        const move = minimax(board, 0, true, room.bot)
        const [row, col] = [Math.floor(move.index / 3), move.index % 3]
        if ([0, 1, 2].includes(row) && [0, 1, 2].includes(col)) {
            board[row][col] = room.bot
        }

        const winner = getWinner(board)
        const tie = isDraw(board)
        const result = winner || tie ? winner || "tie" : "none"
        setRoom((old) => {
            if (!old) return old
            return { ...old, result, board }
        })
    }

    if (!room) return <Select createRoom={createRoom} />

    return (
        <>
            <h3 className="text-3xl text-center font-medium text-light/80 tada">
                {room.result === "none"
                    ? null
                    : room.result === "tie"
                    ? "Draw!"
                    : `${room.result} wins`}
            </h3>

            <div className="grid grid-cols-3 grid-rows-3 gap-4 mx-auto max-w-sm mt-4">
                {room.board.map((cell, i) =>
                    cell.map((_element, j) => (
                        <OfflineButton
                            key={`${i}${j}`}
                            play={play}
                            player={room.player}
                            i={i}
                            j={j}
                            room={room}
                        />
                    ))
                )}

                {room.result !== "none" && (
                    <button
                        onClick={() => createRoom(room.player)}
                        className="px-4 col-span-3 py-2 shadow-lg bg-primary disabled:bg-primary/80 hover:bg-primary/80 text-white font-semibold rounded-lg duration-300"
                    >
                        Play again
                    </button>
                )}

                <Link
                    href="/"
                    className="px-4 text-center col-span-3 py-2 shadow-lg bg-primary disabled:bg-primary/80 hover:bg-primary/80 text-white font-semibold rounded-lg duration-300"
                >
                    Go Home
                </Link>
            </div>
        </>
    )
}

function Select({ createRoom }: { createRoom: (player: Player) => any }) {
    return (
        <>
            <h1 className="text-center text-2xl font-semibold">
                Choose X or O
            </h1>

            <div className="flex gap-4 justify-center mx-auto max-w-xs mt-4">
                <Button player="x" click={() => createRoom("x")} />
                <Button player="o" click={() => createRoom("o")} />
            </div>
        </>
    )
}

function Button({ player, click }: { player: Player; click: () => any }) {
    const isX = player === "x"
    const isO = player === "o"

    return (
        <button
            onClick={click}
            aria-label={`Column`}
            className="group relative w-20 overflow-hidden aspect-square p-4 flex flex-col gap-4 shadow-xl bg-light/10 disabled:text-gray-500 backdrop-blur-sm rounded-xl"
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
