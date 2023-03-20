import { StateCreator } from "zustand";
import { logger } from './middleware';

interface State {
  feedback: {
    show: boolean,
  }
}

interface Actions {
  feedback: {
    setShow: (show: boolean) => void,
  }
}

export type FeedbackSlice = State & Actions;

const initialState = {
  show: false,
}

export const createFeedbackSlice: StateCreator<FeedbackSlice, [], [], FeedbackSlice> = (
  logger(
    (set, get) => ({
      feedback: {
        ...initialState,
        setShow: (show: boolean) => set((state = get()) => ({
          ...state,
          feedback: {
            ...state.feedback,
            show,
          }
        })),
      }
    }),
    'feedback'
  )
);