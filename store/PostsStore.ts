"use client";

import { Comment, Post, User } from "@/TS/ActionTypes";
import { create } from "zustand";

interface postState {
  posts: Post[];
  post: Post;
  loading: boolean;

  switcher: boolean;
  switcherLike: boolean;

  allPostsFetcher: () => Promise<void>;
  postHandler: (
    url: string,
    method: string,
    body?: { text: string }
  ) => Promise<void>;
  addComment: (Data: Comment) => void;
  addReplies: (Data: Comment) => void;
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

      if (!response.ok) {
        throw new Error("something went wrong while fetching all posts");
      }

      const data = await response.json();

      console.log(data);

      console.log(response);
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
      body: JSON.stringify(body) as unknown as BodyInit,
    });

    if (!response.ok) {
      throw new Error(`something when wrong while trying to ${method} post`);
    }

    if (method === "POST") {
      if (url.split("/").includes("savedPosts")) {
        set((state) => {
          const updatedPosts = state.posts.map((p) => {
            p.creator.savedPosts = p.creator.savedPosts.filter(
              (id) => id !== p._id.toString()
            );
            return p;
          });
          return {
            ...state,
            switcher: !state.switcher,
            posts: updatedPosts,
          };
        });
      } else if (url.split("/").includes("likedPosts")) {
        set((state) => {
          const updatedPosts = state.posts.map((p) => {
            p.creator.likedPosts = p.creator.likedPosts.filter(
              (id) => id !== p._id.toString()
            );
            return p;
          });
          return {
            ...state,
            switcherLike: !state.switcherLike,
            posts: updatedPosts,
          };
        });
      }
    }
  },

  // !none async functions------

  //!add comment

  addComment: (data: Comment) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id.toString() === data.postId) {
          post.comments.push({
            _id: data.postId as any,
            text: data.text,
            creator: data.creator as User,
            createdAt: data.time as any,
            replies: [],
          });
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    }),
  addReplies: (data: Comment) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id.toString() === data.postId) {
          post.comments.map((c) => {
            if (c._id.toString() === data.commentId) {
              c.replies.push({
                _id: data.postId as any,
                text: data.text,
                creator: data.creator as User,
                createdAt: data.time as any,
                replies: [],
              });
            }
          });
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    }),

  //!delete post
  deletePost: (postId: string) =>
    set((state) => {
      const updatedPosts = state.posts.filter(
        (post) => post._id.toString() !== postId
      );
      return { ...state, posts: updatedPosts };
    }),
}));

export const usePosts = () => usePostState((state) => state.posts);
export const useDeletePost = () => usePostState((state) => state.deletePost);
export const usePostHandler = () => usePostState((state) => state.postHandler);
export const useSwitcher = () => usePostState((state) => state.switcher);
export const useSwitcherLike = () =>
  usePostState((state) => state.switcherLike);
export const useAllPostsFetcher = () =>
  usePostState((state) => state.allPostsFetcher);
export const useAddComment = () => usePostState((state) => state.addComment);
export const useAddReplies = () => usePostState((state) => state.addReplies);
export const useLoading = () => usePostState((state) => state.loading);

export default usePostState;
