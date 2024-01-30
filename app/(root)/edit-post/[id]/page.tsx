"use client";

import { Post } from "@/TS/ActionTypes";
import FormPostEditing from "@/components/forms/FormPostEditing";
import usePostState from "@/store/PostsStore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();

  const currentPost = usePostState((state) =>
    state.posts.find((post) => post._id.toString() === id)
  );

  return (
    <div className="h-screen">
      <FormPostEditing postInfo={currentPost} isItEdit={true} />
    </div>
  );
};

export default EditPost;
