"use client";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "../NavLinks/Navlinks";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky flex bottom-0 z-20 w-full bg-dark px-6 py-3 items-center justify-between md:hidden">
      {sidebarLinks.map((link) => {
        return (
          <Link href={link.route} key={link.label}>
            <div
              className={clsx(
                { "bg-cyan-300 rounded-full ": pathname === link.route },
                "flex gap-1 items-center justify-start p-1  text-yellow "
              )}
            >
              {link.icon}
              <span className="ml-2 hidden ">{link.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;
