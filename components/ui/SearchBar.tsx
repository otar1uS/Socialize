"use client";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleClick = () => {
    router.replace(`/search/posts/${query}`);
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      router.replace(`/search/posts/${query}`);
    }
  };

  return (
    <div className="relative   flex shrink max-w-96 gap-3  flex-wrap sm:flex-nowrap justify-center items-center">
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        className="relative m-0 block flex-auto py-1 sm:py-2 rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3  text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2"
        value={query}
        onKeyDown={handleKeyPress}
      />

      <SearchIcon
        onClick={handleClick}
        className="sm:w-[30px] w-[24px]  cursor-pointer"
      />
    </div>
  );
};
