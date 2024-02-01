"use client";

import { Post } from "@/TS/ActionTypes";

import { create } from "zustand";

interface postState {
  posts: Post[];
  post: Post;
  loading: boolean;

  switcher: boolean;
  switcherLike: boolean;

  getOnePostById: (postId: string) => void;
  getPostsById: (postId: string) => void;
  allPostsFetcher: () => Promise<void>;
  postHandler: (
    url: string,
    method: string,
    body?: { text: string }
  ) => Promise<void>;
  deletePost: (postId: string) => void;
}

const usePostState = create<postState>((set) => ({
  posts: [],
  post: {} as Post,
  loading: false,
  switcher: false,
  switcherLike: false,
  //! async functions------

  //! fetching all posts

  allPostsFetcher: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/posts");

      console.log(response);

      if (!response.ok) {
        throw new Error("something went wrong while fetching all posts");
      }

      const data = await response.json();
      set({ posts: data });
      set({ loading: false });
    } catch (error) {
      console.error(error);
    }
  },

  //! handling post actions

  postHandler: async (url, method, body) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body as unknown as BodyInit,
    });

    if (!response.ok) {
      throw new Error(`something when wrong while trying to ${method} post`);
    }

    if (method === "POST") {
      if (url.split("/").includes("savedPosts")) {
        set((state) => ({ ...state, switcher: !state.switcher }));
      } else {
        set((state) => ({ ...state, switcherLike: !state.switcherLike }));
      }
    }
  },

  // !none async functions------

  //! get one post by id
  getOnePostById: (postId: string) => {
    set((state) => {
      const foundPost = state.posts.find(
        (post) => post._id.toString() === postId
      );
      return { ...state, post: foundPost };
    });
  },

  //! get posts by UserId
  getPostsById: (postId: string) =>
    set((state) => ({
      ...state,
      posts: state.posts.filter((post) => post._id.toString() === postId),
    })),

  //!delete post
  deletePost: (postId: string) =>
    set((state) => {
      const updatedPosts = state.posts.filter(
        (post) => post._id.toString() !== postId
      );
      return { ...state, posts: updatedPosts };
    }),
}));

export default usePostState;
