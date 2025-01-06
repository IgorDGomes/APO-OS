import { cookies } from "next/headers";

export async function deleteCookies() {
  "use server";
  (await cookies()).delete("username");
  (await cookies()).delete("password");
  (await cookies()).delete("desktop_id");
}
