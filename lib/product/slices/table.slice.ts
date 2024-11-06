import { createSlice } from "@reduxjs/toolkit";
// This contains the data for the main enity table
export interface categoryTableDataElement {
  photo: string;
  id: number;
  name: string;
}

export interface subCatTableDataElement extends categoryTableDataElement {
  category: {
    id: number;
    name: string;
  };
}

export interface itemTableDataElement extends categoryTableDataElement {
  subCategory: {
    id: number;
    name: string;
  };
}

export interface dataTable<tableElementData> {
  limit: number;
  page: number;
  totalResults: number;
  results: tableElementData[];
  totalPages: number;
}

const initialState: dataTable<
  categoryTableDataElement | subCatTableDataElement | itemTableDataElement
> = {
  limit: 5,
  page: 1,
  totalResults: 0,
  results: [],
  totalPages: 0,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    updateTableData(state, { payload }) {
      Object.assign(state, payload);
    },
    resetTable() {
      return initialState;
    },
  },
});

export const { updateTableData, resetTable } = tableSlice.actions;
