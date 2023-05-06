import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
  quickBridgeService: {
    data: any;
    selected: any;
  };
}

interface Actions {
  quickBridgeService: {
    setData: (data: any) => void;
    setSelected: (id: any) => void;
  };
}

export type ServiceSlice = State & Actions;

const initialState = {
  data: null,
  selected: null,
};

export const createServiceSlice: StateCreator<ServiceSlice, [], [], ServiceSlice> =
  logger(
    (set, get) => ({
      quickBridgeService: {
        ...initialState,
        setData: (data: any) =>
          set((state = get()) => ({
            ...state,
            quickBridgeService: {
              ...state.quickBridgeService,
              data: [...data],
            },
          })),
        setSelected: (id: any) =>
          set((state = get()) => ({
            ...state,
            quickBridgeService: {
              ...state.quickBridgeService,
              selected: id,
            },
          })),
      },
    }),
    "quick-bridge-services"
  );
