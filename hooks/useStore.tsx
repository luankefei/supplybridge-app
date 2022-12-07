import create from "zustand";
import { persist } from "zustand/middleware";

import StorageService from "services/storage";

interface Store {
  user: any;
  setUser: (value: any) => void;
  commodities: any;
  setCommodities: (value: any) => void;
  regions: any;
  setRegions: (value: any) => void;
}

const useStore = create<Store | any>(
  persist(
    (set, get) => ({
      token: "",
      setToken: (value: any) => set(() => ({ token: value })),

      user: {},
      setUser: (value: any) => set(() => ({ user: value })),

      commodities: [],
      setCommodities: (commodities: any) => set(() => ({ commodities })),

      parts: [],
      setParts: (parts: any) => set(() => ({ parts })),

      regions: [],
      setRegions: (regions: any) => set(() => ({ regions })),

      subRegions: [],
      setSubRegions: (subRegions: any) => set(() => ({ subRegions })),

      filterData: {
        commodities: [],
        parts: [],
        coreTechnologies: [],
        regions: [],
        subRegions: [],
        vehicleFuelType: null,
        searchTerm: ""
      },
      setFilterData: (data: any) => set(() => ({ filterData: {...get().filterData, ...data} })),
      
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
