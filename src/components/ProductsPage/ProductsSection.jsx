"use client";

import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./Pagination";
import { useGetProductsQuery } from "@/redux/slices/products/productsApi";
import { setSorting, setPagination } from "@/redux/slices/products/productsSlice";
import ProductCard from "../common/PoductCard";

const ProductsSection = () => {
    const dispatch = useDispatch();
    const { filters, sorting, pagination } = useSelector((state) => state.products);

    const searchParams = useSearchParams();
    const search = searchParams.get("search");


    // Fetch products using RTK Query
    const { data, isLoading, isFetching, isError } = useGetProductsQuery({
        ...filters,
        ...sorting,
        ...pagination,
        search: search || undefined,
    });

    const handleSortChange = (sortOption) => {
        switch (sortOption) {
            case "Newest":
                dispatch(setSorting({ sortBy: "createdAt", sortOrder: "desc" }));
                break;
            case "Price: Low to High":
                dispatch(setSorting({ sortBy: "price", sortOrder: "asc" }));
                break;
            case "Price: High to Low":
                dispatch(setSorting({ sortBy: "price", sortOrder: "desc" }));
                break;
            default:
                dispatch(setSorting({ sortBy: "createdAt", sortOrder: "desc" }));
        }
        // reset page when sorting changes
        dispatch(setPagination({ page: 1 }));
    };

    const handlePageChange = (page) => {
        dispatch(setPagination({ page }));
    };

    return (
        <div>
            {/* Products Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Products</h2>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    {data?.total > 0 && (
                        <p className="text-sm text-gray-600">
                            Showing{" "}
                            {Math.min((data.page - 1) * data.limit + 1, data.total)}-
                            {Math.min(data.page * data.limit, data.total)} of {data.total} Products
                        </p>
                    )}

                    <div>
                        <span className="text-gray-600 text-sm">Sort By:</span>
                        <select
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="border-none outline-none rounded-md font-medium text-sm"
                        >
                            <option value="Newest">Newest</option>
                            <option value="Price: Low to High">Price: Low to High</option>
                            <option value="Price: High to Low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>


            {/* Products Content */}
            {isLoading || isFetching ? (
                <div className="text-center py-10 text-gray-500">
                    Loading products...
                </div>
            ) : isError ? (
                <div className="text-center py-10 text-red-500">
                    Failed to load products.
                </div>
            ) : data?.products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    No products found.
                </div>
            )}

            {/* Pagination */}
            {data?.totalPages > 1 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={data?.page || pagination.page}
                        totalPages={data?.totalPages || 1}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductsSection;
