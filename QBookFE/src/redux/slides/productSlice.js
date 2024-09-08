import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      const { search = "" } = action.payload;
      state.search = search;
    },
  },
});

export const { searchProduct } = productSlice.actions;

export default productSlice.reducer;