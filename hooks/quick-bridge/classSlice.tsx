import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    quickBridgeClasses: {
        data: any,
        selected: any,
    }
}

interface Actions {
    quickBridgeClasses: {
        setData: (data: any) => void;
        setSelected: (id: any) => void;
    }
}

export type ClassSlice = State & Actions;

const initialState = {
    data: null,
    selected: null,
}

export const createClassSlice: StateCreator<ClassSlice, [], [], ClassSlice> = (
    logger(
        (set, get) => ({
            quickBridgeClasses: {
                ...initialState,
                setData: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeClasses: {
                        ...state.quickBridgeClasses,
                        data: [...data]
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeClasses: {
                        ...state.quickBridgeClasses,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-classes'
    )
);