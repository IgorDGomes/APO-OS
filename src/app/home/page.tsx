import { Mobile } from "@/components/mobile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get("username");
  const pass = cookieStore.get("password");

  if (user?.value !== "admin" || pass?.value !== "aReallyStrongPasswordHere") {
    return redirect("/");
  }

  return (
    <>
      <main className="homeBackground h-screen hidden md:flex">
        <div className="h-full w-20 bg-white/10">
          <div className="h-[90%] flex flex-col items-center justify-center">
            <span>item</span>
            <span>item</span>
            <span>item</span>
          </div>
          <div className="h-[10%] flex items-center justify-center">
            <span>item</span>
          </div>
        </div>
        <div className="min-h-8 h-[5%] w-full bg-white/20 backdrop-blur flex items-center">
          <div className="flex justify-around w-[20%]">
            <button>Applications</button>
            <button>Pinned</button>
          </div>
        </div>
      </main>

      <main className="h-screen md:hidden">
        <Mobile />
      </main>
    </>
  );
}
