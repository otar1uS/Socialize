"use client";

import React, { useEffect } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import useUserState from "@/store/UserStore";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const getAllUsers = useUserState((state) => state.fetchAllTheUserData);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <ClerkProvider>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/sign-in" />
      </SignedOut>
    </ClerkProvider>
  );
};

export default Wrapper;
