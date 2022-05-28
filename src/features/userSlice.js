import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: () => {
            return initialState;
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        },
        resetNotifications: (state, action) => {
            console.log("reset notifications called");
            state.notifications.forEach((obj) => {
                obj.status = "read";
            });
        },
    },
    extraReducers: (builder) => {
        // save user after signup
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (state, { payload }) => payload);
        // save user after login
        builder.addMatcher(appApi.endpoints.login.matchFulfilled, (state, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (state, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (state, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled, (state, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled, (state, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.createOrder.matchFulfilled, (state, { payload }) => payload);
    },
});

// Action creators are generated for each case reducer function
export const { logoutUser, addNotification, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
