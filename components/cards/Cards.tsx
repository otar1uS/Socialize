"use client";

import { Card, CardContent } from "@/components/shadcn-ui/card";
import { usePosts, usePostHandler } from "@/store/PostsStore";
import Image from "next/image";
import { Post, User } from "@/TS/ActionTypes";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { CardHeaderComponent } from "./CardHeader";
import CardFooterComponent from "./CardFooter";

export const Cards = ({
  postData,
  userInfo,
  isItProfile,
}: {
  postData: Post;
  userInfo?: User;
  isItProfile?: boolean;
}) => {
  const posts = usePosts();
  const postHandler = usePostHandler();
  const { user } = useUser();
  const pathname = usePathname();

  const isItSavedPost = posts.map((u) =>
    u.creator?.savedPosts.find((post) => post === postData._id.toString())
  );

  const isItLikedPost = posts.map((u) =>
    u.creator?.likedPosts.find((post) => post === postData._id.toString())
  );

  console.log(isItLikedPost);

  if (
    (pathname.split("/").includes("saved-posts") && !isItSavedPost[0]) ||
    (pathname.split("/").includes("liked-posts") && !isItLikedPost[0])
  )
    return (
      <div className="text-center mt-5">
        <h1 className="text-[14px] sm:text-[16px] xl:text-[20px] text-cyan">
          {pathname.split("/").includes("saved-posts")
            ? "------------------"
            : "------------------"}
        </h1>
      </div>
    );
  return (
    <Card className="  min-w-[340px] max-w-xl mb-2 bg-[#181A1B]">
      <CardHeaderComponent
        isItProfile={isItProfile ? isItProfile : false}
        userInfo={userInfo as any}
        postData={postData as any}
        postHandler={postHandler}
        userId={user?.id as string}
        isItSavedPost={isItSavedPost[0] as any}
      />
      <CardContent className="flex justify-start items-center">
        <Image
          src={postData ? postData.postPhoto : ""}
          alt="beautiful picture"
          width={500}
          height={500}
          className=" max-w-full sm:w-full rounded-md"
        />
      </CardContent>
      <CardFooterComponent
        userId={user?.id as string}
        postData={postData}
        isItLikedPost={isItLikedPost[0] as any}
        postHandler={postHandler}
      />
    </Card>
  );
};
