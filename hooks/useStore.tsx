import create from "zustand";
import { persist } from "zustand/middleware";

import StorageService from "utils/storage";

interface Store {
  user: any;
  setUser: (value: any) => void;
}

const useStore = create<Store | any>(
  persist(
    (set) => ({
      token: "",
      setToken: (value: any) => set(() => ({ token: value })),

      user: {},
      setUser: (value: any) => set(() => ({ user: value })),
      
      signOut: () => {
        StorageService.clearUserData();
        return set(() => ({ user: {}, token: "" }));
      },
    }),
    {
      name: "supply-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);

export default useStore;
