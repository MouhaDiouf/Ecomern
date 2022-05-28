import { createSlice } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import appApi from "../services/appApi";

const initialState = [];

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updateProducts: (state, action) => {
            return action.payload.data;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createProduct.matchFulfilled, (state, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateProduct.matchFulfilled, (state, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteProducts.matchFulfilled, (state, { payload }) => payload);
    },
});

// Action creators are generated for each case reducer function

export default productSlice.reducer;
export const { updateProducts } = productSlice.actions;
