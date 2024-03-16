"use server"
import { isRedirectError } from "next/dist/client/components/redirect"
import { createUserToken } from "@/uses/jwt"
import { authFields } from "@/uses/zod"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import prisma from "@/uses/prisma"
import bcrypt from "bcrypt"

export default async function signup(_username: any, _password: any) {
    try {
        const zod = authFields({
            username: _username,
            password: _password,
        })

        if (!zod.success)
            return {
                ok: false,
                message: zod.error.errors[0].message,
            }

        const { password, username } = zod.data
        const exists = await prisma.user.findFirst({
            where: {
                username,
            },
        })

        if (exists)
            return {
                ok: false,
                message: "This username is taken",
            }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: {
                password: hashedPassword,
                username,
            },
        })
        const token = await createUserToken(user.username)

        if (token) {
            cookies().set(process.env.NEXT_PUBLIC_COOKIE, token, {
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
            })
        }

        redirect("/")
    } catch (error) {
        if (isRedirectError(error)) throw error
        return {
            ok: false,
            message: "Something went wrong!",
        }
    }
}
