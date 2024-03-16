"use client"
import { createContext, useContext, useState } from "react"

type Props = {
    children: React.ReactNode
    user: User | null
}

export const Context = createContext<{
    user: User | null
    clear: () => any
}>({ user: null, clear: () => {} })

export const useUser = () => useContext(Context).user!
export const AuthProvider = ({ children, user: initialUser }: Props) => {
    const [user, setUser] = useState<User | null>(initialUser)

    return (
        <Context.Provider value={{ user, clear: () => setUser(null) }}>
            {children}
        </Context.Provider>
    )
}
