import { Post, User } from "@/TS/ActionTypes";
import { create } from "zustand";

interface UserState {
  Users: User[];
  loading: boolean;

  fetchAllTheUserData: () => Promise<void>;
  handleFollowing: (user: User, personToFollow: User) => void;
}

const useUserState = create<UserState>((set) => ({
  Users: [],
  loading: false,

  //! async functions------

  //! fetching all users

  fetchAllTheUserData: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/user");

      if (!response.ok) {
        throw new Error("something went wrong while fetching all users");
      }

      const data = await response.json();

      set({ Users: data, loading: false });
    } catch (error: any) {
      set({ loading: false });
    }
  },

  //! none async functions------

  handleFollowing: (user, personToFollow) => {
    set((state) => {
      const isFollowing = user.following.find(
        (item) => item._id === personToFollow._id
      );

      const updatedUsers = state.Users.map((u) => {
        if (u._id === user._id) {
          // Update the user's following list
          u.following = isFollowing
            ? u.following.filter((item) => item._id !== personToFollow._id)
            : [...u.following, personToFollow];
        }

        if (u._id === personToFollow._id) {
          // Update the personToFollow's followers list
          u.followers = isFollowing
            ? u.followers.filter((item) => item._id !== user._id)
            : [...u.followers, user];
        }

        return u;
      });

      return { ...state, Users: updatedUsers };
    });
  },
}));

export default useUserState;
