import { SearchBar } from "../ui2/SearchBar";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";
import { Button } from "../ui/button";
import Link from "next/link";

const MainContent = ({ children }: { children: React.ReactNode }) => {
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
