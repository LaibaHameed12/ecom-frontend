"use client";

import { Trash2, Plus, Package, DollarSign, FileText, Image, Palette, Ruler, ShoppingBag, Tag, Shirt } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateProductMutation } from "@/redux/slices/products/productsApi";
import { toast } from "react-toastify";
import { CreateProductSchema } from "../Schemas/CreateProduct";
import { PURCHASE_TYPES, DRESS_STYLES, SIZES, COLORS, GARMENTS } from "../constants/constants";
import { useRouter } from "next/navigation";

const CreateProductForm = () => {
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CreateProductSchema),
        defaultValues: {
            variants: [{ size: "", color: "", stock: 0 }],
            purchaseType: [],
            dressStyle: [],
            categories: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
    });

    const handleCreate = async (data) => {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", data.price);

            data.purchaseType.forEach((pt) => formData.append("purchaseType", pt));
            data.dressStyle.forEach((ds) => formData.append("dressStyle", ds));
            data.categories.forEach((c) => formData.append("categories", c));

            formData.append("variants", JSON.stringify(data.variants));

            if (data.images && data.images.length > 0) {
                Array.from(data.images).forEach((img) =>
                    formData.append("images", img)
                );
            }

            await createProduct(formData).unwrap();
            toast.success("Product created successfully 🎉");
            reset();
            router.push('/dashboard')
        } catch (err) {
            console.error("Failed to create product", err);
            toast.error("Failed to create product. Please try again.");
        }
    };

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
                            <h2 className="text-2xl font-bold text-gray-900">Create New Product</h2>
                            <p className="text-gray-500 text-sm">Add a new product to your inventory</p>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <form
                        onSubmit={handleSubmit(handleCreate)}
                        className="space-y-8"
                        encType="multipart/form-data"
                    >

                        {/* Basic Information Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Product Title
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("title")}
                                    placeholder="Enter product title"
                                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.title
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-200 hover:border-gray-300 focus:bg-white'
                                        }`}
                                />
                                {errors.title && (
                                    <p className="text-red-600 text-sm flex items-center gap-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={3}
                                    placeholder="Describe your product in detail"
                                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none ${errors.description
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-200 hover:border-gray-300 focus:bg-white'
                                        }`}
                                />
                                {errors.description && (
                                    <p className="text-red-600 text-sm">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Price
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        {...register("price")}
                                        placeholder="0.00"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.price
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 hover:border-gray-300 focus:bg-white'
                                            }`}
                                    />
                                </div>
                                {errors.price && (
                                    <p className="text-red-600 text-sm">{errors.price.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Images Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Image className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Images (min 3)
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${errors.images
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        {...register("images")}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-800 file:transition-colors"
                                    />
                                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
                                </div>
                                {errors.images && (
                                    <p className="text-red-600 text-sm">{errors.images.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Variants Section */}
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
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Variant
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

                        {/* Purchase Types Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <ShoppingBag className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Purchase Types</h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {PURCHASE_TYPES.map((pt) => (
                                    <label key={pt} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
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
                            {errors.purchaseType && (
                                <p className="text-red-600 text-sm">{errors.purchaseType.message}</p>
                            )}
                        </div>

                        {/* Dress Styles Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Shirt className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Dress Styles</h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {DRESS_STYLES.map((ds) => (
                                    <label key={ds} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
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
                            {errors.dressStyle && (
                                <p className="text-red-600 text-sm">{errors.dressStyle.message}</p>
                            )}
                        </div>

                        {/* Categories Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Tag className="w-4 h-4 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {GARMENTS.map((g) => (
                                    <label key={g} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
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
                            {errors.categories && (
                                <p className="text-red-600 text-sm">{errors.categories.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-gray-100">
                            <div className="flex gap-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Reset Form
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-8 py-3 cursor-pointer bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Package className="w-4 h-4" />
                                            Create
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProductForm;