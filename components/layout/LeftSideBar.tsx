"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn-ui/avatar";
import SidebarNavigation from "../NavLinks/SidebarNavigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { SignOutButton, SignedIn } from "@clerk/clerk-react";
import { CiLogout as LogoutIcon } from "react-icons/ci";
import { useEffect, useState } from "react";

import { ClerkUser } from "@/TS/ActionTypes";

const LeftSideBar = () => {
  const { user } = useUser();

  const [userData, setUserData] = useState<ClerkUser | any>({});

  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const response = await fetch(`/api/user/${user?.id}`);

        const data = await response.json();
        setUserData(data);
      };
      getUserData();
    }
  }, [user]);

  const userStats = [
    { number: userData?.posts?.length || "0", name: "Posts" },
    { number: userData?.followers?.length || "0", name: "Followers" },
    { number: userData?.following?.length || "0", name: "Following" },
  ];

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
              <AvatarImage src={userData?.profileImageUrl} />

              <AvatarFallback>{userData?.username?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          <p>
            {userData?.firstName} {userData?.lastName}
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center text-white">
          {userStats.map((i) => {
            return (
              <div
                key={i.name}
                className="flex flex-col flex-grow items-center justify-center gap-1"
              >
                <p>{i.number}</p>
                <p>{i.name}</p>
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
            <LogoutIcon size={32} />
            <p>Log Out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default LeftSideBar;
