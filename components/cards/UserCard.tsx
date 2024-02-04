"use client";

import { User } from "@/TS/ActionTypes";
import { useUser } from "@clerk/nextjs";
import { FollowIcon, FollowingIcon } from "@/lib/Utilities/IconsStore";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";
import { useRouter } from "next/navigation";
import { followUnfollowFunction } from "../forms/onFollow";
import useUserState from "@/store/UserStore";

const UserCard = ({
  userData,
  setIsFollowing,
}: {
  userData: User;
  setIsFollowing?: any;
}) => {
  const { user } = useUser();
  const router = useRouter();

  const userStats = useUserState((state) =>
    state.Users.find((u: User) => u.clerkId === user?.id)
  );

  const handleFollowing = useUserState((state) => state.handleFollowing);

  return (
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
        {userData.username}
      </p>

      {user?.id === userData.clerkId ? null : !setIsFollowing ? (
        <FollowIcon
          onClick={() => {
            followUnfollowFunction(user?.id, userData?._id);

            userStats && handleFollowing(userStats, userData);
          }}
          className="ml-4 text-cyan cursor-pointer hover:text-pink-400"
          size={28}
        />
      ) : (
        <FollowingIcon
          onClick={() => {
            followUnfollowFunction(user?.id, userData?._id);
            userStats && handleFollowing(userStats, userData);
          }}
          className="ml-4 text-pink-700 cursor-pointer hover:text-blue-300"
          size={28}
        />
      )}
    </div>
  );
};

export default UserCard;
