"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  return (
    <button
      className="bg-zinc-700 px-6 py-3 rounded-xl hover:bg-zinc-800"
      onClick={() => {
        signIn("google", { callbackUrl: "/main" });
      }}
    >
      Login with Google
    </button>
  );
}
