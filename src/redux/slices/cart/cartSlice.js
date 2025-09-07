import { createSlice } from '@reduxjs/toolkit';
import { loadCart, saveCart, clearCartStorage } from '../../utils/cartLocalApi';

// safe parse not needed here because helper handles it
const initialState = {
    items: loadCart(), // array of { product, size, color, quantity, price, pointsUsed? }
};

const findIndexMatch = (items, { product, size, color }) =>
    items.findIndex(
        (it) => it.product === product && it.size === size && it.color === color
    );

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            // payload: { product, size, color, quantity = 1, price, pointsUsed?, title, image }
            const payload = action.payload;
            const idx = findIndexMatch(state.items, payload);

            if (idx >= 0) {
                // increment quantity (make sure it's a number)
                state.items[idx].quantity =
                    Number(state.items[idx].quantity) + Number(payload.quantity || 1);

                // optionally update price/pointsUsed snapshot if provided
                if (payload.price !== undefined) state.items[idx].price = payload.price;
                if (payload.pointsUsed !== undefined)
                    state.items[idx].pointsUsed = payload.pointsUsed;

                // also keep snapshot fields updated if provided
                if (payload.title !== undefined) state.items[idx].title = payload.title;
                if (payload.image !== undefined) state.items[idx].image = payload.image;
            } else {
                state.items.push({
                    product: payload.product,
                    size: payload.size,
                    color: payload.color,
                    quantity: Number(payload.quantity || 1),
                    price: Number(payload.price || 0),
                    pointsUsed: payload.pointsUsed,
                    title: payload.title,   // snapshot
                    image: payload.image,   // snapshot
                });
            }

            saveCart(state.items);
        },


        updateItemQuantity: (state, action) => {
            // payload: { product, size, color, quantity }
            const { product, size, color, quantity } = action.payload;
            const idx = findIndexMatch(state.items, { product, size, color });
            if (idx >= 0) {
                if (Number(quantity) <= 0) {
                    state.items.splice(idx, 1);
                } else {
                    state.items[idx].quantity = Number(quantity);
                }
                saveCart(state.items);
            }
        },

        removeItem: (state, action) => {
            // payload: { product, size, color }
            state.items = state.items.filter(
                (it) =>
                    !(
                        it.product === action.payload.product &&
                        it.size === action.payload.size &&
                        it.color === action.payload.color
                    )
            );
            saveCart(state.items);
        },

        setCartItems: (state, action) => {
            // replace whole cart (useful for restoring)
            state.items = Array.isArray(action.payload) ? action.payload : [];
            saveCart(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            clearCartStorage();
        },
    },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) =>
    state.cart.items.reduce((sum, it) => sum + Number(it.quantity || 0), 0);
export const selectCartTotalAmount = (state) =>
    state.cart.items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0), 0);

// Exports
export const { addItem, updateItemQuantity, removeItem, setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
