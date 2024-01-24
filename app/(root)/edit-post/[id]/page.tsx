"use client";

import { Post } from "@/TS/ActionTypes";
import FormPostEditing from "@/components/forms/FormPostEditing";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();

  const [currentPost, setCurrentPost] = useState<Post | any>({});


  

  useEffect(() => {
    const fetchingPostInfo = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCurrentPost(data);
      } catch (err) {
        console.log("post cant be fetched");
      }
    };

    fetchingPostInfo();
  }, [id]);

  return (
    <div className="h-screen">
      <FormPostEditing postInfo={currentPost} isItEdit={true} />
    </div>
  );
};

export default EditPost;
