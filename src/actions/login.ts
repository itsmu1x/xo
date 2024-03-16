"use server"

import { createUserToken } from "@/uses/jwt"
import prisma from "@/uses/prisma"
import { authFields } from "@/uses/zod"
import { isRedirectError } from "next/dist/client/components/redirect"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"

export default async function login(_username: any, _password: any) {
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
        const user = await prisma.user.findFirst({
            where: {
                username,
            },
        })

        if (!user)
            return {
                ok: false,
                message: "Couldn't find the user",
            }

        const compared = await bcrypt.compare(password, user.password)
        if (!compared)
            return {
                ok: false,
                message: "Wrong username/password",
            }

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
