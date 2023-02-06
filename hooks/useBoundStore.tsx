import create from "zustand";
import { createSupplierNewsSlice, SupplierNewsSlice } from "./supplierNewsSlice";
import { createMarketInsightsSlice, MarketInsightsSlice } from "./marketInsightsSlice";
import { createVehicleSlice, VehicleSlice } from "./quick-bridge/vehicleSlice";
export type TotalSlice = SupplierNewsSlice & MarketInsightsSlice & VehicleSlice & any;

const useBoundStore = create<TotalSlice>()((...state) => ({
    ...createSupplierNewsSlice(...state),
    ...createMarketInsightsSlice(...state),
    ...createVehicleSlice(...state),
}));

export default useBoundStore;