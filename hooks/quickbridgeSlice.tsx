import { StateCreator } from "zustand";
import { logger } from "./middleware";


type filterArrays={
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
}
interface State {
  quickbridge: {
    q: string,
    page: number;
    pageSize: number;
    count: number;
    suppliers: any;
    filter: filterArrays;
  };
}

interface Actions {
  quickbridge: {
    setQ: (q: string)=>void
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setCount: (count: number) => void;
    setSuppliers: (value: any) => void;
    setFilter: (type:string, data:[])=>void
  };
}

export type quickbridgeSlice = State & Actions;

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
  }
};



export const createQuickbridgeSlice: StateCreator<
  quickbridgeSlice,
  [],
  [],
  quickbridgeSlice
> = logger(
  (set, get) => ({
    quickbridge: {
      ...initialState,
      setQ: (q:string)=>set((state= get())=>({
        ...state,
        quickbridge: {
            ...state.quickbridge,
            q
        }
      })),
      setPage: (page: number) =>
        set((state = get()) => ({
          ...state,
          quickbridge: {
            ...state.quickbridge,
            page,
          },
        })),
      setPageSize: (pageSize: number) =>
        set((state = get()) => ({
          ...state,
          quickbridge: {
            ...state.quickbridge,
            pageSize,
          },
        })),
      setCount: (count: number) =>
        set((state = get()) => ({
          ...state,
          quickbridge: {
            ...state.quickbridge,
            count,
          },
        })),
      setFilter:(type:string, data:[])=> set((state=get())=>({
     ...state,
     quickbridge: {
        ...state.quickbridge,
        filter: {
            ...state.quickbridge.filter,
            [type]: data
        },
     }
      })),
      setSuppliers: (suppliers: any) => set((state = get()) => {
          if (get().quickbridge.page === 1) {
            return {
              ...state,
              quickbridge: {
                ...state.quickbridge,
                suppliers: [...suppliers],
              },
            };
          }
          return {
            ...state,
            quickbridge: {
              ...state.quickbridge,
              suppliers: [...get().quickbridge.suppliers, ...suppliers],
            },
          };
        }),
    },
  }),
  "quickbridge-slice"
);
