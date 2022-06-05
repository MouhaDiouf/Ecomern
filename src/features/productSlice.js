import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

const initialState = [];

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updateProducts: (_, action) => {
            return action.payload.data;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteProduct.matchFulfilled, (_, { payload }) => payload);
    },
});

// Action creators are generated for each case reducer function

export default productSlice.reducer;
export const { updateProducts } = productSlice.actions;
