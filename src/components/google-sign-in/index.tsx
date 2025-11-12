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
          className="cursor-pointer px-5 py-2 border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition font-medium flex items-center gap-2"
        >
          <span className="flex items-center gap-2">
            Sign out <LogOut className="w-4 h-4" />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => signIn("google")}
          className="cursor-pointer px-5 py-2 border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition font-medium flex items-center gap-2"
        >
          <span className="flex items-center gap-2">
            Sign in <LogIn className="w-4 h-4" />
          </span>
        </button>
      )}
    </div>
  );
}
