import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const GET = async () => {
    cookies().set(process.env.NEXT_PUBLIC_COOKIE, "", {
        httpOnly: true,
        expires: new Date(0),
    })

    redirect("/")
}
