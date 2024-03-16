"use server"
import { SignJWT, jwtVerify } from "jose"
import prisma from "./prisma"
import { cookies } from "next/headers"

function secret() {
    return new TextEncoder().encode(process.env.JWT_SECRET)
}

export async function createUserToken(username: string) {
    if (!username) return null

    try {
        return new SignJWT({ username })
            .setIssuedAt()
            .setProtectedHeader({ alg: process.env.JWT_ALG })
            .setExpirationTime("14d")
            .sign(secret())
    } catch {
        return null
    }
}

export async function verifyJwt(token: string | undefined) {
    if (!token) return null

    try {
        const verification = await jwtVerify(token, secret(), {
            algorithms: [process.env.JWT_ALG],
        })
        return verification.payload
    } catch {
        return null
    }
}

export async function getSessionUsername() {
    const payload = await verifyJwt(
        cookies().get(process.env.NEXT_PUBLIC_COOKIE)?.value
    )

    if (!payload) return null
    return payload.username as string
}

export async function getUserFromCookie(): Promise<null | User> {
    const cookie = cookies().get(process.env.NEXT_PUBLIC_COOKIE)?.value
    if (!cookie) return null

    const payload = await verifyJwt(cookie)
    if (!payload) return null

    try {
        return await prisma.user.findFirst({
            where: {
                username: payload.username!,
            },
        })
    } catch {
        return null
    }
}
