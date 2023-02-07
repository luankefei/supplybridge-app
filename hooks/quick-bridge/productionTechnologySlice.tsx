import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    quickBridgeProductionTechnologies: {
        data: any,
        selected: any,
    }
}

interface Actions {
    quickBridgeProductionTechnologies: {
        setData: (data: any) => void;
        setSelected: (id: any) => void;
    }
}

export type ProductionTechnologySlice = State & Actions;

const initialState = {
    data: null,
    selected: null,
}

export const createProudctionTechnologySlice: StateCreator<ProductionTechnologySlice, [], [], ProductionTechnologySlice> = (
    logger(
        (set, get) => ({
            quickBridgeProductionTechnologies: {
                ...initialState,
                setData: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeProductionTechnologies: {
                        ...state.quickBridgeProductionTechnologies,
                        data: [...data]
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeProductionTechnologies: {
                        ...state.quickBridgeProductionTechnologies,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-production-technologies'
    )
);