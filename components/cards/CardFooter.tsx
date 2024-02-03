"use client";
import React, { useState } from "react";
import {
  DeleteIcon,
  FavoriteIcon,
  UnFavoriteIcon,
  EditIcon,
  CommentIcon,
} from "@/lib/Utilities/IconsStore";
import Link from "next/link";
import { CardFooter } from "../shadcn-ui/card";
import { useDeletePost, useSwitcherLike } from "@/store/PostsStore";
import Comments from "../comment/Comments";
import { Post } from "@/TS/ActionTypes";

const CardFooterComponent = ({
  userId,
  postData,
  postHandler,
}: {
  userId: string;
  postData: Post;
  postHandler: (url: string, method: string) => void;
}) => {
  const [showComments, setShowComments] = useState(false);
  const switcherLike = useSwitcherLike();
  const deletePost = useDeletePost();
  const likePostUrl = `/api/user/${userId}/likedPosts/${postData?._id}`;
  const deletePostUrl = `/api/posts/${postData?._id}/${postData?.creator?._id}`;

  return (
    <CardFooter className="flex-col items-start gap-2">
      <p className="text-cyan font-[700] ">{postData?.tag}</p>
      <div className="flex justify-between items-start w-full">
        <div className="flex  items-center  ">
          {switcherLike ? (
            <div className="flex  items-center  cursor-pointer text-cyan  ">
              <FavoriteIcon
                size={28}
                onClick={() => {
                  postHandler(likePostUrl, "POST");
                }}
              />
              <p>0</p>
            </div>
          ) : (
            <div className="flex  items-center text-slate-200 cursor-pointer hover:text-pink-700  ">
              <UnFavoriteIcon
                size={28}
                onClick={() => {
                  postHandler(likePostUrl, "POST");
                }}
              />
              <p>0</p>
            </div>
          )}
        </div>
        <div className="flex  gap-5 items-start">
          {postData?.creator?.clerkId === userId && (
            <>
              <div
                onClick={() => {
                  postHandler(deletePostUrl, "DELETE");
                  deletePost(postData?._id.toString());
                }}
                className="flex gap-2 items-center cursor-pointer  text-slate-200 hover:text-pink-800"
              >
                <DeleteIcon size={20} />
              </div>
              <Link
                href={`/edit-post/${postData?._id}`}
                className="flex gap-2 items-center cursor-pointer  text-slate-200 hover:text-cyan"
              >
                <EditIcon size={20} />
              </Link>
            </>
          )}
          <div
            onClick={() => setShowComments((e: boolean) => !e)}
            className={`flex gap-1 items-center text-slate-200 hover:text-cyan cursor-pointer  ${
              showComments ? "text-cyan" : ""
            }`}
          >
            <CommentIcon size={20} />
            <p>{postData.comments.length}</p>
          </div>
        </div>
      </div>
      {showComments && <Comments post={postData} />}
    </CardFooter>
  );
};

export default CardFooterComponent;
