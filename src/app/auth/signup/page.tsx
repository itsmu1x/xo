"use client"
import { useState, type FormEvent } from "react"
import { toast } from "react-toastify"
import signup from "@/actions/signup"

export default function Signup() {
    const [loading, setLoading] = useState(false)
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (loading) return

        try {
            setLoading(true)
            const formData = new FormData(e.currentTarget)
            const data = await signup(
                formData.get("username"),
                formData.get("password")
            )

            data?.message && toast.error(data.message)
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={submit}
            className="mt-5 p-4 flex flex-col gap-4 shadow-xl mx-auto max-w-xl backdrop-blur-sm border border-black bg-white/5 rounded-xl"
        >
            <h1 className="text-3xl font-bold text-center">Signup</h1>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="username">Username</label>
                <input
                    className="px-4 py-2 bg-transparent outline-none rounded-lg border border-black"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    id="username"
                    autoComplete="username"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="password">Password</label>
                <input
                    className="px-4 py-2 bg-transparent outline-none rounded-lg border border-black"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                    autoComplete="current-password"
                />
            </div>

            <div>
                <span className="font-medium">
                    Already have an account?{" "}
                    <a className="underline text-blue-300" href="/auth/login">
                        Login
                    </a>
                </span>

                <button
                    disabled={loading}
                    className="mt-2 px-4 py-2 w-full shadow-lg bg-black disabled:bg-white disabled:text-black disabled:cursor-not-allowed hover:bg-white text-white hover:text-black font-semibold rounded-lg duration-300"
                >
                    Signup
                </button>
            </div>
        </form>
    )
}
