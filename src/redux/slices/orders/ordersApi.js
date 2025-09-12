// src/redux/slices/orders/ordersApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
        prepareHeaders: (headers, { getState }) => {
            let token = getState().auth?.accessToken;

            // fallback to localStorage
            if (!token && typeof window !== 'undefined') {
                token = localStorage.getItem('accessToken');
            }

            if (token) headers.set('authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderPayload) => ({
                url: '/orders',
                method: 'POST',
                body: orderPayload,
            }),
            invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
        }),

        getOrders: builder.query({
            query: (params) => ({
                url: '/orders',
                method: 'GET',
                params,
            }),
            providesTags: (result) =>
                result && Array.isArray(result)
                    ? [
                        ...result.map((r) => ({ type: 'Orders', id: r._id })),
                        { type: 'Orders', id: 'LIST' },
                    ]
                    : [{ type: 'Orders', id: 'LIST' }],
        }),

        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),

        updateOrder: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/orders/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Orders', id },
                { type: 'Orders', id: 'LIST' },
            ],
        }),

        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Orders', id },
                { type: 'Orders', id: 'LIST' },
            ],
        }),

        createCheckoutSession: builder.mutation({
            query: (payload) => ({
                url: '/stripe/create-checkout-session',
                method: 'POST',
                body: payload,
            }),
        }),

    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useCreateCheckoutSessionMutation,
} = ordersApi;
