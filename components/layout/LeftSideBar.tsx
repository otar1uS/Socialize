"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarNavigation from "../NavLinks/SidebarNavigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { SignOutButton, SignedIn } from "@clerk/clerk-react";
import { CiLogout as LogoutIcon } from "react-icons/ci";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { ClerkUser } from "@/TS/ActionTypes";
import { LeftSideBarSkeleton } from "../ui/skeletons";
const LeftSideBar = () => {
  const { user, isLoaded } = useUser() as {
    user: ClerkUser;
    isLoaded: boolean;
  };

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const response = await fetch(`/api/user/${user?.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  const userStats = [
    { number: user?.posts?.length, name: "Posts" },
    { number: user?.followers?.length, name: "Followers" },
    { number: user?.following?.length, name: "Following" },
  ];

  loading || isLoaded ? (
    <LeftSideBarSkeleton />
  ) : (
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
              <AvatarImage src={user?.profileImageUrl} />

              <AvatarFallback>{user?.username?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          <p>
            {user?.firstName} {user?.lastName}
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
