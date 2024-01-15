"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();
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
            src="/photo1.jpg"
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
}
