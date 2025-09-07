// src/redux/slices/reviews/reviewsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            let token = getState().auth?.accessToken;
            if (!token && typeof window !== 'undefined') token = localStorage.getItem('accessToken');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: (productId) => `/products/${productId}/reviews`,
            // provide a product-level tag so we can invalidate after create
            providesTags: (result, error, productId) => [{ type: 'Reviews', id: productId }],
        }),
        canReview: builder.query({
            query: (productId) => `/products/${productId}/reviews/can-review`,
            providesTags: (result, error, productId) => [{ type: 'Reviews', id: productId }],
        }),
        createReview: builder.mutation({
            query: ({ productId, body }) => ({
                url: `/products/${productId}/reviews`,
                method: 'POST',
                body,
            }),
            // invalidate the product-level tag so both getReviews and canReview refetch
            invalidatesTags: (result, error, { productId }) => [{ type: 'Reviews', id: productId }],
        }),
        getAllReviews: builder.query({
            query: (limit = 20) => `/reviews?limit=${limit}`,
            providesTags: [{ type: 'Reviews', id: 'ALL' }],
        }),
    })
});

export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
    useCanReviewQuery,
    useGetAllReviewsQuery
} = reviewsApi;
