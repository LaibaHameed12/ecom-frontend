// src/redux/utils/cartLocalApi.js
export const CART_STORAGE_KEY = 'cart_v1';

export function loadCart() {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveCart(items = []) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch { }
}

export function clearCartStorage() {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(CART_STORAGE_KEY);
    } catch { }
}
