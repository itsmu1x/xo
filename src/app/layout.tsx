import { getUserFromCookie } from "@/uses/jwt"
import type { Metadata } from "next"
import { PusherProvider } from "@/components/contexts/pusher"
import { ToastContainer } from "react-toastify"
import "./styles.css"
import "react-toastify/ReactToastify.min.css"
import { AuthProvider } from "@/components/contexts/auth"
import Link from "next/link"
import Github from "@/components/icons/github"
import LinkedIn from "@/components/icons/linkedin"

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

                                <div className="mt-6 w-fit flex gap-2">
                                    <Link
                                        className="duration-300 hover:scale-110 hover:rotate-3"
                                        aria-label="Github"
                                        href="https://github.com/itsmu1x/xo"
                                        target="_blank"
                                    >
                                        <Github className="w-8 h-8" />
                                    </Link>

                                    <Link
                                        className="duration-300 hover:scale-110 hover:rotate-3"
                                        aria-label="LinkedIN"
                                        href="https://www.linkedin.com/in/itsmu1x/"
                                        target="_blank"
                                    >
                                        <LinkedIn className="w-8 h-8" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </AuthProvider>
                </PusherProvider>

                <ToastContainer theme="dark" draggable />
            </body>
        </html>
    )
}
