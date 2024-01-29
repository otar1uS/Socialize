"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/layout/Cards";
import { CardsSkeleton } from "@/components/ui/skeletons";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchingData() {
      setLoading(true);
      try {
        const responsePosts = await fetch("/api/posts");

        const postsData = await responsePosts.json();

        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchingData();
  }, []);

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
