import { cookies } from "next/headers";

const allowedOrigins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://apo-os.vercel.app",
];

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const username = data.get("username");
        const origin = req.headers.get("origin");

        if (!origin || !allowedOrigins.includes(origin)) {
            return new Response("Invalid origin", { status: 403 });
        }

        if (username?.toString().toLowerCase() === "admin") {
            const cookieStore = await cookies();
            const isVercel = origin === "apo-os.vercel.app";

            cookieStore.set("username", "admin", {
                maxAge: 30 * 24 * 60 * 60,
                secure: isVercel,
                httpOnly: true,
                path: "/",
                ...(isVercel && {
                    domain: "apo-os.vercel.app",
                })
            });
        }

        return Response.redirect(new URL("/", origin), 303);
    } catch (error) {
        console.error("Error fetching username: ", error);

        return new Response("Internal Server Error", { status: 500 });
    }
}