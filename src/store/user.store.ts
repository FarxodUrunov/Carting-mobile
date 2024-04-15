import { create } from "zustand";
import { User } from "_/user";
interface UserState {
  user: User | null;
  users: User[] | [];
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUsers: () => void;
}

export const useUser = create<UserState>((set, get) => ({
  user: null,
  users: [],
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  fetchUsers: async () => {
    
  },
}));
