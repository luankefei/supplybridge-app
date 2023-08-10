import create from "zustand";
import { persist } from "zustand/middleware";

import StorageService from "services/storage";
import { TSupplierModel } from "models/supplier";
import { TSubRegionWithCount } from "models/subRegion";

interface INonPersistentStore {
  filterData: any;
  setFilterData: (data: any) => void;
  clearFilterData: () => void;
  commodities: any;
  setCommodities: (value: any) => void;
  regions: any;
  setRegions: (value: any) => void;
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  components: [];
  setComponents: (components: any) => void;
  industries: any;
  setIndustries: (value: any) => void;
  vehicleFuelTypes: any;
  setVehicleFuelTypes: (value: any) => void;
  allCountries: any;
  setAllCountries: (value: any) => void;
  selectedRegions: any;
  setSelectedRegions: (value: any) => void;
  subRegions: any;
  setSubRegions: (value: any) => void;
  selectedCountries: any;
  setSelectedCountries: (value: any) => void;
  showBackdrop: boolean;
  setShowBackdrop: (value: any) => void;
  flags: any;
  count: number;
  setCount: (value: number) => void;
  queryString: string;
  setQueryString: (value: string) => void;
  stats: any;
  setStats: (value: any) => void;
  suppliers: TSupplierModel[];
  setSuppliers: (value: TSupplierModel[], reset: boolean) => void;
}

const useStore = create<INonPersistentStore>()((set, get) => ({
  count: 0,
  setCount: (count: number) => set(() => ({ count })),
  stats: {},
  setStats: (stats: number) => set(() => ({ stats })),
  queryString: "",
  setQueryString: (queryString: string) => set(() => ({ queryString })),
  suppliers: [],
  setSuppliers: (suppliers: TSupplierModel[], reset: boolean) =>
    set(() => {
      if (reset) {
        return { suppliers };
      }
      return { suppliers: [...get().suppliers, ...suppliers] };
    }),
  commodities: [],
  setCommodities: (commodities: any) => set(() => ({ commodities })),

  components: [],
  setComponents: (components: any) => set(() => ({ components })),

  regions: [],
  setRegions: (regions: any) => set(() => ({ regions })),

  subRegions: [],
  setSubRegions: (subRegions: any) => set(() => ({ subRegions })),

  page: 1,
  setPage: (page: any) => set(() => ({ page })),

  pageSize: 100,
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
      pageSize: 100,
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
      pageSize: 100,
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
}));

interface IPersistentStore {
  token: any;
  setToken: (value: any) => void;
  user: any;
  setUser: (value: any) => void;
  signOut: () => void;
  /**
   * All subregions is now a dictionary with key =id, value=subregion
   */
  allSubRegions: Record<number, TSubRegionWithCount>;
  setAllSubRegions: (value: TSubRegionWithCount[]) => void;
}
const usePersistentStore = create<IPersistentStore>()(
  persist<IPersistentStore>(
    (set, get) => ({
      token: "",
      setToken: (value: any) => set(() => ({ token: value })),
      user: {},
      setUser: (value: any) => set(() => ({ user: value })),
      signOut: () => {
        StorageService.clearUserData();
        return set(() => ({
          user: {},
          token: "",
        }));
      },
      allSubRegions: {},
      setAllSubRegions: (regions: TSubRegionWithCount[]) => {
        const newAllSubRegions: Record<number, TSubRegionWithCount> = {};
        regions.forEach((subRegion) => {
          newAllSubRegions[subRegion.id] = subRegion;
        });
        set(() => ({ allSubRegions: newAllSubRegions }));
      },
    }),

    {
      name: "supply-storage",
      getStorage: () => localStorage,
    }
  )
);

export { useStore, usePersistentStore };
