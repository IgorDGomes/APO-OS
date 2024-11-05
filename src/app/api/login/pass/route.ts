import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const password = data.get("password");

        if (password?.toString().toLowerCase() === "12345") {
            const cookieStore = await cookies();
            cookieStore.set("password", "aReallyStrongPasswordHere", {
                maxAge: 7 * 24 * 60 * 60,
                secure: true,
                httpOnly: true,
                path: "/",
                domain: "127.0.0.1",
                // domain: "apo-os.vercel.app",
            });

            return Response.redirect("http://127.0.0.1:3000/home");
        }

        return Response.redirect("http://127.0.0.1:3000/");
    } catch (error) {
        console.error("Error fetching username: ", error);

        return new Response("Internal Server Error", { status: 500 });
    }
}