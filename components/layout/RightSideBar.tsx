"use client";

import { useUser } from "@clerk/nextjs";
import { Messages } from "../ui/Messages";
import useUserState from "@/store/UserStore";
import UserCard from "./UserCard";

const RightSideBar = () => {
  const { user } = useUser();

  const toFollow = useUserState((state) =>
    state.Users.filter((u) => u.clerkId !== user?.id).filter(
      (u) => !u.followers?.find((curU) => curU.clerkId === user?.id)
    )
  );

  const following = useUserState(
    (state) => state.Users.find((u) => u.clerkId === user?.id)?.following
  );

  return (
    <div className=" max-xl:hidden h-screen  flex sticky right-0 top-0 w-[400px] xl:w-[450px] gap-12  bg-dark  ">
      <div className="ml-5 flex flex-col gap-4 pt-10">
        <h1 className="text-xl font-bold">Following</h1>
        <div className="flex gap-3 justify-start">
          {!following?.length ? (
            <p className="text-indigo-200">You are not following anyone</p>
          ) : (
            following?.map((u) => (
              <UserCard
                userData={u}
                setIsFollowing={
                  !u.followers.find((u) => u.clerkId === user?.id)
                    ? true
                    : u.followers.find((u) => u.clerkId === user?.id)
                }
                key={u.email}
              />
            ))
          )}
        </div>
        <h1 className="text-xl font-bold">Suggest to follow</h1>
        <div className="flex gap-3 justify-start">
          {!toFollow.length ? (
            <p className="text-indigo-200">No users to follow at the moment </p>
          ) : (
            toFollow?.map((u) => (
              <UserCard
                userData={u}
                setIsFollowing={u.followers.find((u) => u.clerkId !== user?.id)}
                key={u.email}
              />
            ))
          )}
        </div>
        <div className="relative h-full w-full hidden xl:block">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
