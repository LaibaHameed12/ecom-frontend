import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken; 
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation({ query: (data) => ({ url: '/register', method: 'POST', body: data }) }),
        login: builder.mutation({ query: (data) => ({ url: '/login', method: 'POST', body: data }) }),
        refresh: builder.mutation({ query: () => ({ url: '/refresh', method: 'POST' }) }),
        verifyOtp: builder.mutation({ query: (data) => ({ url: '/verify-otp', method: 'POST', body: data }) }),
        resendOtp: builder.mutation({ query: (data) => ({ url: '/resend-otp', method: 'POST', body: data }) }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation, useVerifyOtpMutation, useResendOtpMutation } = authApi;
