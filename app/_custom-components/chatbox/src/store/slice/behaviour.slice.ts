import { StateCreator } from "zustand";

export interface behaviourSlice {
  showChat: boolean;
  toggleChat: () => void;
  showGoDownBtn: boolean;
  controlGoDownBtn: (showBtn: boolean) => void;
}

const initialState = {
  showChat: false,
  showGoDownBtn: false,
};

export const createBehaviourSlice: StateCreator<
  behaviourSlice,
  [],
  [],
  behaviourSlice
> = (set) => ({
  ...initialState,
  toggleChat: () =>
    set((state) => ({
      showChat: !state.showChat,
    })),
  controlGoDownBtn: (showBtn) => {
    set(() => ({
      showGoDownBtn: showBtn,
    }));
  },
});
