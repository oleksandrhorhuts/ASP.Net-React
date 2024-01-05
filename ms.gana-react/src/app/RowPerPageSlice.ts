import { createSlice } from "@reduxjs/toolkit";

export const RowPerPageSlice = createSlice({
  name: "trigger",
  initialState: {
    rowPerPage:10,
  },
  reducers: {
    setRowPerPage: (state, action) => {
      state.rowPerPage = action.payload.rowPerPage;
    }
  }
});

export const { setRowPerPage } = RowPerPageSlice.actions;

export const getRowPerPage = (state: any) => state.rowPerPage.rowPerPage;
 
export default RowPerPageSlice.reducer;