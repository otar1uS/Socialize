import { User } from "@/TS/ActionTypes";
import { SetStateAction } from "react";

export const followUnfollowFunction = async (
  userId: string | undefined,
  whoToFollowId: string | undefined,
  setUserStats: SetStateAction<any>
) => {
  try {
    const response = await fetch(
      `/api/user/${userId}/follow/${whoToFollowId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setUserStats(data);
  } catch (error) {
    console.error("Fetch request failed:", error);
  }
};
