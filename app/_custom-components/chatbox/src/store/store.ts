import { createStore } from "zustand/vanilla";
import {
  behaviourSlice,
  createBehaviourSlice,
  messageSlice,
  createMessageSlice,
} from "./slice";

export type chatBoxStore = behaviourSlice & messageSlice;

export const createChatboxStore = () => {
  return createStore<chatBoxStore>()((...args) => ({
    ...createBehaviourSlice(...args),
    ...createMessageSlice(...args),
  }));
};
