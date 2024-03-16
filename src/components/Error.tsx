import { useEffect, useRef } from "react"

type Props = {
    children: React.ReactNode
}

export default function Error({ children }: Props) {
    const alert = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            alert.current?.remove()
        }, 15000)

        return () => clearTimeout(timeout)
    }, [])

    return (
        <div
            className="border border-red-600 rounded-lg px-4 py-3 shadow-md"
            ref={alert}
            role="alert"
        >
            <div className="flex items-center text-red-600">
                <div className="py-1">
                    <svg
                        className="fill-current h-6 w-6 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                </div>
                <p className="font-bold">{children}</p>
            </div>
        </div>
    )
}
