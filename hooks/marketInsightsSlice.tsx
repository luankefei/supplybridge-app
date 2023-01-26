import { StateCreator } from "zustand";
import { logger } from './middleware';

interface State {
  marketInsights: {
    page: number;
    pageSize: number;
    count: number;
    news: any;
  }
}

interface Actions {
  marketInsights: {
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setCount: (count: number) => void;
    setNews: (news: any) => void;
  }
}

export type MarketInsightsSlice = State & Actions;

const initialState = {
  page: 1,
  pageSize: 18,
  count: 0,
  news: []
}

export const createMarketInsightsSlice: StateCreator<MarketInsightsSlice, [], [], MarketInsightsSlice> = (
  logger(
    (set, get) => ({
      marketInsights: {
        ...initialState,
        setPage: (page: number) => set((state = get()) => ({
          ...state,
          marketInsights: {
            ...state.marketInsights,
            page
          }
        })),
        setPageSize: (pageSize: number) => set((state = get()) => ({
          ...state,
          marketInsights: {
            ...state.marketInsights,
            pageSize
          }
        })),
        setCount: (count: number) => set((state = get()) => ({
          ...state,
          marketInsights: {
            ...state.marketInsights,
            count
          }
        })),
        setNews: (news: any) => set((state = get()) => ({
          ...state,
          marketInsights: {
            ...state.marketInsights,
            news: [...state.marketInsights.news, ...news]
          }
        })),
      }
    }),
    'market-insights'
  )
);