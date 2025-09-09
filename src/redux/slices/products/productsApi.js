// src/redux/slices/products/productsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`, // change if your backend URL differs
        prepareHeaders: (headers, { getState }) => {
            let token = getState().auth?.accessToken;

            // fallback to localStorage if redux is empty
            if (!token && typeof window !== 'undefined') {
                token = localStorage.getItem("accessToken");
            }

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },

    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        // GET /products
        getProducts: builder.query({
            query: (params = {}) => {
                // remove empty values
                const cleanedParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => {
                        if (v === undefined || v === null) return false;
                        if (Array.isArray(v) && v.length === 0) return false;
                        if (typeof v === "string" && v.trim() === "") return false;
                        return true;
                    })
                );

                // Convert arrays -> comma-separated strings (backend DTO splits by comma)
                Object.keys(cleanedParams).forEach((key) => {
                    const val = cleanedParams[key];
                    if (Array.isArray(val)) {
                        cleanedParams[key] = val.join(',');
                    }
                    // ensure numbers/booleans are sent as primitives (URLSearchParams will stringify)
                    if (typeof val === 'number' || typeof val === 'boolean') {
                        cleanedParams[key] = String(val);
                    }
                });

                // (optional) dev-only logging so you can inspect exactly what's sent
                if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
                    // eslint-disable-next-line no-console
                    console.debug('Products API params:', cleanedParams);
                }

                return {
                    url: '/products',
                    method: 'GET',
                    params: cleanedParams,
                };
            },
            providesTags: (result) =>
                result?.products
                    ? [
                        ...result.products.map(({ _id }) => ({ type: 'Products', id: _id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),

        // GET /products/:id
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),

        // GET /products/:id/related
        getRelatedProducts: builder.query({
            query: ({ id, limit = 4 }) => `/products/${id}/related?limit=${limit}`,
        }),

        // POST /products (multipart/form-data)
        createProduct: builder.mutation({
            query: (formData) => ({
                url: "/products",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: [{ type: "Products", id: "LIST" }],
        }),

        // PATCH /products/:id (multipart/form-data)
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Products", id },
                { type: "Products", id: "LIST" },
            ],
        }),

        // DELETE /products/:id
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Products", id: "LIST" }],
        }),

        // POST /products/:id/sale
        setProductSale: builder.mutation({
            query: ({ id, saleData }) => ({
                url: `/products/${id}/sale`,
                method: "POST",
                body: saleData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
        }),

        // DELETE /products/:id/sale
        removeProductSale: builder.mutation({
            query: (id) => ({
                url: `/products/${id}/sale`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Products", id }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetRelatedProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useSetProductSaleMutation,
    useRemoveProductSaleMutation,
} = productsApi;
