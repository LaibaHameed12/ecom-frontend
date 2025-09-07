import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedUser: null,
    filters: {},
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {};
        },
    },
});

export const { setSelectedUser, clearSelectedUser, setFilters, clearFilters } = usersSlice.actions;

export const selectSelectedUser = (state) => state.users.selectedUser;
export const selectFilters = (state) => state.users.filters;

export default usersSlice.reducer;
