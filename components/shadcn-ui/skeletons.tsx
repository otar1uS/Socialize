import { sidebarLinks } from "../NavLinks/Navlinks";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";

import { FaEdit } from "react-icons/fa";

import { Avatar, AvatarImage } from "../../components/shadcn-ui/avatar";

export const LeftSideBarSkeleton = () => {
  return (
    <div
      className="h-screen top-0 bg-dark 
         left-0 sticky  flex flex-col gap-6 px-4 py-6 max-md:hidden"
    >
      <div>
        <div className="w-[200px] h-[67px] bg-indigo-200" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-center gap-3 items-center text-white">
          <div className="w-[50px] h-[50px] rounded-full bg-indigo-200"></div>
          <p className="w-[150px] h-2 bg-slate-200 rounded-md"></p>
        </div>
        <div className="flex flex-row gap-2 items-center text-white">
          {"1 2 3".split(" ").map((i) => {
            return (
              <div
                key={i}
                className="flex flex-col flex-grow items-center justify-center gap-1"
              >
                <p className="h-2 w-2 rounded-lg bg-slate-200"></p>
                <p className="h-2 w-12 rounded-lg bg-slate-200"></p>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        {sidebarLinks.map((link) => {
          return (
            <div
              key={link.route}
              className="flex gap-1 items-center justify-start p-1  text-yellow "
            >
              <div className="w-[24px] h-[24px] rounded-md bg-indigo-200"></div>
              <span className="h-2 w-[70px] rounded-lg bg-slate-200"></span>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="flex gap-2 items-center">
        <div className="w-[50px] h-[50px] rounded-full bg-indigo-200"></div>
        <p className="h-2 w-12 rounded-lg bg-slate-200"></p>
      </div>

      <div className="flex w-full cursor-pointer gap-2 items-center justify-start">
        <div className="w-[50px] h-[50px] rounded-sm  bg-indigo-200"></div>
        <p className="h-2 w-8 rounded-lg bg-slate-200"></p>
      </div>
    </div>
  );
};

export const CardsSkeleton = () => {
  return (
    <div className="mb-14 ">
      <Card>
        <CardHeader className="flex justify-between  ">
          <CardTitle className="flex justify-between items-center">
            <div className="flex flex-col gap-2 items-center mb-2">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={"/default-profile.jpg"} />
                </Avatar>
                <p className="text-[20px]  w-[120px] rounded-full h-5 bg-indigo-200"></p>
              </div>
              <p className="text-[20px] justify-start w-12 rounded-full h-5 bg-indigo-200" />
            </div>
            <div>
              <p className="text-[20px] w-[70px] rounded-full h-5 bg-indigo-200" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-start items-center">
          <div className=" h-[500px] w-full bg-indigo-200 rounded-lg "></div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="w-12 h-4 rounded-full bg-slate-200"></div>
          <div className="flex gap-2 items-center cursor-pointer ">
            <p className="text-[16px] rounded-full bg-indigo-200 w-10 h-4 text-gray-400 font-bold text-blue-800"></p>
            <FaEdit size={20} className="text-gray-400 text-idigo-200" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
