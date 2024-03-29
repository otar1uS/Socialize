"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/cards/Cards";
import { Button } from "@/components/shadcn-ui/button";
import { CardsSkeleton } from "@/components/ui/skeletons";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPost = () => {
  const { query } = useParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function fetchingData() {
      setLoading(true);
      try {
        const responsePosts = await fetch(`/api/search/posts/${query}`);
        const postsData = await responsePosts.json();
        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchingData();
  }, [query]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return loading ? (
    <CardsSkeleton />
  ) : (
    <div className="h-full w-full flex flex-col gap-10 ">
      <div className="flex justify-start items-center gap-5">
        <Button asChild className="bg-pink-700">
          <Link href={`/search/posts/${query}`}>Posts</Link>
        </Button>
        <Button asChild className="bg-cyan">
          <Link href={`/search/people/${query}`}>people</Link>
        </Button>
      </div>
      {posts.length === 0 ? (
        <h1 className="text-[14px] text-center text-cyan">
          Could not be able to find any post with that title or caption please
          use different one
        </h1>
      ) : (
        posts?.map((post: Post) => {
          return <Cards key={post.__v} postData={post} />;
        })
      )}
    </div>
  );
};

export default SearchPost;
