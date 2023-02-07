import { StateCreator } from "zustand";
import { logger } from "hooks/middleware";

interface State {
    quickBridgeSegments: {
        segments: any,
        brands: any,
        selected: any,
        brandModels: any,
    }
}

interface Actions {
    quickBridgeSegments: {
        setSegments: (data: any) => void;
        setBrands: (data: any) => void;
        setBrandModels: (brandSegments: any, brands: any, segments: any) => void;
        setSelected: (id: any) => void;
    }
}

export interface VehicleBrand {
    id: number,
    name: string,
    logo: string,
}

export interface VehicleBrandModel extends VehicleBrand {
    models: VehicleModel[],
}

export interface VehicleModel {
    id: number,
    name: string,
    brandId: number,
    segmentId: number,
    vehicleBrand?: VehicleBrand;
}

export interface VehicleSegment {
    id: number,
    name: string,
    vehicleModels: VehicleModel[],
}

export type SegmentSlice = State & Actions;

const initialState = {
    segments: null,
    brands: null,
    brandModels: null,
    selected: null,
}

export const createSegmentSlice: StateCreator<SegmentSlice, [], [], SegmentSlice> = (
    logger(
        (set, get) => ({
            quickBridgeSegments: {
                ...initialState,
                setSegments: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeSegments: {
                        ...state.quickBridgeSegments,
                        segments: [...data]
                    }
                })),
                setBrands: (data: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeSegments: {
                        ...state.quickBridgeSegments,
                        brands: [...data]
                    }
                })),
                setBrandModels: (brandSegments: any, brands: any, segments: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeSegments: {
                        ...state.quickBridgeSegments,
                        brandModels: [...brandSegments],
                        brands: [...brands],
                        segments: [...segments],
                    }
                })),
                setSelected: (id: any) => set((state = get()) => ({
                    ...state,
                    quickBridgeSegments: {
                        ...state.quickBridgeSegments,
                        selected: id
                    }
                })),
            }
        }),
        'quick-bridge-segments'
    )
);