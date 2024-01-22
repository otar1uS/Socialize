"use client";

import { Cards } from "@/components/layout/Cards";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchingData() {
      try {
        const responsePosts = await fetch("/api/posts");
        const responseUsers = await fetch("/api/users");
        const postsData = await responsePosts.json();
        const usersData = await responseUsers.json();

        setPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchingData();
  }, []);

  return (
    <div className="h-screen">
      <Cards postsData={posts} usersData={users} />
    </div>
  );
};

export default Home;
