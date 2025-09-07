import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/users`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Users', 'User'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => '/me',
            providesTags: ['User'],
        }),
        getUsers: builder.query({
            query: () => '/',
            providesTags: ['Users'],
        }),
        getUserById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        updateUserRoles: builder.mutation({
            query: ({ id, roles }) => ({
                url: `/${id}/roles`,
                method: 'PATCH',
                body: { roles },
            }),
            invalidatesTags: ['Users', 'User'],
        }),
        updateUserStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/${id}/status`,
                method: 'PATCH',
                body: { isActive },
            }),
            invalidatesTags: ['Users', 'User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserRolesMutation,
    useUpdateUserStatusMutation,
    useDeleteUserMutation,
} = usersApi;
