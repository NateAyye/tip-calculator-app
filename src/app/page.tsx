import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <div className="relative flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-50 w-full border border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between p-3">
            <Link href="/">
              <Image
                src="https://utfs.io/f/yWT5aHQuOwsS7UDt6t8xU5g8VIGLPwkQ6TrAe2fYO3C9iZKo"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="sr-only">Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-4 text-sm lg:gap-6">
                <Link href="/about">About</Link>
                {session?.user && (
                  <>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/calendar">Calendar</Link>
                  </>
                )}
                <Link
                  href={session ? "/api/auth/signout" : "/api/auth/signin"}
                  className="rounded bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
                >
                  {session ? "Sign out" : "Sign in"}
                </Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
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
            {/* <Image
              src="https://placehold.co/800x500?text=Hero+Section&font=roboto"
              alt="Hero"
              width={600}
              height={400}
            /> */}
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
