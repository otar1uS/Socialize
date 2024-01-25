"use client";

import { ReactNode, useEffect, useRef } from "react";
import { SearchBar } from "../ui/SearchBar";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { CiLogout as LogoutIcon } from "react-icons/ci";

import { Button } from "../shadcn-ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageTitles } from "../NavLinks/Navlinks";

interface MainContentProps {
  children: ReactNode;
}

const MainContent = ({ children }: MainContentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentPath = usePathname();
  const regex = /^\/([^\/]+)/;
  const firstPath = currentPath.match(regex)
    ? currentPath.match(regex)?.[0]
    : currentPath;

  // Get title of current path
  const title = pageTitles.find((page) => page.url === firstPath)?.title || "";

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        if (typeof window !== "undefined" && window.scrollY > 0) {
          ref.current.classList.add("opacity-95");
        } else {
          ref.current.classList.remove("opacity-95");
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="bg-dark  relative flex flex-col gap-10 pt-10 flex-1 max-w-3xl    border-r-2 border-l-2 border-gray">
      <div
        ref={ref}
        className="flex  sticky top-0  max-w-full gap-20   z-[200] bg-black   py-5  justify-between items-center  px-4 md:px-8   "
      >
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
      <h1 className="text-2xl font-bold mt-2  px-4 md:px-6 xl:px-16">
        {title}
      </h1>
      <div className="h-full overflow-scroll  overflow-y-hidden overflow:bg-gray  overflow-x-hidden w-full px-4 md:px-8 xl:px-18 ">
        {children}
      </div>
    </div>
  );
};

export default MainContent;
