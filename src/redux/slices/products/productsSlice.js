// src/redux/slices/products/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: {
        search: "",
        minPrice: null,
        maxPrice: null,
        categories: [],
        dressStyle: [],
        sizes: [],
        colors: [],
        onSale: null,
        minRating: null,
    },
    pagination: {
        page: 1,
        limit: 10,
    },
    sorting: {
        sortBy: "createdAt",
        sortOrder: "desc",
    },
    selectedProductId: null,
    viewMode: "grid", // or 'list'
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.page = 1;
        },

        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setSorting: (state, action) => {
            state.sorting = { ...state.sorting, ...action.payload };
        },
        setSelectedProductId: (state, action) => {
            state.selectedProductId = action.payload;
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        },
    },
});

export const {
    setFilters,
    clearFilters,
    setPagination,
    setSorting,
    setSelectedProductId,
    setViewMode,
} = productsSlice.actions;

export default productsSlice.reducer;
