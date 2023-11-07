import create from "zustand";
import { persist } from "zustand/middleware";

import StorageService from "services/storage";
import { TSupplierModel } from "models/supplier";
import { TSubRegionWithCount } from "models/subRegion";
import { IUserFile } from "models/userFile";
import { TUserInfo } from "./storeInterface";
import { EnumSearchType } from "components/scout/scoutResult/types";

interface INonPersistentStore {
  filterData: any;
  setFilterData: (data: any) => void;
  clearFilterData: () => void;
  commodities: any;
  setCommodities: (value: any) => void;
  regions: any;
  setRegions: (value: any) => void;
  page: number;
  mapRegions: any;
  setMapRegions: (mapRegions: any) => void;
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
  countFootprints: number;
  setCountFootprints: (value: number) => void;
  searchType: EnumSearchType;
  setSearchType: (value: EnumSearchType) => void;
  queryString: string;
  setQueryString: (value: string) => void;
  stats: any;
  setStats: (value: any) => void;
  suppliers: TSupplierModel[];
  setSuppliers: (value: TSupplierModel[], reset: boolean) => void;
  userFiles: IUserFile[];
  setUserFiles: (value: any) => void;
  hasNotif: boolean | null;
  setHasNotif: (value: boolean | null) => void;
  resetAll: () => void;
}

const useStore = create<INonPersistentStore>()((set, get) => ({
  flags: {},
  count: 0,
  setCount: (count: number) => set(() => ({ count })),
  countFootprints: 0,
  setCountFootprints: (countFootprints: number) =>
    set(() => ({ countFootprints })),
  stats: {},
  setStats: (stats: number) => set(() => ({ stats })),
  searchType: EnumSearchType.Keywords,
  setSearchType: (searchType: EnumSearchType) => set(() => ({ searchType })),
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

  mapRegions: [],
  setMapRegions: (mapRegions: any) => set(() => ({ mapRegions })),

  page: 0,
  setPage: (page: number) => set(() => ({ page })),

  pageSize: 50,
  setPageSize: (pageSize: number) => set(() => ({ pageSize })),

  filterData: {
    commodities: [],
    components: [],
    coreCompetencies: [],
    regions: [],
    subRegions: [],
    mapRegions: [],
    vehicleFuelTypes: [],
    q: "",
  },
  setFilterData: (data: any) => {
    console.log("------ setting filter data: ", data);
    set(() => ({ filterData: { ...get().filterData, ...data } }));
  },
  showBackdrop: false,
  setShowBackdrop: (showBackdrop: boolean) => set(() => ({ showBackdrop })),

  clearFilterData: () =>
    set(() => ({
      page: 1,
      pageSize: 100,
      components: [],
      mapRegions: [],
      subRegions: [],
      selectedRegions: [],
      selectedCountries: [],
      filterData: {
        commodities: [],
        components: [],
        coreCompetencies: [],
        regions: [],
        subRegions: [],
        mapRegions: [],
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

  userFiles: [],
  setUserFiles: (files) => set(() => ({ userFiles: files })),

  hasNotif: false,
  setHasNotif: (hasNotif: boolean | null) => set(() => ({ hasNotif })),

  /**
   * resets all the store values to default
   */
  resetAll: () => {
    return set(
      (): INonPersistentStore => ({
        ...get(),
        page: 1,
        pageSize: 100,
        count: 0,
        filterData: {
          commodities: [],
          components: [],
          coreCompetencies: [],
          regions: [],
          subRegions: [],
          mapRegions: [],
          vehicleFuelTypes: [],
          q: "",
        },
        suppliers: [],
        flags: {},
      })
    );
  },
}));

interface IPersistentStore {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;

  user: TUserInfo | null;
  setUser: (value: TUserInfo | null) => void;
  /**
   * Signs out the user by clearing the token and user data from local storage
   * and clearing cookies
   */
  signOut: () => void;
  /**
   * All subregions is now a dictionary with key =id, value=subregion
   */
  allSubRegions: Record<number, TSubRegionWithCount>;
  allSubRegionsLastUpdatedTime: number;
  setAllSubRegions: (value: TSubRegionWithCount[]) => void;
}
const usePersistentStore = create<IPersistentStore>()(
  persist<IPersistentStore>(
    (set, get) => ({
      /** UI related */
      collapsed: false,
      setCollapsed: (c) => set(() => ({ collapsed: c })),

      /** USER related info */
      user: null,
      setUser: (value) => set(() => ({ user: value })),
      /**
       * Dont' forget to resetAll() on useStore()!
       */
      signOut: () => {
        StorageService.clearUserData();
        return set(() => ({
          user: null,
          token: "",
        }));
      },
      /** GENERAL App Info */
      allSubRegions: {},
      allSubRegionsLastUpdatedTime: 0,
      setAllSubRegions: (regions: TSubRegionWithCount[]) => {
        const newAllSubRegions: Record<number, TSubRegionWithCount> = {};
        regions.forEach((subRegion) => {
          newAllSubRegions[subRegion.id] = subRegion;
        });
        set(() => ({
          allSubRegions: newAllSubRegions,
          allSubRegionsLastUpdatedTime: Date.now(),
        }));
      },
    }),

    {
      name: "supply-storage",
      getStorage: () => localStorage,
    }
  )
);

export { useStore, usePersistentStore };
export default useStore;
