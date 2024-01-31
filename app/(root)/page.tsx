"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/layout/Cards";
import { CardsSkeleton } from "@/components/ui/skeletons";
import usePostState from "@/store/PostsStore";
import { useEffect } from "react";

const Home = () => {
  const posts = usePostState((state) => state.posts);
  const loading = usePostState((state) => state.loading);
  const allPosts = usePostState((state) => state.allPostsFetcher);

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
