"use client"
import { createContext, useContext, useState } from "react"
import Pusher from "pusher-js"

type Props = { children: React.ReactNode }

export const Context = createContext<Pusher | undefined>(undefined)
export const use = () => useContext(Context)!
export const PusherProvider = ({ children }: Props) => {
    const [pusher] = useState<Pusher>(
        new Pusher(process.env.NEXT_PUBLIC_PUSHER_APIKEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        })
    )

    return (
        <Context.Provider value={pusher}>
            {pusher != null && children}
        </Context.Provider>
    )
}
