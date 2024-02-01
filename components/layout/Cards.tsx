"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { formatDistanceToNow, isToday } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/shadcn-ui/avatar";
import Image from "next/image";
import { Post, User } from "@/TS/ActionTypes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ImBin as DeleteIcon } from "react-icons/im";
import usePostState from "@/store/PostsStore";
import Comments from "./Comments";

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
  const posts = usePostState((state) => state.posts);
  const deletePost = usePostState((state) => state.deletePost);
  const postHandler = usePostState((state) => state.postHandler);
  const switcher = usePostState((state) => state.switcher);
  const switcherLike = usePostState((state) => state.switcherLike);

  const pathname = usePathname();

  const router = useRouter();

  const { user, isLoaded } = useUser();

  const date: Date = new Date(String(postData?.createdAt));
  let formattedDate;

  if (isToday(date)) {
    formattedDate = formatDistanceToNow(date, { addSuffix: true });
  } else {
    formattedDate = formatDistanceToNow(date, { addSuffix: true });
  }

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
      <CardHeader className="flex justify-between ">
        <CardTitle className="flex justify-between items-center">
          <div className="flex gap-2 items-center mb-2">
            <Avatar>
              <AvatarImage
                src={
                  isItProfile
                    ? userInfo?.profilePhoto
                    : postData?.creator?.profilePhoto
                }
                onClick={() =>
                  router.replace(
                    `/profile/${
                      isItProfile
                        ? userInfo?.clerkId
                        : postData?.creator.clerkId
                    }`
                  )
                }
                className="cursor-pointer"
              />
              <AvatarFallback>
                {isItProfile
                  ? userInfo?.firstName.slice(0, 2).toUpperCase()
                  : postData?.creator?.firstName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p
              className="text-[14px]  sm:text-[16px] xl:text-[20px] text-slate-200 cursor-pointer"
              onClick={() =>
                router.replace(
                  `/profile/${
                    isItProfile ? userInfo?.clerkId : postData?.creator.clerkId
                  }`
                )
              }
            >
              {isItProfile
                ? userInfo?.firstName + " " + userInfo?.lastName
                : postData?.creator?.firstName +
                  " " +
                  postData?.creator?.lastName}
            </p>
          </div>
          <div className="flex gap-4 flex-col items-center">
            {switcher ? (
              <IoBookmark
                className="max-w-7   cursor-pointer text-cyan"
                onClick={() => {
                  postHandler(savePostUrl, "POST");
                }}
              />
            ) : (
              <IoBookmarkOutline
                className="cursor-pointer max-w-7 text-slate-200 hover:text-pink-700"
                onClick={() => {
                  postHandler(savePostUrl, "POST");
                }}
              />
            )}
            <p className="text-sm text-slate-200">{formattedDate}</p>
          </div>
        </CardTitle>
        <CardDescription>
          <h2 className="text-[18px] font-[500] text-slate-200 leading-tight  ">
            {postData?.caption}{" "}
          </h2>
        </CardDescription>
      </CardHeader>
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
                <MdFavorite
                  size={28}
                  onClick={() => {
                    postHandler(likePostUrl, "POST");
                  }}
                />
                <p>0</p>
              </div>
            ) : (
              <div className="flex  items-center text-slate-200 cursor-pointer hover:text-pink-700  ">
                <MdFavoriteBorder
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
                  <FaEdit size={20} />
                </Link>
              </>
            )}
            <div className="flex gap-1 items-center text-slate-200 hover:text-cyan cursor-pointer">
              <FaRegComment size={20} />
              <p>0</p>
            </div>
          </div>
        </div>
        <Comments post={postData} />
      </CardFooter>
    </Card>
  );
};
