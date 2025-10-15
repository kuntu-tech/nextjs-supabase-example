"use client";

import { useState } from "react";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import LoginButton from "./login-button";

export default function DetailsButtonClient({ user }: { user: User | null }) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <>
      {user ? (
        <>
          <button onClick={() => setIsHidden((prev) => !prev)}>
            {isHidden ? "Show Details" : "Hide Details"}{" "}
          </button>

          <br />

          {isHidden ? null : (
            <>
              <p>{`username: ${user?.user_metadata?.full_name}`}</p>
              <p>{`email: ${user?.email}`}</p>

              <br />

              <Link href={"/account"}>
                <button>View Account Page</button>
              </Link>
            </>
          )}
        </>
      ) : (
        <div className="space-y-2">
          <p>user is not logged in</p>
          <LoginButton />
        </div>
      )}
    </>
  );
}
