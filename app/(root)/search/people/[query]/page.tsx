"use client";

import { User } from "@/TS/ActionTypes";
import Loader from "@/components/ui/Loader";
import UserCard from "@/components/cards/UserCard";
import { Button } from "@/components/shadcn-ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPeople = () => {
  const { query } = useParams();

  const [loading, setLoading] = useState(true);

  const [searchedPeople, setSearchedPeople] = useState<User[]>([]);

  useEffect(() => {
    async function getSearchedPeople() {
      setLoading(true);
      const response = await fetch(`/api/search/user/${query}`);
      const data = await response.json();
      setSearchedPeople(data);
      setLoading(false);
    }

    getSearchedPeople();
  }, [query]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Button className="bg-cyan" asChild>
          <Link href={`/search/posts/${query}`}>Posts</Link>
        </Button>
        <Button className="bg-pink-700" asChild>
          <Link href={`/search/people/${query}`}>People</Link>
        </Button>
      </div>

      {searchedPeople.length === 0 ? (
        <h1 className="text-[14px] text-center text-cyan">
          Could not be able to find any user with that name please use different
          username
        </h1>
      ) : (
        searchedPeople.map((person) => (
          <UserCard key={person._id} userData={person} />
        ))
      )}
    </div>
  );
};

export default SearchPeople;
