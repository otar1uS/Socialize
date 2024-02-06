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
import { LogoutIcon } from "@/lib/Utilities/IconsStore";
import { useEffect } from "react";

import { User } from "@/TS/ActionTypes";
import { LeftSideBarSkeleton } from "../ui/skeletons";
import useUserState from "@/store/UserStore";

const LeftSideBar = () => {
  const { user } = useUser();

  const getAllUsers = useUserState((state) => state.fetchAllTheUserData);

  const userData = useUserState((state) =>
    state.Users.find((u: User) => u.clerkId === user?.id)
  );

  const isLoading = useUserState((state) => state.loading);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const userStats = [
    { number: userData?.posts?.length || "0", name: "Posts" },
    { number: userData?.followers?.length || "0", name: "Followers" },
    { number: userData?.following?.length || "0", name: "Following" },
  ];

  return isLoading ? (
    <LeftSideBarSkeleton />
  ) : (
    <div
      className="h-screen top-0 bg-dark 
     left-0 sticky  flex flex-col gap-6 px-4 py-6 max-md:hidden text-[16px]  max-xl:items-end   xl:text-xl font-medium"
    >
      <Link href="/">
        <Image src="/logo.png" alt="Socialize" width={150} height={150} />
      </Link>
      <div className="flex flex-col gap-1 xl:gap-3">
        <div className="flex flex-col justify-center gap-3 items-center text-white">
          <Link href="/">
            <Avatar>
              <AvatarImage src={userData?.profilePhoto} />

              <AvatarFallback>{userData?.username?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          <p className=" max-xl:hidden">{userData?.username}</p>
        </div>
        <div className="flex flex-row gap-2 items-center text-white max-xl:hidden ">
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
      <div className="flex gap-2 items-center  max-xl:hidden">
        <UserButton />
        <p>Manage Account</p>
      </div>
      <SignedIn>
        <SignOutButton>
          <div className="flex w-full cursor-pointer gap-2 p-2  max-xl:justify-end  items-center justify-start">
            <LogoutIcon size={32} className="  " />
            <p className="max-xl:hidden ">Log Out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default LeftSideBar;
