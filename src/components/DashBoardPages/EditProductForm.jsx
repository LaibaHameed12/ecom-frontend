"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetProductByIdQuery, useUpdateProductMutation } from "@/redux/slices/products/productsApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Package,
    FileText,
    Image as ImageIcon,
    Palette,
    Ruler,
    Trash2,
    Plus,
    DollarSign,
    ShoppingBag,
    Shirt,
    Tag,
} from "lucide-react";
import { SIZES, COLORS, PURCHASE_TYPES, DRESS_STYLES, GARMENTS } from "../constants/constants";
import { EditProductSchema } from "../Schemas/EditProduct";

const EditProductForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: product, isLoading: isFetching } = useGetProductByIdQuery(id);
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    // State for images
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    // Initialize form after product is loaded
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(EditProductSchema, { context: { existingImages: product?.images || [] } }),
        defaultValues: {
            title: product?.title || "",
            description: product?.description || "",
            price: product?.price || "",
            images: [],
            variants: product?.variants?.length > 0 ? product.variants : [{ size: "", color: "", stock: 0 }],
            purchaseType: product?.purchaseType || [],
            dressStyle: product?.dressStyle || [],
            categories: product?.categories || [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
    });

    // Sync existing images
    useEffect(() => {
        if (product?.images) setExistingImages(product.images);
    }, [product]);

    // Watch new file uploads
    const watchImages = watch("images");
    useEffect(() => {
        if (watchImages && watchImages.length > 0) {
            const files = Array.from(watchImages);
            files.forEach((f) => (f.previewUrl = URL.createObjectURL(f)));
            setNewImages(files);
        }
    }, [watchImages]);

    // Cleanup object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            newImages.forEach((file) => URL.revokeObjectURL(file.previewUrl));
        };
    }, [newImages]);

    // Remove new image
    const handleRemoveNewImage = (index) => {
        const fileToRemove = newImages[index];
        URL.revokeObjectURL(fileToRemove.previewUrl);
        setNewImages((prev) => prev.filter((_, i) => i !== index));
    };

    // Remove existing image
    const handleRemoveExistingImage = (index) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", data.price);

            data.purchaseType.forEach((pt) => formData.append("purchaseType", pt));
            data.dressStyle.forEach((ds) => formData.append("dressStyle", ds));
            data.categories.forEach((c) => formData.append("categories", c));

            formData.append("variants", JSON.stringify(data.variants));

            // Append new images
            newImages.forEach((img) => formData.append("images", img));

            // Append remaining existing images
            formData.append("existingImages", JSON.stringify(existingImages));

            await updateProduct({ id, formData }).unwrap();
            toast.success("Product updated successfully 🎉");
            router.push("/dashboard");
        } catch (err) {
            console.error("Failed to update product", err);
            toast.error("Failed to update product. Please try again.");
        }
    };

    if (isFetching) return <div>Loading product details...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl sm:mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Update Product</h2>
                            <p className="text-gray-500 text-sm">Update product details in your inventory</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-8">
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title *</label>
                                <input
                                    type="text"
                                    {...register("title")}
                                    placeholder="Enter product title"
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.title ? "border-red-300 bg-red-50" : "border-gray-200"
                                        }`}
                                />
                                {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description *</label>
                                <textarea
                                    {...register("description")}
                                    rows={3}
                                    placeholder="Describe your product"
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.description ? "border-red-300 bg-red-50" : "border-gray-200"
                                        }`}
                                />
                                {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price *</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        {...register("price")}
                                        placeholder="0.00"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.price ? "border-red-300 bg-red-50" : "border-gray-200"
                                            }`}
                                    />
                                </div>
                                {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
                            </div>
                        </div>

                        {/* Images */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
                            </div>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                {...register("images")}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                            />

                            <div className="flex gap-2 flex-wrap mt-2">
                                {existingImages.map((src, i) => (
                                    <div key={`existing-${i}`} className="relative">
                                        <img src={src} alt={`existing-${i}`} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(i)}
                                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                {newImages.map((file, i) => (
                                    <div key={`new-${i}`} className="relative">
                                        <img src={file.previewUrl} alt={`new-${i}`} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveNewImage(i)}
                                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {errors.images && <p className="text-red-600 text-sm">{errors.images.message}</p>}
                        </div>

                        {/* Variants */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Palette className="w-4 h-4 text-gray-700" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Variants</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => append({ size: "", color: "", stock: 0 })}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg"
                                >
                                    <Plus className="w-4 h-4" /> Add Variant
                                </button>
                            </div>

                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Size</label>
                                                <div className="relative">
                                                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <select
                                                        {...register(`variants.${index}.size`)}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                                    >
                                                        <option value="">Size</option>
                                                        {SIZES.map((s) => (
                                                            <option key={s} value={s}>
                                                                {s}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Color</label>
                                                <div className="relative">
                                                    <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <select
                                                        {...register(`variants.${index}.color`)}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                                    >
                                                        <option value="">Color</option>
                                                        {COLORS.map((c) => (
                                                            <option key={c} value={c}>
                                                                {c}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                                <input
                                                    type="number"
                                                    placeholder="Stock"
                                                    {...register(`variants.${index}.stock`)}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-red-300 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {errors.variants && (
                                <p className="text-red-600 text-sm">{errors.variants.message}</p>
                            )}

                        </div>

                        {/* Purchase Types */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <ShoppingBag className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Purchase Types</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {PURCHASE_TYPES.map((pt) => (
                                    <label
                                        key={pt}
                                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            value={pt}
                                            {...register("purchaseType")}
                                            className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{pt}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.purchaseType && <p className="text-red-600 text-sm">{errors.purchaseType.message}</p>}
                        </div>

                        {/* Dress Styles */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Shirt className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Dress Styles</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {DRESS_STYLES.map((ds) => (
                                    <label
                                        key={ds}
                                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            value={ds}
                                            {...register("dressStyle")}
                                            className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{ds}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.dressStyle && <p className="text-red-600 text-sm">{errors.dressStyle.message}</p>}
                        </div>

                        {/* Categories */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Tag className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {GARMENTS.map((g) => (
                                    <label
                                        key={g}
                                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            value={g}
                                            {...register("categories")}
                                            className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{g}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.categories && <p className="text-red-600 text-sm">{errors.categories.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="cursor-pointer px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
                        >
                            {isUpdating ? "Updating..." : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductForm;
