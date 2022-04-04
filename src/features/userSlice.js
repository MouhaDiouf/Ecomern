import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // save user after signup
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (state, { payload }) => payload);
        // save user after login
        builder.addMatcher(appApi.endpoints.login.matchFulfilled, (state, { payload }) => payload);
    },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
