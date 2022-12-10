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
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  count: number;
  setCount: (value: number) => void;
  suppliers: any;
  setSuppliers: (value: any) => void;
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

      page: 1,
      setPage: (page: any) => set(() => ({ page })),

      pageSize: 10,
      setPageSize: (pageSize: any) => set(() => ({ pageSize })),

      count: 0,
      setCount: (count: number) => set(() => ({ count })),

      filterData: {
        commodities: [],
        parts: [],
        coreTechnologies: [],
        regions: [],
        subRegions: [],
        vehicleFuelType: null,
        searchTerm: "",
      },
      setFilterData: (data: any) =>
        set(() => ({ filterData: { ...get().filterData, ...data } })),

      suppliers: [],
      setSuppliers: (suppliers: any) =>
        set(() => ({ suppliers: [...get().suppliers, ...suppliers] })),

      signOut: () => {
        StorageService.clearUserData();
        return set(() => ({
          user: {},
          token: "",
          page: 1,
          pageSize: 10,
          count: 0,
          filterData: {
            commodities: [],
            parts: [],
            coreTechnologies: [],
            regions: [],
            subRegions: [],
            vehicleFuelType: null,
            searchTerm: "",
          },
          suppliers: [],
        }));
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
