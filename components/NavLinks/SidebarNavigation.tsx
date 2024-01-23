"use client";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "./Navlinks";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

const SidebarNavigation = () => {
  const pathname = usePathname();

  return (
    <div
      className="flex flex-col gap-3 
    "
    >
      {sidebarLinks.map((link) => (
        <Link href={link.route} key={link.label}>
          <div
            className={clsx(
              "flex gap-1 items-center justify-start p-1 text-yellow",
              {
                "bg-cyan rounded-md py-2 px-2": pathname === link.route,
              }
            )}
          >
            {link.icon}
            <span className="ml-2 max-xl:hidden ">{link.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarNavigation;
