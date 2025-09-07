// src/redux/slices/orders/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    checkout: {
        loading: false,
        success: false,
        error: null,
        lastOrder: null, // store order object returned from server after checkout
    },
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        checkoutStarted: (state) => {
            state.checkout.loading = true;
            state.checkout.success = false;
            state.checkout.error = null;
            state.checkout.lastOrder = null;
        },
        checkoutSuccess: (state, action) => {
            state.checkout.loading = false;
            state.checkout.success = true;
            state.checkout.error = null;
            state.checkout.lastOrder = action.payload || null;
        },
        checkoutFailed: (state, action) => {
            state.checkout.loading = false;
            state.checkout.success = false;
            state.checkout.error = action.payload || 'Checkout failed';
        },
        clearCheckoutState: (state) => {
            state.checkout = { loading: false, success: false, error: null, lastOrder: null };
        },
    },
});

export const { checkoutStarted, checkoutSuccess, checkoutFailed, clearCheckoutState } = ordersSlice.actions;
export const selectCheckout = (state) => state.orders.checkout;
export default ordersSlice.reducer;
