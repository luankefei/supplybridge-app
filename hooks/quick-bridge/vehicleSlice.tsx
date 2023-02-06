import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    vehicles: {
        data: any,
        selected: any,
    }
}

interface Actions {
    vehicles: {
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
            vehicles: {
                ...initialState,
                setData: (data: any) => set((state = get()) => ({
                    ...state,
                    vehicles: {
                        ...state.vehicles,
                        data: [...data]
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    vehicles: {
                        ...state.vehicles,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-vehicles'
    )
);