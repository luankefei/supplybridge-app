import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    quickBridgeVehicles: {
        data: any,
        selected: any,
    }
}

interface Actions {
    quickBridgeVehicles: {
        setData: (data: any) => void;
        setSelected: (id: any) => void;
    }
}

export type VehicleSlice = State & Actions;

const initialState = {
    data: null,
    selected: null,
}

export const createVehicleSlice: StateCreator<VehicleSlice, [], [], VehicleSlice> = (
    logger(
        (set, get) => ({
            quickBridgeVehicles: {
                ...initialState,
                setData: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeVehicles: {
                        ...state.quickBridgeVehicles,
                        data: [...data]
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeVehicles: {
                        ...state.quickBridgeVehicles,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-vehicles'
    )
);