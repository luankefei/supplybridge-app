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
  allCountries: any;
  setAllCountries: (value: any) => void;
  selectedRegions: any;
  setSelectedRegions: (value: any) => void;
  selectedCountries: any;
  setSelectedCountries: (value: any) => void;
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

      clearFilterData: () =>
        set(() => ({
          page: 1,
          pageSize: 10,
          parts: [],
          subRegions: [],
          selectedRegions: [],
          selectedCountries: [],
          filterData: {
            commodities: [],
            parts: [],
            coreTechnologies: [],
            regions: [],
            subRegions: [],
            vehicleFuelType: null,
            searchTerm: "",
          },
        })),

      allCountries: [["Country", "Selection"]],
      setAllCountries: (allCountries: any) =>
        set(() => ({ allCountries: [...allCountries] })),

      suppliers: [],
      setSuppliers: (suppliers: any, reset: boolean) =>
        set(() => {
          if (reset) {
            return ({ suppliers })  
          }
          return ({ suppliers: [...get().suppliers, ...suppliers] })
        }),

      selectedRegions: [],
      setSelectedRegions: (selectedRegions: any) =>
        set(() => ({ selectedRegions: [...selectedRegions] })),

      selectedCountries: [],
      setSelectedCountries: (selectedCountries: any) =>
        set(() => ({ selectedCountries: [...selectedCountries] })),

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
