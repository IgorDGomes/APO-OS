import { randomUUID } from "crypto";
import { cookies } from "next/headers";

const allowedOrigins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://apo-os.vercel.app",
];

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const password = data.get("password");
        const uuid = randomUUID();
        const origin = req.headers.get("origin");

        if (!origin || !allowedOrigins.includes(origin)) {
            return new Response("Invalid origin", { status: 403 });
        }

        if (password?.toString().toLowerCase() === "12345") {
            const cookieStore = await cookies();
            const isVercel = origin === "apo-os.vercel.app";

            cookieStore.set("password", "aReallyStrongPasswordHere", {
                maxAge: 30 * 24 * 60 * 60,
                secure: true,
                httpOnly: true,
                path: "/",
                ...(isVercel && {
                    domain: "apo-os.vercel.app",
                })
            });

            if (!cookieStore.has("desktop_id")) {
                cookieStore.set("desktop_id", uuid, {
                    maxAge: 365 * 24 * 60 * 60,
                    secure: true,
                    httpOnly: true,
                    path: "/",
                    ...(isVercel && {
                        domain: "apo-os.vercel.app",
                    })
                });
            }

            return Response.redirect(new URL("/home", origin), 303);
        }

        return Response.redirect(new URL("/", req.url), 303);
    } catch (error) {
        console.error("Error fetching username: ", error);

        return new Response("Internal Server Error", { status: 500 });
    }
}