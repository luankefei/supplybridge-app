import { StateCreator } from "zustand";
import { logger } from './middleware';

interface State {
  supplierNews: {
    page: number;
    pageSize: number;
    count: number;
    news: any;
  }
}

interface Actions {
  supplierNews: {
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setCount: (count: number) => void;
    setNews: (news: any) => void;
  }
}

export type SupplierNewsSlice = State & Actions;

const initialState = {
  page: 1,
  pageSize: 12,
  count: 0,
  news: []
}

export const createSupplierNewsSlice: StateCreator<SupplierNewsSlice, [], [], SupplierNewsSlice> = (
  logger(
    (set, get) => ({
      supplierNews: {
        ...initialState,
        setPage: (page: number) => set((state = get()) => ({
          ...state,
          supplierNews: {
            ...state.supplierNews,
            page
          }
        })),
        setPageSize: (pageSize: number) => set((state = get()) => ({
          ...state,
          supplierNews: {
            ...state.supplierNews,
            pageSize
          }
        })),
        setCount: (count: number) => set((state = get()) => ({
          ...state,
          supplierNews: {
            ...state.supplierNews,
            count
          }
        })),
        setNews: (news: any) => set((state = get()) => ({
          ...state,
          supplierNews: {
            ...state.supplierNews,
            news: [...get().supplierNews.news, ...news]
          }
        })),
      }
    }),
    'supplier-news'
  )
);