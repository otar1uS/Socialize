"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarNavigation from "../NavLinks/SidebarNavigation";
import { UserButton } from "@clerk/nextjs";
import { SignOutButton, SignedIn } from "@clerk/clerk-react";
import { Logout } from "@mui/icons-material";
import { updateOrCreateUser } from "@/lib/actions/user";
import { useEffect } from "react";

const LeftSideBar = () => {
  return (
    <div
      className="h-screen top-0 bg-dark 
     left-0 sticky  flex flex-col gap-6 px-4 py-6 max-xl:hidden text-[16px]    xl:text-xl font-medium"
    >
      <Link href="/">
        <Image src="/logo.png" alt="Socialize" width={150} height={150} />
      </Link>
      <div className="flex flex-col gap-1 xl:gap-3">
        <div className="flex flex-col justify-center gap-3 items-center text-white">
          <Link href="/">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />

              <AvatarFallback>PI</AvatarFallback>
            </Avatar>
          </Link>
          <p>Otari Pkhovelisvhili</p>
        </div>
        <div className="flex flex-row gap-2 items-center text-white">
          {"1 2 3".split(" ").map((i) => {
            return (
              <div
                key={i}
                className="flex flex-col flex-grow items-center justify-center gap-1"
              >
                <p>0</p>
                <p>
                  {i == "1"
                    ? "Posts"
                    : i == "2"
                    ? "Followers"
                    : i == "3"
                    ? "Following"
                    : null}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <SidebarNavigation />
      <hr />
      <div className="flex gap-2 items-center">
        <UserButton />
        <p>Manage Account</p>
      </div>
      <SignedIn>
        <SignOutButton>
          <div className="flex w-full cursor-pointer gap-2 items-center justify-start">
            <Logout sx={{ color: "white", fontSize: "32px" }} />
            <p>Log Out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default LeftSideBar;
