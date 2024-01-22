"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { onSubmit } from "./onSubmit";
import { useRouter } from "next/navigation";

export default function FormPostEditing() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState([
    { postPhoto: false, postPhotoMessage: "" },
    { caption: false, captionMessage: "" },
    { tag: false, tagMessage: "" },
  ]);

  return (
    <form
      className=" p-8 rounded-md bg-gray flex flex-col gap-7 pb-24"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onSubmit(event, setIsLoading, setErrors as any, user, router);
      }}
    >
      <label
        htmlFor="photo"
        className="flex gap-4 items-center text-[#d97706] cursor-pointer"
      >
        {false && (
          <Image
            src={""}
            alt="post"
            width={250}
            height={200}
            className="object-cover rounded-lg"
          />
        )}

        <MdOutlineAddPhotoAlternate size={70} />

        <p>Upload a photo</p>
      </label>
      <input type="file" name="photo" className="" />

      {errors[0].postPhoto && (
        <p className="text-red-500">{errors[0].postPhotoMessage}</p>
      )}

      <div>
        <label htmlFor="caption" className="text-[#d97706]">
          Caption
        </label>
        <textarea
          name="caption"
          rows={3}
          placeholder="What's on your mind?"
          className="w-full 
          
          rounded-md p-2 bg-black text-white
          border-black
          focus:border-cyan
          border-2
          outline-none"
        />

        {errors[1].caption && (
          <p className="text-red-500">{errors[1].captionMessage}</p>
        )}
      </div>

      <div>
        <label htmlFor="tag" className="text-[#d97706]">
          Tag
        </label>
        <input
          name="tag"
          placeholder="#tag"
          className="w-full input 
        rounded-md p-2 bg-black text-white
        border-black
        focus:border-cyan
        border-2
        outline-none
        "
        />

        {errors[2].tag && (
          <p className="text-red-500">{errors[2].tagMessage}</p>
        )}
      </div>

      <Button size={"lg"} type="submit" className="bg-black">
        {isLoading ? "Loading..." : "Post"}
      </Button>
    </form>
  );
}
