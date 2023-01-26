import create from 'zustand';
import { createSupplierNewsSlice, SupplierNewsSlice } from './supplierNewsSlice';
import { createMarketInsightsSlice, MarketInsightsSlice } from './marketInsightsSlice';
export type TotalSlice = SupplierNewsSlice & MarketInsightsSlice & any;

const useBoundStore = create<TotalSlice>()((...state) => ({
    ...createSupplierNewsSlice(...state),
    ...createMarketInsightsSlice(...state),
}));

export default useBoundStore;