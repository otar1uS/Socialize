"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/shadcn-ui/avatar";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ClerkUser, Post } from "@/TS/ActionTypes";

export const Cards = ({
  postsData,
  usersData,
}: {
  postsData: Post[];
  usersData: ClerkUser[];
}) => {
  const { user } = useUser();
  //!use hook to get user data correctly

  return (
    <div className="h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user?.username?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              Otari Pkhovelishvili
            </div>
          </CardTitle>
          <CardDescription>What a beautiful day</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src="/photo.avif"
            alt="beautiful picture"
            width={500}
            height={500}
          />
        </CardContent>
        <CardFooter>
          <p>$car</p>
        </CardFooter>
      </Card>
    </div>
  );
};
