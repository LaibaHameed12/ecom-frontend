import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/auth/authApi";
import { usersApi } from "./slices/users/usersApi";
import { productsApi } from "./slices/products/productsApi";
import { notificationsApi } from "./slices/notifications/notificationsApi";
import { ordersApi } from "./slices/orders/ordersApi";

import authReducer from "./slices/auth/authSlice";
import usersReducer from "./slices/users/usersSlice";
import productsReducer from "./slices/products/productsSlice";
import ordersReducer from "./slices/orders/ordersSlice";
import cartReducer from "./slices/cart/cartSlice";
import notificationReducer from "./slices/notifications/notificationsSlice";
import { reviewsApi } from "./slices/reviews/reviewsApi";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        products: productsReducer,
        orders: ordersReducer,
        cart: cartReducer,
        notifications: notificationReducer,
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [notificationsApi.reducerPath]: notificationsApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            usersApi.middleware,
            productsApi.middleware,
            ordersApi.middleware,
            notificationsApi.middleware,
            reviewsApi.middleware
        ),
});

export default store;
