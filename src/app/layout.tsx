import { getUserFromCookie } from "@/uses/jwt"
import type { Metadata } from "next"
import { PusherProvider } from "@/components/contexts/pusher"
import { ToastContainer } from "react-toastify"
import "./styles.css"
import "react-toastify/ReactToastify.min.css"
import { AuthProvider } from "@/components/contexts/auth"

export const metadata: Metadata = {
    title: "Multiplayer Tic Tac Toe",
    description:
        "Play Tic Tac Toe multiplayer game or 2 player with hundreds of players worldwide online.",
    applicationName: "Multiplayer Tic Tac Toe",
    authors: [
        {
            name: "itsMU1X",
            url: "https://github.com/itsmu1x",
        },
    ],
    other: {
        "theme-color": "#2a2a4a",
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await getUserFromCookie()

    return (
        <html lang="en">
            <body className="font-sans text-white relative bg-slate-950">
                <div className="background" />

                <PusherProvider>
                    <AuthProvider user={user}>
                        <div className="min-h-dvh grid place-items-center p-4">
                            <div className="container max-w-2xl px-5">
                                {children}
                            </div>
                        </div>
                    </AuthProvider>
                </PusherProvider>

                <ToastContainer theme="dark" draggable />
            </body>
        </html>
    )
}
