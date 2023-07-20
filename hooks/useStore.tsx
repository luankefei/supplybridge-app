import create from "zustand";
import { persist } from "zustand/middleware";

import StorageService from "services/storage";
import { TSupplierModel } from "models/supplier";

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
  stats: any;
  setStats: (value: any) => void;
  industries: any;
  setIndustries: (value: any) => void;
  vehicleFuelTypes: any;
  setVehicleFuelTypes: (value: any) => void;
  allCountries: any;
  setAllCountries: (value: any) => void;
  selectedRegions: any;
  setSelectedRegions: (value: any) => void;
  allSubRegions: any;
  setAllSubRegions: (value: any) => void;
  selectedCountries: any;
  setSelectedCountries: (value: any) => void;
  showBackdrop: boolean;
  setShowBackdrop: (value: any) => void;
  flags: any;
}

interface INonPersistentStore {
  count: number;
  setCount: (value: number) => void;
  stats: any;
  setStats: (value: any) => void;
  suppliers: TSupplierModel[];
  setSuppliers: (value: TSupplierModel[], reset: boolean) => void;
}

const useNonPersistentStore = create<INonPersistentStore>((set, get) => ({
  count: 0,
  setCount: (count: number) => set(() => ({ count })),
  stats: {},
  setStats: (stats: number) => set(() => ({ stats })),
  suppliers: [],
  setSuppliers: (suppliers: TSupplierModel[], reset: boolean) =>
    set(() => {
      if (reset) {
        return { suppliers };
      }
      return { suppliers: [...get().suppliers, ...suppliers] };
    }),
}));

const usePersistentStore = create<Store | any>(
  persist(
    (set, get) => ({
      token: "",
      setToken: (value: any) => set(() => ({ token: value })),

      user: {},
      setUser: (value: any) => set(() => ({ user: value })),

      commodities: [],
      setCommodities: (commodities: any) => set(() => ({ commodities })),

      components: [],
      setComponents: (components: any) => set(() => ({ components })),

      regions: [],
      setRegions: (regions: any) => set(() => ({ regions })),

      subRegions: [],
      setSubRegions: (subRegions: any) => set(() => ({ subRegions })),
      allSubRegions: [],
      setAllSubRegions: (allSubRegions: any) => set(() => ({ allSubRegions })),
      page: 1,
      setPage: (page: any) => set(() => ({ page })),

      pageSize: 10,
      setPageSize: (pageSize: any) => set(() => ({ pageSize })),

      filterData: {
        commodities: [],
        components: [],
        coreCompetencies: [],
        regions: [],
        subRegions: [],
        vehicleFuelTypes: [],
        q: "",
      },
      setFilterData: (data: any) => {
        console.log("setting filter data: ", data);
        set(() => ({ filterData: { ...get().filterData, ...data } }));
      },
      showBackdrop: false,
      setShowBackdrop: (showBackdrop: boolean) => set(() => ({ showBackdrop })),

      clearFilterData: () =>
        set(() => ({
          page: 1,
          pageSize: 10,
          components: [],
          subRegions: [],
          selectedRegions: [],
          selectedCountries: [],
          filterData: {
            commodities: [],
            components: [],
            coreCompetencies: [],
            regions: [],
            subRegions: [],
            vehicleFuelTypes: [],
            q: "",
          },
        })),

      allCountries: [["Country", "Selection"]],
      setAllCountries: (allCountries: any) =>
        set(() => ({ allCountries: [...allCountries] })),

      suppliers: [],
      setSuppliers: (suppliers: any, reset: boolean) =>
        set(() => {
          if (reset) {
            return { suppliers };
          }
          return { suppliers: [...get().suppliers, ...suppliers] };
        }),

      industries: [],
      setIndustries: (industries: any) =>
        set(() => ({ industries: [...industries] })),

      vehicleFuelTypes: [],
      setVehicleFuelTypes: (vehicleFuelTypes: any) =>
        set(() => ({ vehicleFuelTypes: [...vehicleFuelTypes] })),

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
            components: [],
            coreCompetencies: [],
            regions: [],
            subRegions: [],
            vehicleFuelTypes: [],
            q: "",
          },
          suppliers: [],
        }));
      },
      flags: {},
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

export { usePersistentStore, useNonPersistentStore };
