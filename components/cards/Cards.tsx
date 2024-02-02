"use client";

import { Card, CardContent, CardFooter } from "@/components/shadcn-ui/card";
import {
  DeleteIcon,
  FavoriteIcon,
  UnFavoriteIcon,
  EditIcon,
  CommentIcon,
} from "@/lib/Utilities/IconsStore";
import {
  usePosts,
  useDeletePost,
  usePostHandler,
  useSwitcher,
  useSwitcherLike,
} from "@/store/PostsStore";

import Image from "next/image";
import { Post, User } from "@/TS/ActionTypes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import Comments from "../comment/Comments";
import { useState } from "react";

import { CardHeaderComponent } from "./CardHeader";

export const Cards = ({
  postData,
  userInfo,
  isItProfile,
}: {
  postData: Post;
  userInfo?: User;
  isItProfile?: boolean;
}) => {
  //posts states
  const posts = usePosts();
  const deletePost = useDeletePost();
  const postHandler = usePostHandler();
  const switcher = useSwitcher();
  const switcherLike = useSwitcherLike();

  const [showComments, setShowComments] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const { user } = useUser();

  const savePostUrl = `/api/user/${user?.id}/savedPosts/${postData?._id}`;
  const likePostUrl = `/api/user/${user?.id}/likedPosts/${postData?._id}`;
  const deletePostUrl = `/api/posts/${postData?._id}/${postData?.creator?._id}`;

  const isItSavedPost = posts.map((u) =>
    u.creator.savedPosts.find((post) => post === postData._id.toString())
  );

  const isItLikedPost = posts.map((u) =>
    u.creator.likedPosts.find((post) => post === postData._id.toString())
  );

  if (
    (pathname.split("/").includes("saved-posts") && !isItSavedPost) ||
    (pathname.split("/").includes("liked-posts") && !isItLikedPost)
  )
    return (
      <h1 className="text-center mt-5  text-[14px]  sm:text-[16px]  xl:text-[20px] w-full text-cyan">
        {!isItSavedPost ? "No saved posts yet" : "No liked posts yet"}
      </h1>
    );

  return (
    <Card className="  min-w-[340px] max-w-xl mb-2 bg-[#181A1B]">
      <CardHeaderComponent
        isItProfile={isItProfile ? isItProfile : false}
        userInfo={userInfo as any}
        postData={postData as any}
        router={router as any}
        switcher={switcher}
        postHandler={postHandler}
        savePostUrl={savePostUrl}
      />
      <CardContent className="flex justify-start items-center">
        <Image
          src={postData ? postData.postPhoto : ""}
          alt="beautiful picture"
          width={500}
          height={500}
          className=" max-w-full sm:w-full"
        />
      </CardContent>
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
            {postData?.creator?.clerkId === user?.id && (
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
    </Card>
  );
};
