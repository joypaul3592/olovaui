import React from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import NotFoundImage from "@/assets/not-found/404_z4xiwg.webp";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 tablet:px-8">
        <div className="flex w-full max-w-[26.25rem] flex-col items-center gap-6 text-center">
          <img
            src={NotFoundImage.src}
            alt="404 - Page not found"
            className="w-auto h-auto"
          />
          <h1 className="font-bold text-3xl sm:text-4xl text-foreground">
            Why are you here?
          </h1>
          <p className="text-muted-foreground text-lg">
            You&apos;re not supposed to be here.
          </p>
          <Link
            href="/"
            className="inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out text-lg justify-center font-bold h-10 px-7 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border-primary/30 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 backdrop-blur-sm"
          >
            Go home
          </Link>
        </div>
      </main>
    </>
  );
}
