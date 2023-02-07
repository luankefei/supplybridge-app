import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    quickBridgeCommodities: {
        data: any,
        selected: any,
    }
}

interface Actions {
    quickBridgeCommodities: {
        setData: (data: any) => void;
        setSelected: (id: any) => void;
    }
}

export type CommoditySlice = State & Actions;

const initialState = {
    data: null,
    selected: null,
}

export const createCommoditySlice: StateCreator<CommoditySlice, [], [], CommoditySlice> = (
    logger(
        (set, get) => ({
            quickBridgeCommodities: {
                ...initialState,
                setData: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeCommodities: {
                        ...state.quickBridgeCommodities,
                        data: [...data]
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeCommodities: {
                        ...state.quickBridgeCommodities,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-commodities'
    )
);