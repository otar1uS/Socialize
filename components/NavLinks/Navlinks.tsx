import { CiHome as HomeIcon } from "react-icons/ci";
import {
  MdAddPhotoAlternate as AddPhotoIcon,
  MdGroups as GroupsIcon,
} from "react-icons/md";
import { IoBookmarksOutline as BookmarkIcon } from "react-icons/io5";
import { MdFavoriteBorder as FavoriteIcon } from "react-icons/md";
import { MessageIcon } from "@/lib/Utilities/IconsStore";

const sidebarLinks = [
  {
    icon: <HomeIcon size={24} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <AddPhotoIcon scale={24} />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <MessageIcon scale={24} />,
    route: "/messages",
    label: "Messages",
  },
  {
    icon: <GroupsIcon size={24} />,
    route: "/people",
    label: "People",
  },
  {
    icon: <BookmarkIcon size={24} />,
    route: "/saved-posts",
    label: "Saved Posts",
  },
  {
    icon: <FavoriteIcon size={24} />,
    route: "/liked-posts",
    label: "Liked Posts",
  },
];

const pageTitles = [
  {
    url: "/",
    title: "Feed",
  },
  {
    url: "/edit-profile",
    title: "Edit Profile",
  },
  {
    url: "/messages",
    title: "Messages",
  },
  {
    url: "/create-post",
    title: "Create Post",
  },
  {
    url: "/edit-post",
    title: "Edit Post",
  },
  {
    url: "/search",
    title: "Search",
  },

  {
    url: "/saved-posts",
    title: "Saved Posts",
  },
  {
    url: "/liked-posts",
    title: "Liked Posts",
  },
];

export { sidebarLinks, pageTitles };
