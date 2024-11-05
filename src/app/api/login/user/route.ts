import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const username = data.get("username");

        if (username?.toString().toLowerCase() === "admin") {
            const cookieStore = await cookies();
            cookieStore.set("username", "admin", {
                maxAge: 7 * 24 * 60 * 60,
                secure: true,
                httpOnly: true,
                path: "/",
                // domain: "127.0.0.1",
                domain: "apo-os.vercel.app",
            });

            return Response.redirect("https://apo-os.vercel.app");
        }

        return Response.redirect("https://apo-os.vercel.app");
    } catch (error) {
        console.error("Error fetching username: ", error);

        return new Response("Internal Server Error", { status: 500 });
    }
}