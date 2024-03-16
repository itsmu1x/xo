import type { $Enums, Prisma } from "@prisma/client"

export {}

declare global {
    // TicTacToe Types
    type Cell = [Player, Player, Player]
    type NullCell = [null | Player, null | Player, null | Player]
    type Board = [NullCell, NullCell, NullCell]

    // Prisma Types
    type Player = $Enums.Player
    type Result = $Enums.Result
    type User = Prisma.UserGetPayload<{}>
    type Room = Prisma.RoomGetPayload<{
        include: {
            o: true
            x: true
        }
    }>

    // easy? to make the process.env working probably
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_COOKIE: string

            NEXT_PUBLIC_PUSHER_CLUSTER: string
            NEXT_PUBLIC_PUSHER_APIKEY: string
            PUSHER_SECRET: string
            PUSHER_API_ID: string

            JWT_SECRET: string
            JWT_ALG: string

            DB_URI: string
        }
    }
}
