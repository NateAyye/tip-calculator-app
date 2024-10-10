import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <div className="">
        <nav className="flex items-center justify-between">
          <Link href="/" aria-labelledby="home-label">
            <p className="sr-only" id="home-label">
              Home
            </p>
            <Image
              src="https://utfs.io/f/yWT5aHQuOwsShOgDloqlPvSUVWFuMKqdBCcDIay9J7A05ejr"
              alt="Logo"
              width={70}
              height={70}
            />
          </Link>
          <div>
            <Link href="/calendar">Calendar</Link>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </nav>
      </div>
      <main className="flex min-h-screen">
        <div className="container flex flex-col">
          {session?.user && <p>You are Logged In!</p>}
        </div>
      </main>
    </HydrateClient>
  );
}
