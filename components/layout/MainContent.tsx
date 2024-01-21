"use client";

import { ReactNode } from "react";
import { SearchBar } from "../ui2/SearchBar";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { CiLogout as LogoutIcon } from "react-icons/ci";

import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageTitles } from "../NavLinks/Navlinks";

interface MainContentProps {
  children: ReactNode;
}

const MainContent = ({ children }: MainContentProps) => {
  const currentPath = usePathname();
  const pageTitle =
    pageTitles.find((page) => page.url === currentPath)?.title || "Untitled";

  return (
    <div className="bg-dark flex flex-col gap-10 pt-10 flex-1 max-w-3xl px-4 md:px-10 xl:px-20 border-r-2 border-l-2 border-gray">
      <div className="flex justify-between items-center w-full">
        <SearchBar />

        <Button asChild className="hidden xl:block bg-cyan">
          <Link href="/create-post">Create Post</Link>
        </Button>

        <div className="gap-2 items-center flex xl:hidden">
          <UserButton />
          <SignedIn>
            <SignOutButton>
              <div className="flex w-full cursor-pointer gap-2 items-center justify-start">
                <LogoutIcon size={32} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
      <h1 className="text-xl font-bold">{pageTitle}</h1>
      <div className="h-screen">{children}</div>
    </div>
  );
};

export default MainContent;
