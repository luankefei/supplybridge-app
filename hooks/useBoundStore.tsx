import create from 'zustand';
import { createSupplierNewsSlice, SupplierNewsSlice } from './supplierNewsSlice';

export type TotalSlice = SupplierNewsSlice & any;

const useBoundStore = create<TotalSlice>()((...state) => ({
    ...createSupplierNewsSlice(...state),
}));

export default useBoundStore;