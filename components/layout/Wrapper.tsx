"use client";

import React, { useEffect, useState } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import useUserState from "@/store/UserStore";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const getAllUsers = useUserState((state) => state.fetchAllTheUserData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      await getAllUsers();
      setLoading(false);
    }
    fetchUsers();
  }, [getAllUsers]);

  return (
    !loading && (
      <ClerkProvider>
        <SignedIn>{children}</SignedIn>
        <SignedOut>
          <RedirectToSignIn redirectUrl="/sign-in" />
        </SignedOut>
      </ClerkProvider>
    )
  );
};

export default Wrapper;
