import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

// Common interfaces
interface UserInfo {
  clerkId: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
}

interface PostData {
  creator: UserInfo;
  caption: string;
  createdAt: string;
}

// Shared between CardHeaderComponentProps and AvatarComponentProps
export interface CommonComponentProps {
  isItProfile: boolean;
  userInfo: UserInfo;
  postData: PostData;
  router: NextRouter;
}

// ButtonProps interface
export interface ButtonProps {
  size: string;
  type: "button" | "submit" | "reset";
  className: string;
  children: React.ReactNode;
}

// ClerkUser interface
export interface ClerkUser {
  _id: ObjectId;
  username?: string;
  firstName: string;
  lastName: string;
  posts: string[];
  following: string[];
  followers: string[];
  savedPosts: string[];
  likedPosts: string[];
  clerkId: string;

  profilePhoto?: string;
}

// PostContentArray, SetErrorsProps, ObjectId, DateObject
type PostContent = {
  postPhoto: boolean;
  postPhotoMessage: string;
};

type CaptionContent = {
  caption: boolean;
  captionMessage: string;
};

type TagContent = {
  tag: boolean;
  tagMessage: string;
};

export type PostContentArray = [PostContent, CaptionContent, TagContent];

export type SetErrorsProps = Dispatch<SetStateAction<PostContentArray>>;

type ObjectId = {
  equals(creator: ObjectId): unknown;
  $oid: string;
};

type DateObject = {
  length: any;
  $date: string;
};

// postComments interface
type postComments = {
  _id: ObjectId;
  text: string;
  creator: User;
  createdAt: DateObject;
  replies: postComments[];
};

// Post interface
export type Post = {
  _id: ObjectId;
  creator: ClerkUser;
  caption: string;
  postPhoto: string;
  tag: string;
  likes: string[];
  comments: postComments[];

  createdAt: DateObject;
  __v: number;
};

// Comment interface
export type Comment = {
  text: string;
  creator: User | undefined;
  time: Date;
  postId: string;
};

// User interface
export type User = {
  _id: string;
  clerkId: string;
  __v: number;
  createdAt: string;
  email: string;
  firstName: string;
  followers: User[];
  following: User[];
  lastName: string;
  likedPosts: Post[];
  posts: Post[];
  profilePhoto: string;
  savedPosts: Post[];
  username: string;
};

// CardHeaderComponentProps interface
export interface CardHeaderComponentProps extends CommonComponentProps {
  switcher: boolean;
  postHandler: (url: string, method: string) => void;
  savePostUrl: string;
}

// AvatarComponentProps interface
export interface AvatarComponentProps extends CommonComponentProps {}
