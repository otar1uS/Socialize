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

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/shadcn-ui/avatar";

import Image from "next/image";
import { Post } from "@/TS/ActionTypes";

import Link from "next/link";

export const Cards = ({ postData }: { postData: Post | null }) => {
  const date: Date = new Date(String(postData?.createdAt));
  let formattedDate;

  if (isToday(date)) {
    formattedDate = formatDistanceToNow(date, { addSuffix: true });
  } else {
    formattedDate = formatDistanceToNow(date, { addSuffix: true });
  }

  return (
    <div className="mb-14">
      <Card>
        <CardHeader className="flex justify-between ">
          <CardTitle className="flex justify-between items-center">
            <div className="flex gap-2 items-center mb-2">
              <Avatar>
                <AvatarImage src={postData?.creator?.profilePhoto} />
                <AvatarFallback>
                  {postData?.creator?.firstName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-[20px]">
                {postData?.creator?.firstName +
                  " " +
                  postData?.creator?.lastName}
              </p>
            </div>
            <div>
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
            className="w-full"
          />
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <p className="text-cyan font-[700]">{postData?.tag}</p>
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
        </CardFooter>
      </Card>
    </div>
  );
};
