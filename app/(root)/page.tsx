"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/cards/Cards";
import { CardsSkeleton } from "@/components/ui/skeletons";
import { useAllPostsFetcher, useLoading, usePosts } from "@/store/PostsStore";

import { useEffect } from "react";

const Home = () => {
  const posts = usePosts();
  const loading = useLoading();
  const allPosts = useAllPostsFetcher();

  useEffect(() => {
    const fetchData = async () => {
      await allPosts();
    };

    fetchData();
  }, [allPosts]);

  console.log(posts);

  return loading ? (
    <CardsSkeleton />
  ) : (
    <div className="flex flex-col gap-10">
      {posts?.map((post: Post) => (
        <Cards key={post.caption} postData={post} />
      ))}
    </div>
  );
};

export default Home;
