'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetProductByIdQuery, useGetRelatedProductsQuery } from '@/redux/slices/products/productsApi';

import { ProductImageGallery } from './ProductImageGallery';
import { ProductInfo } from './ProductInfo';
import { ProductVariants } from './ProductVariants';
import { CTAButtons } from './CTAButtons';
import { ProductReviews } from './ProductReviews';
import FAQ from './FAQ';
import ProductDetails from './ProductDetails';
import ReviewForm from './ReviewForm';
import RelatedProducts from './RelatedProducts';

// Single Product Skeleton Component
const SingleProductSkeleton = () => (
    <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Main Product Section Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Image Gallery Skeleton */}
                <div className="animate-pulse">
                    {/* Main image */}
                    <div className="aspect-square bg-gray-300 rounded-lg mb-4 w-full max-w-lg mx-auto"></div>

                    {/* Thumbnail images */}
                    <div className="flex gap-2 justify-center">
                        {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="w-16 h-16 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                </div>

                {/* Product Info Skeleton */}
                <div className="space-y-4 animate-pulse">
                    {/* Title */}
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                            {Array.from({ length: 5 }, (_, i) => (
                                <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                            ))}
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                        <div className="h-8 bg-gray-300 rounded w-24"></div>
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/5"></div>
                    </div>

                    {/* Variants Skeleton */}
                    <div className="space-y-4">
                        <div className="h-5 bg-gray-300 rounded w-16"></div>
                        <div className="flex gap-2">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div key={i} className="h-10 w-16 bg-gray-300 rounded border"></div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons Skeleton */}
                    <div className="space-y-3 pt-4">
                        <div className="h-12 bg-gray-300 rounded w-full"></div>
                        <div className="h-12 bg-gray-300 rounded w-full"></div>
                    </div>
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="border-t border-gray-200 pt-8">
                <div className="w-full flex items-center justify-center space-x-8 mb-8 animate-pulse">
                    {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="h-6 bg-gray-300 rounded w-24"></div>
                    ))}
                </div>

                {/* Tab Content Skeleton */}
                <div className="min-h-[400px] animate-pulse">
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                        <div className="space-y-2">
                            {Array.from({ length: 8 }, (_, i) => (
                                <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-48 mb-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="space-y-3">
                            <div className="aspect-square bg-gray-300 rounded-lg"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const SingleProductPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
    const { data: related = [], isLoading: loadingRelated } = useGetRelatedProductsQuery({ id, limit: 4 });

    const [selectedVariants, setSelectedVariants] = useState({});
    const [activeTab, setActiveTab] = useState('details');

    // Show skeleton during loading
    if (isLoading) return <SingleProductSkeleton />;

    if (isError || !product) return <div className="text-center py-20 text-red-500">Product not found.</div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div>
                        <ProductImageGallery images={product.images} />
                    </div>
                    <div className="space-y-4">
                        <ProductInfo product={product} />
                        <ProductVariants
                            variants={product.variants}
                            onVariantChange={setSelectedVariants}
                        />
                        <CTAButtons
                            product={product}
                            selectedVariants={selectedVariants}
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-200 pt-8">
                    <div className=" w-full flex items-center justify-center space-x-8 mb-8">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`pb-2 cursor-pointer w-xs sm:text-lg font-medium border-b-2 transition-colors ${activeTab === 'details'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Product Details
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-2 cursor-pointer w-xs sm:text-lg font-medium border-b-2 transition-colors ${activeTab === 'reviews'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Rating & Reviews
                        </button>
                        <button
                            onClick={() => setActiveTab('faq')}
                            className={`pb-2 cursor-pointer w-xs sm:text-lg font-medium border-b-2 transition-colors ${activeTab === 'faq'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            FAQs
                        </button>
                    </div>

                    <div className="min-h-[400px]">
                        {activeTab === 'details' && (
                            <div className="prose max-w-none">
                                <ProductDetails />
                            </div>
                        )}
                        {activeTab === 'reviews' &&
                            <div className="space-y-6">
                                <ProductReviews productId={product._id} />
                                <ReviewForm productId={product._id} />
                            </div>
                        }
                        {activeTab === 'faq' && (
                            <div className="space-y-6">
                                <FAQ />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loadingRelated ? (
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-48 mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 4 }, (_, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="aspect-square bg-gray-300 rounded-lg"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <RelatedProducts products={related} heading={'Related Products'} />
                )}
            </div>
        </div>
    );
};

export default SingleProductPage;