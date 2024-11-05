import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CircleUserRound } from "lucide-react";

import { Mobile } from "@/components/mobile";
import { UserForm } from "@/components/userForm";
import { PassForm } from "@/components/passForm";

export default async function Login() {
  const cookieStore = await cookies();
  const confirmedUser = cookieStore.get("username");
  const confirmedPassword = cookieStore.get("password");

  if (
    confirmedUser?.value === "admin" &&
    confirmedPassword?.value === "aReallyStrongPasswordHere"
  ) {
    redirect("/home");
  }

  return (
    <>
      <main className="h-screen hidden md:flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <CircleUserRound className="size-36 stroke-1" />
          {confirmedUser ? <PassForm /> : <UserForm />}
        </div>
      </main>
      <main className="h-screen md:hidden">
        <Mobile />
      </main>
    </>
  );
}
