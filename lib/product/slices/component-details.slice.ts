import { createSlice } from "@reduxjs/toolkit";
// This slice stores the main state of component. Given below are the values it has -

// tab: The main entity tab that user is on. On the product page, user is on category tab by default
// id: When user performs search by name and selects an option, we store that id of the selected option here
// refreshData: If the data in the main entity table has to be reloaded, we can just toggle this value(as it is a boolean). Since the component is extremely nested, it really helps in reloading data.
// closeModal: Used for closing the entity create/ update modal if it is open
// isOpen: For tracking whether create update modal is open or not

export enum tabKeys {
  category = "Category",
  subCategory = "Sub Category",
  items = "Item",
}

interface componentDetails {
  tab: tabKeys;
  id: number | null;
  refreshData: boolean;
  closeModal: boolean;
  isOpen: boolean;
}

const initialState: componentDetails = {
  tab: tabKeys.category,
  id: null,
  refreshData: false,
  closeModal: false,
  isOpen: false,
};

export const componentDetailsSlice = createSlice({
  name: "componentDetails",
  initialState,
  reducers: {
    setTab(state, { payload }) {
      state.tab = payload;
    },
    setId(state, { payload }) {
      state.id = payload;
    },
    setDetails(state, { payload }) {
      Object.assign(state, payload);
    },
    setIsOpen(state, { payload }) {
      state.isOpen = payload;
    },
    resetDetails(_, { payload }) {
      const newState = structuredClone(initialState);
      if (payload) {
        Object.assign(newState, payload);
      }
      return newState;
    },
  },
});

export const { setTab, setId, setDetails, resetDetails, setIsOpen } =
  componentDetailsSlice.actions;
