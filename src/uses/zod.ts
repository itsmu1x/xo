import { z } from "zod"

z.setErrorMap((issue, ctx) => {
    if (issue.code === "unrecognized_keys") {
        return {
            message: "Do not enter additional data",
        }
    }

    if (issue.code === "invalid_type" && ctx.defaultError === "Required") {
        return {
            message: `${issue.path} is required`,
        }
    }

    return {
        message: ctx.defaultError,
    }
})

export function authFields(json: any) {
    return z
        .strictObject({
            username: z
                .string()
                .regex(
                    new RegExp(
                        "^(?=[a-zA-Z0-9._]{3,18}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                    ),
                    "Invalid username"
                )
                .trim()
                .toLowerCase(),
            password: z
                .string()
                .min(6, "Your password is weak")
                .max(32, "Invalid password"),
        })
        .safeParse(json)
}

export function gameFields(json: any) {
    return z
        .strictObject({
            roomId: z.string().trim(),
            i: z.number().min(0, "Invalid data").max(2, "Invalid data"),
            j: z.number().min(0, "Invalid data").max(2, "Invalid data"),
        })
        .safeParse(json)
}
