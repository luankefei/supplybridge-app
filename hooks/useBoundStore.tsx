import create from "zustand";
import { createSupplierNewsSlice, SupplierNewsSlice } from "./supplierNewsSlice";
import { createMarketInsightsSlice, MarketInsightsSlice } from "./marketInsightsSlice";
import { createVehicleSlice, VehicleSlice } from "./quick-bridge/vehicleSlice";
import { createQuickBridgeSlice, QuickBridgeSlice } from "./quick-bridge/quickBridgeSlice";

export type TotalSlice = SupplierNewsSlice & MarketInsightsSlice & VehicleSlice & QuickBridgeSlice & any;

const useBoundStore = create<TotalSlice>()((...state) => ({
    ...createSupplierNewsSlice(...state),
    ...createMarketInsightsSlice(...state),
    ...createVehicleSlice(...state),
    ...createQuickBridgeSlice(...state),
}));

export default useBoundStore;