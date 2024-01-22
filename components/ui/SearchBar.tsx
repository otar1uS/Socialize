import { IoIosSearch as SearchIcon } from "react-icons/io";
import React from "react";

export const SearchBar = () => {
  return (
    <div className="relative   flex max-w-96 gap-3 flex-nowrap justify-center items-center">
      <input
        type="search"
        className="relative m-0 block flex-auto py-2 rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3  text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2"
      />

      <SearchIcon size={30} />
    </div>
  );
};
