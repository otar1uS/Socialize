"use client";
import { useState, useEffect } from "react";
import { SearchBar } from "../ui2/SearchBar";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";
import { Button } from "../ui/button";
import Link from "next/link";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "user1",
      content: "This is a post from user1.",
      imageUrl: "/images/post1.jpg",
    },
    {
      id: 2,
      username: "user2",
      content: "Another post from user2.",
      imageUrl: "/images/post2.jpg",
    },
    // Add more posts as needed
  ]);

  // Function to fetch posts from the server (replace with actual API call)
  const fetchPosts = async () => {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Replace with actual API call
    // const response = await fetch('API_ENDPOINT');
    // const data = await response.json();
    // setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-dark flex flex-col gap-10 pt-10 flex-1 max-w-3xl px-4 md:px-10 xl:px-20 border-r-2 border-l-2 border-gray ">
      <div className="flex justify-between items-center  w-full ">
        <SearchBar />

        <Button asChild className="hidden xl:block  bg-cyan">
          <Link href="/create-post">Create Post</Link>
        </Button>

        <div className=" gap-2 items-center  flex xl:hidden">
          <UserButton />
          <SignedIn>
            <SignOutButton>
              <div className="flex w-full cursor-pointer gap-2 items-center justify-start">
                <Logout sx={{ color: "white", fontSize: "32px" }} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
      <h1 className="text-xl font-bold">Feed</h1>
      {children}
    </div>
  );
};

export default MainContent;
