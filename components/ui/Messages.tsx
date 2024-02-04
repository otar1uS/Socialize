"use client";
import { useState } from "react";

import {
  MdOutlineKeyboardDoubleArrowDown as ArrowDownIcon,
  MdOutlineKeyboardDoubleArrowUp as ArrowUpIcon,
} from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";
import useUserState from "@/store/UserStore";
import { useUser } from "@clerk/nextjs";

export const Messages = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const users = useUserState((state) =>
    state.Users.filter((u) => u.clerkId !== user?.id)
  );

  return (
    <div className=" absolute bottom-0  z-50 w-96 py-4 h-auto border-[1px] border-b-[0px] bg-black rounded-tl-md rounded-tr-md  ">
      <div
        onClick={() => setOpen((e: boolean) => !e)}
        className="flex justify-between items-center px-3 py-1 cursor-pointer"
      >
        <h1 className="text-xl font-bold">Messages</h1>
        {open ? <ArrowDownIcon size={30} /> : <ArrowUpIcon size={30} />}
      </div>

      <div
        className={`overflow-auto  w-full flex flex-col  justify-start ${
          open ? "msg-open-transition" : "msg-close-transition"
        } `}
      >
        {users?.map((u, index) => {
          return (
            <div
              key={index}
              className="flex items-center  border-b-[1px_gray] justify-start mt-3 gap-3 px-3 cursor-pointer"
            >
              <Avatar>
                <AvatarImage src={u.profilePhoto} />
                <AvatarFallback>
                  {u.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <p className="text-white text-md">{u.username}</p>
              {/* <p className="text-indigo-200 text-sm">21/02/2023</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
