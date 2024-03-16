import Pusher from "pusher"

let pusher =
    // @ts-ignore
    global.pusher ||
    new Pusher({
        appId: process.env.PUSHER_API_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_APIKEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        useTLS: true,
    })

if (process.env.NODE_ENV !== "production") {
    // @ts-ignore
    global.pusher = pusher
}

export default pusher as Pusher
