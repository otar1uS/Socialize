import {
  Home,
  GroupOutlined,
  BookmarksOutlined,
  FavoriteBorder,
  AddToPhotosOutlined,
} from "@mui/icons-material";

const sidebarLinks = [
  {
    icon: <Home sx={{ color: "white", fontSize: "24px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <AddToPhotosOutlined sx={{ color: "white", fontSize: "24px" }} />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <GroupOutlined sx={{ color: "white", fontSize: "24px" }} />,
    route: "/people",
    label: "People",
  },
  {
    icon: <BookmarksOutlined sx={{ color: "white", fontSize: "24px" }} />,
    route: "/saved-posts",
    label: "Saved Posts",
  },
  {
    icon: <FavoriteBorder sx={{ color: "white", fontSize: "24px" }} />,
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
