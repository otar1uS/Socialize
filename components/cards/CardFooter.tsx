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
import { useDeletePost } from "@/store/PostsStore";
import Comments from "../comment/Comments";
import { Post } from "@/TS/ActionTypes";

const CardFooterComponent = ({
  userId,
  postData,
  postHandler,
  isItLikedPost,
}: {
  userId: string;
  postData: Post;
  isItLikedPost: string;
  postHandler: (url: string, method: string) => void;
}) => {
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(postData.likes.length));

  const deletePost = useDeletePost();
  const likePostUrl = `/api/user/${userId}/likedPosts/${postData?._id}`;
  const deletePostUrl = `/api/posts/${postData?._id}/${postData?.creator?._id}`;

  const handleLikeClick = async () => {
    postHandler(likePostUrl, "POST");

    setLikeCount((prevCount) =>
      isItLikedPost ? prevCount - 1 : prevCount + 1
    );
  };

  return (
    <CardFooter className="flex-col items-start gap-2">
      <p className="text-cyan font-[700] ">{postData?.tag}</p>
      <div className="flex justify-between items-start w-full">
        <div className="flex  items-center  ">
          {isItLikedPost ? (
            <div
              className="flex  items-center  cursor-pointer text-pink-900   "
              onClick={handleLikeClick}
            >
              <FavoriteIcon size={28} />
              <p>{likeCount}</p>
            </div>
          ) : (
            <div
              className="flex  items-center text-slate-200 cursor-pointer hover:text-pink-700   "
              onClick={handleLikeClick}
            >
              <UnFavoriteIcon size={28} />
              <p>{likeCount}</p>
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
