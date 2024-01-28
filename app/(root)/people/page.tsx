"use client";

import { User } from "@/TS/ActionTypes";
import Loader from "@/components/Loader";
import UserCard from "@/components/layout/UserCard";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const People = () => {
  const { user } = useUser();
  const [people, setPeople] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/user`);

        if (!response.ok) {
          throw new Error(`there is some http error about fetching people `);
        }

        const data = await response.json();

        const newDate = data.filter(
          (person: User) => person.clerkId !== user?.id
        );

        setPeople(newDate);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch people request failed");
      }
    };
    user && fetchPeople();
  }, [user]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex w-full flex-col gap-4">
      {people.map((person) => (
        <UserCard key={person?.username} userData={person} />
      ))}
    </div>
  );
};

export default People;
