import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    quickBridgePioneers: {
        data: any,
        selected: any,
    }
}

interface Actions {
    quickBridgePioneers: {
        setData: (data: any) => void;
        setSelected: (id: any) => void;
    }
}

export type PioneerSlice = State & Actions;

const initialState = {
    data: null,
    selected: null,
}

export const createPioneerSlice: StateCreator<PioneerSlice, [], [], PioneerSlice> = (
    logger(
        (set, get) => ({
            quickBridgePioneers: {
                ...initialState,
                setData: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgePioneers: {
                        ...state.quickBridgePioneers,
                        data: [...data]
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    quickBridgePioneers: {
                        ...state.quickBridgePioneers,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-pioneers'
    )
);