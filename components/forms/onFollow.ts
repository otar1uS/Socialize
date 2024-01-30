export const followUnfollowFunction = async (
  userId: string | undefined,
  whoToFollowId: string | undefined
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
  } catch (error) {
    console.error("Fetch request failed:", error);
  }
};
