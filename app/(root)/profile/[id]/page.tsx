"use client";

import {
  SlUserFollow as FollowIcon,
  SlUserFollowing as FollowingIcon,
} from "react-icons/sl";
import { User } from "@/TS/ActionTypes";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/shadcn-ui/button";
import { Cards } from "@/components/layout/Cards";
import Post from "@/lib/models/Post";

const Profile = () => {
  const { user } = useUser();
  const { id } = useParams();

  const [userStats, setUserStats] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch request failed:", error);
      }
    };
    id && getUserData();
  }, [id]);

  const userInfo = [
    { number: userStats?.posts?.length || "0", name: "Posts" },
    { number: userStats?.followers?.length || "0", name: "Followers" },
    { number: userStats?.following?.length || "0", name: "Following" },
  ];

  console.log(userStats);

  const isFollowing = userStats?.followers?.find(
    (curU: any) => curU.clerkId === user?.id
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="h-full w-full px-4 px:px-10 xl:px-18">
      <div className="p-4 rounded-md w-full bg-gray">
        <div className="flex items-center justify-between ">
          <div className="flex items-center  justify-start gap-10 w-full">
            <div className="rounded-full  flex justify-center items-center border-[5px] border-cyan">
              <Image
                src={userStats?.profilePhoto || ""}
                alt="profile picture"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="flex  items-center gap-14 w-full">
              <div className="flex flex-col gap-4">
                <h1 className="text-[20px] text-white font-bold ">
                  {userStats?.firstName + " " + userStats?.lastName}
                </h1>
                <p className="text-pink-400 text-[16px] lowercase">
                  @{userStats?.firstName + "" + userStats?.lastName}
                </p>
                <div className="flex flex-row gap-4 items-center text-white  ">
                  {userInfo.map((i) => (
                    <Button
                      key={i.name}
                      asChild
                      variant="ghost"
                      className="cursor-pointer bg-black hover:bg-cyan"
                    >
                      <div className="flex  items-center  gap-1">
                        <p className="text-purple-500 font-[600]">{i.number}</p>
                        <p className="text-white text-[16px]">{i.name}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              {!isFollowing ? (
                <FollowIcon
                  className="ml-4 text-cyan cursor-pointer hover:text-pink-400"
                  size={28}
                />
              ) : (
                <FollowingIcon
                  className="ml-4 text-pink-700 pointer hover:text-blue-300"
                  size={28}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-pink-500  text-[20px] font-bold my-8">Posts</h1>
        <div className="flex flex-col gap-4">
          {userStats?.posts?.map((post: any) => {
            return (
              <Cards
                key={post.firstName + 1}
                postData={post}
                userInfo={userStats}
                isItProfile={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
