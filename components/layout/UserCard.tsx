"use client";
import {
  SlUserFollow as FollowIcon,
  SlUserFollowing as FollowingIcon,
} from "react-icons/sl";

import { ClerkUser, User } from "@/TS/ActionTypes";
import { useUser } from "@clerk/nextjs";

import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";
import { useRouter } from "next/navigation";

const UserCard = ({ userData }: { userData: User }) => {
  const { user } = useUser();

  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<ClerkUser | any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/${user?.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCurrentUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch request failed:", error);
      }
    };
    user && getUserData();
  }, [user]);

  const isFollowing = currentUser?.following?.find(
    (curU: any) => curU._id === userData._id
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="flex items-center gap-4 p-3 bg-gray rounded-lg ">
      <Avatar>
        <AvatarImage
          src={userData.profilePhoto}
          className="cursor-pointer"
          onClick={() => router.replace(`/profile/${userData.clerkId}`)}
        />
        <AvatarFallback>
          {userData.firstName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p
        className="cursor-pointer "
        onClick={() => router.replace(`/profile/${userData.clerkId}`)}
      >
        {userData.firstName + " " + userData.lastName}
      </p>
      {!isFollowing ? (
        <FollowIcon className="ml-4 text-cyan cursor-pointer" size={24} />
      ) : (
        <FollowingIcon className="ml-4 text-pink-700 pointer" size={24} />
      )}
    </div>
  );
};

export default UserCard;
