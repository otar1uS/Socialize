import { Types } from "mongoose";

import { Dispatch, SetStateAction } from "react";

// Common interfaces
interface UserInfo {
  clerkId: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  username: string;
}

interface PostData {
  creator: UserInfo;
  caption: string;
  createdAt: string;
}

// Shared between CardHeaderComponentProps and AvatarComponentProps
export interface CommonComponentProps {
  isItProfile?: boolean;
  userInfo?: UserInfo;
  postData: Post;
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
  commentId?: string;
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
  chats: IChat[];
};

// CardHeaderComponentProps interface
export interface CardHeaderComponentProps extends CommonComponentProps {
  postHandler: (url: string, method: string) => void;
  userId: string;
  isItSavedPost: string;
}

// AvatarComponentProps interface
export interface AvatarComponentProps extends CommonComponentProps {}

export interface commentPosterProps {
  postId: any;
  commentId?: string;

  clerkId?: string;
  isItComment: boolean;
}

export type commentPosterHandlerProps =
  | React.KeyboardEvent<HTMLInputElement>
  | React.MouseEvent<HTMLButtonElement>;

export interface commentProps {
  username: string;
  time: string;
  text: string;
  picture: string;
  clerkId: string;
  commentId: string;
  postId: string;
}

export interface CommentUIProps {
  username: string;
  time: string;
  text: string;
  picture: string;
  clerkId: string;
  setShowReply: Dispatch<SetStateAction<boolean>>;
  isItReplay: boolean;
  replayCount?: number;
}

export interface IMessage {
  sender: Types.ObjectId;
  content: string;
  timestamp?: Date;
}

export interface IChat {
  _id: Types.ObjectId;

  partner: Types.ObjectId;
  messages: IMessage[];
}

export interface IUser {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePhoto: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  posts: Types.ObjectId[];
  savedPosts: Types.ObjectId[];
  likedPosts: Types.ObjectId[];
  createdAt?: Date;
  chats: IChat[];
}

export interface IUserDocument extends IUser, Document {}

export interface IChatDocument extends IChat, Document {}

export interface IMessageDocument extends IMessage, Document {}

export interface data {
  user: string;
  partnerId: string;
  textMessage: string;
}
