// src/redux/slices/notifications/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    unreadCount: 0,
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        incrementUnread: (state) => {
            state.unreadCount += 1;
        },
        clearUnread: (state) => {
            state.unreadCount = 0;
        },
    },
});

export const { setUnreadCount, incrementUnread, clearUnread } =
    notificationsSlice.actions;

export const getUnreadCount = (state) => state.notifications.unreadCount;

export default notificationsSlice.reducer;
