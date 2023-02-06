import create from 'zustand';
import { createSupplierNewsSlice, SupplierNewsSlice } from './supplierNewsSlice';
import { createMarketInsightsSlice, MarketInsightsSlice } from './marketInsightsSlice';
import {createQuickbridgeSlice, quickbridgeSlice} from './quickbridgeSlice'
export type TotalSlice = SupplierNewsSlice & MarketInsightsSlice & quickbridgeSlice & any;

const useBoundStore = create<TotalSlice>()((...state) => ({
    ...createSupplierNewsSlice(...state),
    ...createMarketInsightsSlice(...state),
    ...createQuickbridgeSlice(...state)
}));

export default useBoundStore;