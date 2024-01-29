"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/layout/Cards";

import { CardsSkeleton } from "@/components/ui/skeletons";

import React, { useEffect, useState } from "react";

const LikedPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts`);

        if (!response.ok) {
          throw new Error(
            `there is some http error about fetching saved posts `
          );
        }

        const data = await response.json();

        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error(`there is some http error about fetching saved posts `);
      }
    };

    fetchPosts();
  }, []);

  return loading ? (
    <CardsSkeleton />
  ) : (
    <div className="w-full h-full flex flex-col gap-6">
      {posts?.map((post: Post) => {
        return <Cards key={post.caption} postData={post} />;
      })}
    </div>
  );
};

export default LikedPosts;
