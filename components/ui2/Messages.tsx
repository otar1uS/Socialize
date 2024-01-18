"use client";
import { useState } from "react";

import {
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Messages = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className=" absolute bottom-0  z-50 w-96 py-4 h-auto border-[1px] border-b-[0px] bg-black rounded-tl-md rounded-tr-md  ">
      <div
        onClick={() => setOpen((e: boolean) => !e)}
        className="flex justify-between items-center px-3 py-1 cursor-pointer"
      >
        <h1 className="text-xl font-bold">Messages</h1>
        {open ? (
          <KeyboardDoubleArrowDown sx={{ fontSize: "30px" }} />
        ) : (
          <KeyboardDoubleArrowUp sx={{ fontSize: "30px" }} />
        )}
      </div>

      <div
        className={`overflow-auto  w-full flex flex-col  justify-start ${
          open ? "msg-open-transition" : "msg-close-transition"
        } `}
      >
        <div className="flex items-center justify-start mt-3 gap-3 px-3 cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>OP</AvatarFallback>
          </Avatar>

          <p className="text-white text-md">otari</p>
          <p className="text-indigo-200 text-sm">21/02/2023</p>
        </div>
      </div>
    </div>
  );
};
