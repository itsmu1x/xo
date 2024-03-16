import { getSessionUsername } from "@/uses/jwt"
import { createGame } from "@/actions/game"
import { getRooms } from "@/uses/prisma"
import Rooms from "@/components/rooms"
import Link from "next/link"

export default async function Home() {
    const username = await getSessionUsername()
    const rooms = await getRooms()

    return (
        <>
            <h1 className="text-3xl text-center font-bold">Multiplayer</h1>
            {!!username && (
                <p className="text-md text-center font-medium text-light/80">
                    logged in as {username}
                </p>
            )}

            <Rooms initialRooms={rooms} />

            <form className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <button
                        formAction={createGame}
                        className="mt-4 px-4 w-full py-2 shadow-lg bg-primary disabled:bg-primary/80 hover:bg-primary/80 text-white font-semibold rounded-lg duration-300"
                    >
                        Create Game
                    </button>

                    <button
                        title="soon"
                        disabled
                        className="mt-4 px-4 w-full cursor-not-allowed py-2 shadow-lg bg-primary disabled:bg-primary/80 hover:bg-primary/80 text-white font-semibold rounded-lg duration-300"
                    >
                        Offline Game
                    </button>
                </div>

                {!username ? (
                    <Link
                        href="/auth/login"
                        className="px-4 text-center w-full py-2 shadow-lg bg-primary disabled:bg-primary/80 hover:bg-primary/80 text-white font-semibold rounded-lg duration-300"
                    >
                        <button type="button">Login</button>
                    </Link>
                ) : (
                    <a
                        href="/auth/signout"
                        className="px-4 text-center w-full py-2 shadow-lg bg-primary disabled:bg-primary/80 hover:bg-primary/80 text-white font-semibold rounded-lg duration-300"
                    >
                        <button type="button">Sign Out</button>
                    </a>
                )}
            </form>
        </>
    )
}
