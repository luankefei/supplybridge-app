import { StateCreator } from "zustand";
import { logger } from "../middleware";
import { TSupplierModel } from "models/supplier";

// type filterArrays = {
//   industries: any;
//   commodities: any;
//   components: any;
//   coreCompetencies: any;
//   regions: any;
//   subRegions: any;
//   vehicleTypes: any;
//   vehicleBrands: any;
//   vehicleModels: any;
//   vehicleFuelTypes: any;
//   pioneers: any;
//   productionTechnologies: any;
//   offerings: any;
//   certifications: any;
//   tiers: any;
//   headquarters: any;
// };

interface State {
  quickBridge: {
    q: string;
    page: number;
    pageSize: number;
    count: number;
    suppliers: TSupplierModel[];
    filter: any;
    selectedLabel: string;
    tab: {
      activeTab: number;
      tabLabel: string;
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
    setSuppliers: (value: any, reset?: boolean) => void;
    setFilter: (type: FilterType, data: any) => void;
    setExtraFilter: (data: any) => void;
    setTab: (activeTab: number, tabLabel: string) => void;
    setResult: (isResult: boolean) => void;
    setSelectedLabel: (label: string) => void;
  };
}
// By Vehicle: vehicleTypes
// By OEM: vehicleBrands
// By Class: vehicleBrands
// By Segment: vehicleModels
// By Technology: vehicleFuelTypes
// By Commodity: commodities
// By Production Tech: productionTechnologies
// By Pioneer: pioneers
export type FilterType =
  | "vehicleTypes"
  | "vehicleBrands"
  | "vehicleModels"
  | "vehicleFuelTypes"
  | "commodities"
  | "productionTechnologies"
  | "pioneers"
  | "offerings";

export type QuickBridgeSlice = State & Actions;

const initialState = {
  q: "",
  page: 1,
  pageSize: 50,
  count: 0,
  suppliers: [],
  filter: {
    industries: [],
    commodities: [],
    components: [],
    coreCompetencies: [],
    regions: [],
    subRegions: [],
    vehicleTypes: [],
    vehicleBrands: [],
    vehicleModels: [],
    vehicleFuelTypes: [],
    pioneers: [],
    productionTechnologies: [],
    offerings: [],
    certifications: [],
    tiers: [],
    headquarters: [],
  },
  tab: {
    activeTab: 0,
    tabLabel: "",
    isResult: false,
  },
  selectedLabel: "", // in each tab, when user click one item, e.g., OEM/BYD, Segment/C-class, this label need to be saved to be used in search bar in Result component.
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
      setFilter: (type: FilterType, data: any) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            filter: {
              [type]: data == null ? [] : [data],
            },
            page: 1, // Reset the array suppliers with the new data.
            suppliers: [], // Reset the array suppliers with the new data.
          },
        })),
      setExtraFilter: (
        data: any // data: {commodities: [], components: [], regions: [], subRegions: [] }
      ) =>
        set((state = get()) => {
          return {
            ...state,
            quickBridge: {
              ...state.quickBridge,
              filter: {
                ...state.quickBridge.filter,
                ...data,
              },
              page: 1, // Reset the array suppliers with the new data.
              suppliers: [], // Reset the array suppliers with the new data.
            },
          };
        }),
      setTab: (activeTab: number, tabLabel: string) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            tab: {
              ...state.quickBridge.tab,
              tabLabel,
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
      setSuppliers: (suppliers: any, reset = false) =>
        set((state = get()) => {
          if (get().quickBridge.page === 1 || reset) {
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

      setSelectedLabel: (label: string) =>
        set((state = get()) => ({
          ...state,
          quickBridge: {
            ...state.quickBridge,
            selectedLabel: label,
          },
        })),
    },
  }),
  "quick-bridge-slice"
);
