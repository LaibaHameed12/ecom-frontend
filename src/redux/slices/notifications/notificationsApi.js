// src/redux/slices/notifications/notificationsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationsApi = createApi({
    reducerPath: "notificationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            let token = getState().auth?.accessToken;
            if (!token && typeof window !== "undefined") {
                token = localStorage.getItem("accessToken");
            }
            if (token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Notifications"],
    endpoints: (builder) => ({
        getUserNotifications: builder.query({
            query: (userId) => `/notifications/${userId}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: "Notifications", id: _id })),
                        { type: "Notifications", id: "LIST" },
                    ]
                    : [{ type: "Notifications", id: "LIST" }],
        }),

        markAsRead: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Notifications", id },
                { type: "Notifications", id: "LIST" },
            ],
        }),
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Notifications", id },
                { type: "Notifications", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetUserNotificationsQuery,
    useMarkAsReadMutation,
    useDeleteNotificationMutation,
} = notificationsApi;
