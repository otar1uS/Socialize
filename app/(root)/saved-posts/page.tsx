"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/layout/Cards";

import { CardsSkeleton } from "@/components/shadcn-ui/skeletons";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const SavedPosts = () => {
  const { user, isLoaded } = useUser();

  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/user/${user?.id}`);

        if (!response.ok) {
          throw new Error(
            `there is some http error about fetching saved posts `
          );
        }

        const data = await response.json();

        setSavedPosts(data.savedPosts);
        setLoading(false);
      } catch (error) {
        console.error(`there is some http error about fetching saved posts `);
      }
    };

    isLoaded && fetchSavedPosts();
  }, [user, isLoaded]);

  return loading ? (
    <CardsSkeleton />
  ) : (
    <div className="w-full h-full flex flex-col gap-6">
      {savedPosts.map((post: Post) => {
        return <Cards key={post.caption} postData={post} />;
      })}
    </div>
  );
};

export default SavedPosts;
