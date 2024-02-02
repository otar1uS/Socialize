"use client";

import { ReactNode, useEffect, useRef } from "react";
import { SearchBar } from "../ui/SearchBar";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { LogoutIcon } from "@/lib/Utilities/IconsStore";
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
    <div className="bg-dark   flex flex-col  items-center gap-10 pt-5 flex-1 w-full max-w-3xl     border-r-2 border-l-2 border-gray">
      <div
        ref={ref}
        className="flex  sticky top-0  w-full max-w-3xl flex-col sm:flex-row  sm:gap-20   items-start  gap-4  z-[200] bg-black   py-2 sm:py-5  justify-between  sm:items-center  px-4 md:px-8   "
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
      <div className="h-full overflow-scroll  overflow-y-hidden overflow:bg-gray mt-2  overflow-x-hidden w-full max-w-2xl px-4 md:px-8 xl:px-18 ">
        <h1 className="text-2xl  self-start font-bold    mb-3">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default MainContent;
