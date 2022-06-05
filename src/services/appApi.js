// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ecomern-backend.herokuapp.com/" }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        deleteUser: builder.mutation({
            query: ({ client_id, current_user_id }) => ({
                url: `/users/${client_id}/`,
                method: "DELETE",
                body: {
                    current_user_id,
                },
            }),
        }),

        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),

        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            }),
        }),

        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),

        removeFromCart: builder.mutation({
            query: (body) => ({
                url: `/products/remove-from-cart`,
                method: "DELETE",
                body,
            }),
        }),

        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: `/products/increase-cart`,
                method: "POST",
                body,
            }),
        }),

        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: `/products/decrease-cart`,
                method: "POST",
                body,
            }),
        }),

        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useAddToCartMutation,
    useCreateProductMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useDeleteUserMutation,
} = appApi;

export default appApi;
