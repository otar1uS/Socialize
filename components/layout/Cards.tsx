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

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/shadcn-ui/avatar";

import Image from "next/image";
import { Post, User } from "@/TS/ActionTypes";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CardsSkeleton } from "../ui/skeletons";

import { ImBin as DeleteIcon } from "react-icons/im";
import usePostState from "@/store/PostsStore";

export const Cards = ({
  postData,
  userInfo,
  isItProfile,
}: {
  postData: Post;
  userInfo?: User;
  isItProfile?: boolean;
}) => {
  const { posts, postHandler, deletePost } = usePostState((state) => state);

  const pathname = usePathname();

  const router = useRouter();

  const { user, isLoaded } = useUser();

  const [Posts, setPosts] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [switcher, setSwitcher] = useState(false) as any;
  const [switcherLike, setSwitcherLike] = useState(false) as any;

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/user/${user?.id}`);

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

    isLoaded && fetchSavedPosts();
  }, [user, isLoaded]);

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

  const isItSavedPost = Posts?.savedPosts.find(
    (post) => post._id.toString() === postData._id.toString()
  );

  const isItLikedPost = Posts?.likedPosts?.find(
    (post) => post._id.toString() === postData._id.toString()
  );

  useEffect(() => {
    setSwitcher(isItSavedPost);
    setSwitcherLike(isItLikedPost);
  }, [isItSavedPost, isItLikedPost]);

  if (
    (pathname.split("/").includes("saved-posts") && !isItSavedPost) ||
    (pathname.split("/").includes("liked-posts") && !isItLikedPost)
  )
    return (
      <h1 className="text-center mt-5  text-[14px]  sm:text-[16px]  xl:text-[20px] w-full text-cyan">
        {!isItSavedPost ? "No saved posts yet" : "No liked posts yet"}
      </h1>
    );

  return loading ? (
    <CardsSkeleton />
  ) : (
    <Card className="  min-w-[340px] max-w-xl mb-2">
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
              className="text-[14px]  sm:text-[16px] xl:text-[20px] cursor-pointer"
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

                  setSwitcher(false);
                }}
              />
            ) : (
              <IoBookmarkOutline
                className="cursor-pointer max-w-7 text-pink-700"
                onClick={() => {
                  postHandler(savePostUrl, "POST");

                  setSwitcher(true);
                }}
              />
            )}
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
        </CardTitle>
        <CardDescription>
          <h2 className="text-[18px] font-[500] text-black leading-tight  ">
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
      <CardFooter>
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col items-start gap-3">
            <p className="text-cyan font-[700]">{postData?.tag}</p>

            {switcherLike ? (
              <MdFavorite
                size={28}
                className="cursor-pointer text-cyan"
                onClick={() => {
                  postHandler(likePostUrl, "POST");

                  setSwitcherLike(false);
                }}
              />
            ) : (
              <MdFavoriteBorder
                className="cursor-pointer text-pink-700"
                size={28}
                onClick={() => {
                  postHandler(likePostUrl, "POST");

                  setSwitcherLike(true);
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-5 items-start">
            <div
              onClick={() => postHandler(deletePostUrl, "DELETE")}
              className="flex gap-2 items-center cursor-pointer "
            >
              <p className="text-[16px] text-gray-400 font-bold text-red-800">
                Delete
              </p>
              <DeleteIcon size={20} className="text-gray-400 text-red-800" />
            </div>
            <Link
              href={`/edit-post/${postData?._id}`}
              className="flex gap-2 items-center cursor-pointer "
            >
              <p className="text-[16px] text-gray-400 font-bold text-blue-800">
                Edit
              </p>
              <FaEdit size={20} className="text-gray-400 text-blue-800" />
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
