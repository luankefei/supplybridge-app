import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    quickBridgeTechnologies: {
        data: any,
        selected: any,
    }
}

interface Actions {
    quickBridgeTechnologies: {
        setData: (data: any) => void;
        setSelected: (id: any) => void;
    }
}

export type TechnologySlice = State & Actions;

const initialState = {
    data: null,
    selected: null,
}

export const createTechnologySlice: StateCreator<TechnologySlice, [], [], TechnologySlice> = (
    logger(
        (set, get) => ({
            quickBridgeTechnologies: {
                ...initialState,
                setData: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeTechnologies: {
                        ...state.quickBridgeTechnologies,
                        data: [...data]
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeTechnologies: {
                        ...state.quickBridgeTechnologies,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-technologies'
    )
);