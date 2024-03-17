import type { SVGProps } from "react"

export default function Question(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeDasharray={32}
                strokeDashoffset={32}
                strokeLinecap="round"
                strokeWidth={2}
                d="M7 8C7 5.23858 9.23857 3 12 3C14.7614 3 17 5.23858 17 8C17 9.6356 16.2147 11.0878 15.0005 12C14.1647 12.6279 12 14 12 17"
            >
                <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.5s"
                    values="32;0"
                ></animate>
            </path>
            <circle cx={12} cy={21} r={1} fill="currentColor" fillOpacity={0}>
                <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="0.5s"
                    dur="0.2s"
                    values="0;1"
                ></animate>
            </circle>
        </svg>
    )
}
