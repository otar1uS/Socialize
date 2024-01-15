"use client";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "./Navlinks";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

const SidebarNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3">
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
              <span className="ml-2">{link.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarNavigation;
