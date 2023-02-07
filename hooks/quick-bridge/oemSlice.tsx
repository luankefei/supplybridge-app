import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    quickBridgeOEMs: {
        data: any,
        selected: any,
    }
}

interface Actions {
    quickBridgeOEMs: {
        setData: (data: any) => void;
        setSelected: (id: any) => void;
    }
}

export type OEMSlice = State & Actions;

const initialState = {
    data: null,
    selected: null,
}

export const createOEMSlice: StateCreator<OEMSlice, [], [], OEMSlice> = (
    logger(
        (set, get) => ({
            quickBridgeOEMs: {
                ...initialState,
                setData: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeOEMs: {
                        ...state.quickBridgeOEMs,
                        data: [...data]
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeOEMs: {
                        ...state.quickBridgeOEMs,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-oems'
    )
);