"use client";

import { User } from "@/TS/ActionTypes";
import Loader from "@/components/ui/Loader";
import UserCard from "@/components/cards/UserCard";
import { useUser } from "@clerk/nextjs";

import useUserState from "@/store/UserStore";

const People = () => {
  const { user } = useUser();

  const isLoading = useUserState((state) => state.loading);

  const people = useUserState((state) =>
    state.Users.filter((person: User) => person.clerkId !== user?.id)
  );

  if (!people)
    return (
      <h1 className="text-cyan text-[16px] text-center">
        Could not find any User
      </h1>
    );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex w-full flex-col gap-4 min-h-screen">
      {people.map((person) => (
        <UserCard key={person?.username} userData={person} />
      ))}
    </div>
  );
};

export default People;
