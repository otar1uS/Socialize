import { create } from "zustand";

interface followersState {
  curUserFollowers: number;

  increaseFollowers: () => void;

  decreaseFollowers: () => void;
}

const userFollowersState = create<followersState>((set) => ({
  curUserFollowers: 0,

  increaseFollowers: () =>
    set((state) => ({ curUserFollowers: state.curUserFollowers + 1 })),
  decreaseFollowers: () =>
    set((state) => ({ curUserFollowers: state.curUserFollowers - 1 })),
}));

export default userFollowersState;
