import { StateCreator } from "zustand";
import { logger } from "../middleware";

type filterArrays = {
  industries: any;
  vehicleFuelTypes: any;
  segments: any;
  commodities: any;
  components: any;
  coreCompetencies: any;
  regions: any;
  subRegions: any;
  vehicleBrands: any;
  vehicleModels: any;
  pioneers: any;
  productionTechnologies: any;
  offerings: any;
  certifications: any;
  tiers: any;
  headquarters: any;
};
interface State {
  quickBridge: {
    q: string;
    page: number;
    pageSize: number;
    count: number;
    suppliers: any;
    filter: filterArrays;
    tab: {
      activeTab: number;
      isResult: boolean;
    };
  };
}

interface Actions {
  quickBridge: {
    setQ: (q: string) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setCount: (count: number) => void;
    setSuppliers: (value: any) => void;
    setFilter: (type: string, data: []) => void;
    setTab: (activeTab: number) => void;
    setResult: (isResult: boolean) => void;
  };
}

export type QuickBridgeSlice = State & Actions;

const initialState = {
  q: "",
  page: 1,
  pageSize: 4,
  count: 0,
  suppliers: [],
  filter: {
    industries: [],
    vehicleFuelTypes: [],
    segments: [],
    commodities: [],
    components: [],
    coreCompetencies: [],
    regions: [],
    subRegions: [],
    vehicleBrands: [],
    vehicleModels: [],
    pioneers: [],
    productionTechnologies: [],
    offerings: [],
    certifications: [],
    tiers: [],
    headquarters: [],
  },
  tab: {
    activeTab: 0,
    isResult: false,
  },
};

export const createQuickBridgeSlice: StateCreator<
  QuickBridgeSlice,
  [],
  [],
  QuickBridgeSlice
> = logger(
  (set, get) => ({
    quickBridge: {
      ...initialState,
      setQ: (q: string) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            q,
          },
        })),
      setPage: (page: number) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            page,
          },
        })),
      setPageSize: (pageSize: number) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            pageSize,
          },
        })),
      setCount: (count: number) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            count,
          },
        })),
      setFilter: (type: string, data: []) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            filter: {
              ...state.quickBridge.filter,
              [type]: data,
            },
          },
        })),
      setTab: (activeTab: number) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            tab: {
              ...state.quickBridge.tab,
              activeTab: activeTab,
            },
          },
        })),
      setResult: (isResult: boolean) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            tab: {
              ...state.quickBridge.tab,
              isResult: isResult,
            },
          },
        })),
      setSuppliers: (suppliers: any) =>
        set((state = get()) => {
          if (get().quickBridge.page === 1) {
            return {
              ...state,
              quickBridge: {
                ...state.quickBridge,
                suppliers: [...suppliers],
              },
            };
          }
          return {
            ...state,
            quickBridge: {
              ...state.quickBridge,
              suppliers: [...get().quickBridge.suppliers, ...suppliers],
            },
          };
        }),
    },
  }),
  "quick-bridge-slice"
);
