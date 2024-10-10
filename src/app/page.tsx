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
        </header>
        <main className="min-h-screen flex-1">
          <div className="flex items-center justify-center border-b border-foreground/60 bg-[linear-gradient(175deg,var(--tw-gradient-stops))] from-background from-60% to-foreground/30 py-10">
            <div className="max-w-md px-4 sm:max-w-2xl sm:px-6 md:max-w-3xl lg:max-w-4xl lg:px-0 xl:max-w-5xl 2xl:max-w-6xl">
              <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-6xl sm:tracking-tight lg:text-[4rem] xl:text-[6rem] xl:tracking-tight 2xl:text-[6.5rem]">
                Your next best tip and wage tracking app.
              </h1>
              <div className="mt-4 flex w-full items-center justify-center gap-4 xl:mt-8">
                <Link
                  href={session ? "/dashboard" : "/api/auth/signin"}
                  target="_self"
                  rel="noopener noreferrer"
                  className="group inline-flex cursor-pointer items-center rounded-full px-3 py-2 text-sm font-semibold md:px-5 md:text-base lg:px-4 lg:py-3"
                >
                  Get Started
                  <svg
                    className="stroke -mr-1 ml-2 mt-0.5 h-3 stroke-current stroke-2"
                    fill="none"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                  >
                    <path
                      className="opacity-0 transition group-hover:opacity-100"
                      d="M0 5h7"
                    ></path>
                    <path
                      className="transition group-hover:translate-x-[3px]"
                      d="M1 1l4 4-4 4"
                    ></path>
                  </svg>
                </Link>
                <a
                  href="https://github.com/t3-oss/create-t3-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center rounded-full bg-foreground/10 px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-white/20 hover:no-underline md:px-5 md:text-base lg:px-4 lg:py-3"
                >
                  GitHub
                  <ExternalLink className="h-3" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
