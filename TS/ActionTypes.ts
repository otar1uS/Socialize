import { Dispatch, SetStateAction } from "react";

export interface ButtonProps {
  size: string;
  type: "button" | "submit" | "reset";
  className: string;
  children: React.ReactNode;
}

export interface ClerkUser {
  _id: ObjectId;
  username?: string;
  firstName: string;
  lastName: string;
  posts: string[];
  following: string[];
  followers: string[];

  profilePhoto?: string;
}
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
  $date: string;
};

export type Post = {
  _id: ObjectId;
  creator: ClerkUser;
  caption: string;
  postPhoto: string;
  tag: string;
  likes: string[];
  createdAt: DateObject;
  __v: number;
};
