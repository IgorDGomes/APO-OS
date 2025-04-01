import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const password = data.get("password");
        const uuid = randomUUID();

        if (password?.toString().toLowerCase() === "12345") {
            const cookieStore = await cookies();
            cookieStore.set("password", "aReallyStrongPasswordHere", {
                maxAge: 30 * 24 * 60 * 60,
                secure: true,
                httpOnly: true,
                path: "/",
                domain: "apo-os.vercel.app",
            });

            if (!cookieStore.has("desktop_id")) {
                cookieStore.set("desktop_id", uuid, {
                    maxAge: 365 * 24 * 60 * 60,
                    secure: true,
                    httpOnly: true,
                    path: "/",
                    domain: "apo-os.vercel.app",
                });
            }

            return Response.redirect("https://apo-os.vercel.app/home");
        }

        return Response.redirect("https://apo-os.vercel.app/");
    } catch (error) {
        console.error("Error fetching username: ", error);

        return new Response("Internal Server Error", { status: 500 });
    }
}