"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/cards/Cards";

import usePostState from "@/store/PostsStore";

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
