"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { onSubmit } from "./onSubmit";
import { useRouter } from "next/navigation";
import { Post } from "@/TS/ActionTypes";

export default function FormPostEditing({
  postInfo = {
    _id: "",
  } as any,
  isItEdit = false,
}: {
  postInfo?: Post;
  isItEdit?: boolean;
}) {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState([
    { postPhoto: false, postPhotoMessage: "" },
    { caption: false, captionMessage: "" },
    { tag: false, tagMessage: "" },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  //photo handling
  const [currentImage, setCurrentImage] = useState<string>("");
  // caption handling

  const [captionValue, setCaptionValue] = useState<string>("");

  // tag handling
  const [tagValue, setTagValue] = useState<string>("");

  useEffect(() => {
    if (!postInfo._id) return;
    setCurrentImage(postInfo.postPhoto || "");
    setCaptionValue(postInfo.caption || "");
    setTagValue(postInfo.tag || "");
  }, [postInfo]);

  useEffect(() => {
    !currentImage && setCurrentImage(postInfo?.postPhoto);
  }, [currentImage, postInfo?.postPhoto]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCurrentImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      className=" p-8 rounded-md bg-gray flex flex-col gap-7 pb-24"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onSubmit(
          event,
          setIsLoading,
          setErrors as any,
          user,
          router,
          isItEdit,

          postInfo._id as any
        );
      }}
    >
      <label
        htmlFor="photo"
        className="flex gap-4 items-center text-[#d97706] cursor-pointer"
      >
        {currentImage && (
          <Image
            src={currentImage}
            alt="post"
            height={200}
            width={250}
            className="object-cover rounded-lg"
          />
        )}

        <MdOutlineAddPhotoAlternate
          size={70}
          onClick={() => fileInputRef.current?.click()}
        />

        <p onClick={() => fileInputRef.current?.click()} className="relative">
          Upload a photo
        </p>
      </label>

      {errors[0].postPhoto && (
        <p className="text-red-500">{errors[0].postPhotoMessage}</p>
      )}
      <input
        type="file"
        onChange={handleImageUpload}
        ref={fileInputRef}
        name="photo"
        className="hidden absolute "
      />

      <div>
        <label htmlFor="caption" className="text-[#d97706]">
          Caption
        </label>
        <textarea
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCaptionValue(event.target.value);
          }}
          value={captionValue}
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
          value={tagValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTagValue(event.target.value);
          }}
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

      <Button type="submit" className="bg-black">
        {isLoading ? "Loading..." : "Publish"}
      </Button>
    </form>
  );
}
