"use client";

import { UploadButton } from "@/utils/uploadthing";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <header className="sticky z-50 flex items-center justify-center">
      {/* <nav className="supports-[backdrop-filter] absolute w-full rounded-none bg-zinc-950/50 shadow-lg backdrop-blur-[0.5rem] transition-all duration-200 sm:top-4 sm:w-[36rem] sm:rounded-full"> */}
      <div className="flex h-14 w-full items-center justify-between border-b p-4 text-xl">
        <div>Garo</div>
        <div className="flex flex-row">
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <SignedIn>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={() => {
                router.refresh();
              }}
            />
            <UserButton></UserButton>
          </SignedIn>
        </div>
      </div>
      {/* </nav> */}
    </header>
  );
}
