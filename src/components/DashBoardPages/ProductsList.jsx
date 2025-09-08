"use client";

import { Package, Trash2, Eye, Tag } from "lucide-react";
import { useState } from "react";
import {
    useGetProductsQuery,
    useDeleteProductMutation,
    useSetProductSaleMutation,
    useRemoveProductSaleMutation,
} from "@/redux/slices/products/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProductId } from "@/redux/slices/products/productsSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SaleModal } from "./SaleModal";

export const ProductsList = ({ canDelete, canCreate }) => {
    const dispatch = useDispatch();
    const { pagination, sorting } = useSelector((state) => state.products);
    const router = useRouter();

    const { data, isLoading, isError } = useGetProductsQuery({
        page: pagination.page,
        limit: pagination.limit,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
    });

    const [deleteProduct] = useDeleteProductMutation();
    const [setProductSale] = useSetProductSaleMutation();
    const [removeProductSale] = useRemoveProductSaleMutation();

    const [saleModal, setSaleModal] = useState({
        open: false,
        productId: null,
        discountType: "percent",
        discountValue: 10,
        startsAt: "",
        endsAt: "",
    });

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id).unwrap();
        } catch (err) {
            console.error("Failed to delete product", err);
        }
    };

    const handleSetSale = async () => {
        try {
            await setProductSale({
                id: saleModal.productId,
                saleData: {
                    discountType: saleModal.discountType,
                    discountValue: Number(saleModal.discountValue),
                    startsAt: saleModal.startsAt || null,
                    endsAt: saleModal.endsAt || null,
                    isOnSale: true,
                },
            }).unwrap();
            toast.success("Sale set successfully!");
            setSaleModal({
                open: false,
                productId: null,
                discountType: "percent",
                discountValue: 10,
                startsAt: "",
                endsAt: "",
            });
        } catch (err) {
            toast.error("Failed to set sale");
            console.error(err);
        }
    };

    const handleRemoveSale = async (id) => {
        try {
            await removeProductSale(id).unwrap();
            toast.info("Sale removed");
        } catch (err) {
            console.error("Failed to remove sale", err);
        }
    };

    if (isLoading) return <div className="p-6">Loading products...</div>;
    if (isError) return <div className="p-6 text-red-600">Failed to load products.</div>;

    const products = data?.products || [];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-gray-700" /> Products Management
            </h2>

            {products.length === 0 ? (
                <div className="text-gray-600">No products found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="bg-gray-50 flex items-center justify-center">
                                {product.images?.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="h-60 w-full object-cover"
                                    />
                                ) : (
                                    <Package className="w-16 h-16 text-gray-400" />
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 lowercase mb-2">
                                    {product.title}
                                </h3>
                                {/* Price Section */}
                                <div className="mb-2">
                                    {product.sale?.isOnSale &&
                                        (!product.sale.startsAt || new Date(product.sale.startsAt) <= new Date()) &&
                                        (!product.sale.endsAt || new Date(product.sale.endsAt) >= new Date()) ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-red-600">
                                                $
                                                {product.sale.discountType === 'percent'
                                                    ? (product.price -
                                                        (product.price * product.sale.discountValue) / 100
                                                    ).toFixed(2)
                                                    : Math.max(product.price - product.sale.discountValue, 0).toFixed(2)}
                                            </span>
                                            <span className="text-sm line-through text-gray-500">
                                                ${product.price}
                                            </span>
                                            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                                                -{product.sale.discountType === 'percent'
                                                    ? `${product.sale.discountValue}%`
                                                    : `$${product.sale.discountValue}`}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-lg font-semibold text-gray-900">
                                            ${product.price}
                                        </span>
                                    )}
                                </div>


                                {/* Sale status */}
                                {product.sale?.isOnSale ? (
                                    <p className="text-sm text-green-600 mb-2">
                                        On Sale: {product.sale.discountValue}
                                        {product.sale.discountType === "percent" ? "%" : "$"} <br />
                                        {product.sale.startsAt &&
                                            `From: ${new Date(product.sale.startsAt).toLocaleDateString()}`}
                                        {product.sale.endsAt &&
                                            ` → To: ${new Date(product.sale.endsAt).toLocaleDateString()}`}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400 mb-2">No active sale</p>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => router.push(`/products/${product._id}`)}
                                        className="flex-1 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                                    >
                                        <Eye className="w-4 h-4 inline-block mr-1" /> View
                                    </button>

                                    {canDelete && (
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="px-3 py-2 bg-white border rounded hover:bg-gray-50"
                                        >
                                            <Trash2 className="w-4 h-4 text-gray-600" />
                                        </button>
                                    )}

                                    {product.sale?.isOnSale ? (
                                        <button
                                            onClick={() => handleRemoveSale(product._id)}
                                            className="px-3 py-2 bg-red-100 rounded text-red-600 hover:bg-red-200 text-sm"
                                        >
                                            Remove Sale
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setSaleModal({
                                                    open: true,
                                                    productId: product._id,
                                                    discountType: "percent",
                                                    discountValue: 10,
                                                    startsAt: "",
                                                    endsAt: "",
                                                })
                                            }
                                            className="px-3 py-2 bg-blue-100 rounded text-blue-600 hover:bg-blue-200 text-sm"
                                        >
                                            <Tag className="w-4 h-4 inline-block mr-1" /> Set Sale
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Sale Modal */}
            {saleModal.open && (
                <SaleModal
                    open={saleModal.open}
                    saleModal={saleModal}
                    onClose={() => setSaleModal({ ...saleModal, open: false })}
                    onSave={handleSetSale}
                    onChange={(changes) => setSaleModal((prev) => ({ ...prev, ...changes }))}
                />

            )}
        </div>
    );
};
