import { createSlice } from '@reduxjs/toolkit';

const safeParse = (str) => {
    try {
        return str ? JSON.parse(str) : null;
    } catch {
        return null;
    }
};

let initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

// Only read localStorage in browser (SSR safe)
if (typeof window !== 'undefined') {
    const storedUser = safeParse(localStorage.getItem('user'));
    initialState = {
        user: storedUser || null,
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        isAuthenticated: !!localStorage.getItem('accessToken'),
    };
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // payload expected: { user, accessToken, refreshToken }
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user || null;
            state.accessToken = accessToken || null;
            state.refreshToken = refreshToken || null;
            state.isAuthenticated = !!accessToken;

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user || null));
                if (accessToken) localStorage.setItem('accessToken', accessToken);
                if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
            }
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        },
        updateUser: (state, action) => {
            state.user = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        },
    },
});

// Basic selectors
export const selectAuth = (state) => state.auth;
export const getUser = (state) => state.auth.user;
export const isLoggedIn = (state) => state.auth.isAuthenticated;

// Role helpers (case-insensitive)
export const getUserRoles = (state) => {
    const roles = state.auth.user?.roles || [];
    return Array.isArray(roles) ? roles.map((r) => String(r).toLowerCase()) : [];
};
export const isAdmin = (state) => getUserRoles(state).includes('admin');
export const isSuperadmin = (state) => getUserRoles(state).includes('superadmin');
// selector factory: use like useSelector(hasRole('admin'))
export const hasRole = (role) => (state) => {
    if (!role) return false;
    return getUserRoles(state).includes(String(role).toLowerCase());
};

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
