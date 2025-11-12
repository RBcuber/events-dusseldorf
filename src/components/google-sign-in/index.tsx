"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

export default function GoogleSignIn() {

  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <button
          type="button"
          onClick={() => signOut()}
          className="px-5 py-1 border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition font-medium"
        >
          <span >Sign out</span>
          <LogOut />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => signIn("google")}
          className="px-5 py-1 border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition font-medium"
        >
          <span>Sign in</span>
          <LogIn />
        </button>
      )}
    </div>
  );
}