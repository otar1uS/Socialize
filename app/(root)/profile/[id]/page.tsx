"use client";

import { User } from "@/TS/ActionTypes";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/shadcn-ui/button";
import { Cards } from "@/components/cards/Cards";
import UserCard from "@/components/cards/UserCard";
import { followUnfollowFunction } from "@/components/forms/onFollow";
import useUserState from "@/store/UserStore";
import Loader from "@/components/ui/Loader";
import { FollowIcon, FollowingIcon } from "@/lib/Utilities/IconsStore";

const Profile = () => {
  const { user } = useUser();
  const { id } = useParams();

  const getAllUsers = useUserState((state) => state.fetchAllTheUserData);
  const isLoading = useUserState((state) => state.loading);
  const handleFollowing = useUserState((state) => state.handleFollowing);

  const Users = useUserState((state) => state.Users);

  // console.log(Users);

  const userStats = useUserState((state) =>
    state.Users.find((user: User) => user.clerkId === id)
  );
  const loggedInUser = useUserState((state) =>
    state.Users.find((u: User) => u.clerkId === user?.id)
  );

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [show, setShow] = useState<string>("Posts");

  const userInfo = [
    { number: userStats?.posts?.length || "0", name: "Posts" },
    { number: userStats?.followers?.length || "0", name: "Followers" },
    { number: userStats?.following?.length || "0", name: "Following" },
  ];

  const isFollowing = userStats?.followers?.find(
    (curU: any) => curU.clerkId === user?.id
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-full w-full px-4">
      <div className="p-4 rounded-md w-full bg-gray">
        <div className="flex items-center ">
          <div className="flex items-center  justify-start gap-10 w-full">
            <div className="rounded-full  hidden sm:flex flex-shrink-0 w-[75px] h-[75px]  justify-center items-center border-[5px] border-cyan">
              <Image
                src={userStats?.profilePhoto!}
                alt="profile picture"
                width={70}
                height={70}
                className="rounded-full w-full"
              />
            </div>
            <div className="flex  flex-shrink items-center gap-6 w-full">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex-col gap-4">
                    <h1 className="text-[20px] text-white font-bold ">
                      {userStats?.firstName + " " + userStats?.lastName}
                    </h1>
                    <p className="text-pink-400 text-[16px] lowercase">
                      @{userStats?.firstName + "" + userStats?.lastName}
                    </p>
                  </div>
                  {user?.id !== userStats?.clerkId ? (
                    !isFollowing ? (
                      <FollowIcon
                        onClick={() => {
                          followUnfollowFunction(user?.id, userStats?._id);
                          loggedInUser &&
                            userStats &&
                            handleFollowing(loggedInUser, userStats);
                        }}
                        className="ml-4 text-cyan cursor-pointer hover:text-pink-400"
                        size={28}
                      />
                    ) : (
                      <FollowingIcon
                        onClick={() => {
                          followUnfollowFunction(user?.id, userStats?._id);
                          loggedInUser &&
                            userStats &&
                            handleFollowing(loggedInUser, userStats);
                        }}
                        className="ml-4 text-pink-700 cursor-pointer hover:text-blue-300"
                        size={28}
                      />
                    )
                  ) : null}
                </div>
                <div className="flex flex-row gap-2 sm:gap-4 items-center text-white  ">
                  {userInfo.map((i) => (
                    <Button
                      key={i.name}
                      asChild
                      variant="ghost"
                      className="cursor-pointer bg-black hover:bg-cyan"
                      onClick={() => setShow(i.name)}
                    >
                      <div className="flex  items-center  gap-1">
                        <p className="text-purple-500 font-[600]">{i.number}</p>
                        <p className="text-white text-[12px] sm:text-[16px]">
                          {i.name}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-pink-500  text-[20px] font-bold my-8">{show}</h1>
        <div className="flex flex-col gap-4">
          {show === "Followers" &&
            userStats?.followers?.map((follower: User) => (
              <UserCard key={follower.username} userData={follower} />
            ))}
          {show === "Following" &&
            userStats?.following?.map((following: User) => (
              <UserCard key={following.username} userData={following} />
            ))}
          {show !== "Followers" &&
            show !== "Following" &&
            userStats?.posts?.map((post: any) => (
              <Cards
                key={post.clerkId}
                postData={post}
                userInfo={userStats}
                isItProfile={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
