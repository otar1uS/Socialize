"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/cards/Cards";

import { CardsSkeleton } from "@/components/ui/skeletons";
import usePostState from "@/store/PostsStore";

import React, { useEffect, useState } from "react";

const SavedPosts = () => {
  const posts = usePostState((state) => state.posts);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {posts?.map((post: Post) => {
        return <Cards key={post.caption} postData={post} />;
      })}
    </div>
  );
};

export default SavedPosts;
