import { verifyJwt } from "@/uses/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const payload = await verifyJwt(
        cookies().get(process.env.NEXT_PUBLIC_COOKIE)?.value
    )
    if (payload) redirect("/")

    return children
}
