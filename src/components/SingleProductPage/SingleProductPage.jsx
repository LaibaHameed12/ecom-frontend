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

const SingleProductPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
    const { data: related = [], isLoading: loadingRelated } = useGetRelatedProductsQuery({ id, limit: 4 });

    const [selectedVariants, setSelectedVariants] = useState({});
    const [activeTab, setActiveTab] = useState('details');

    if (isLoading) return <div className="text-center py-20">Loading product...</div>;
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
                    <p className="text-center text-gray-500">Loading related products...</p>
                ) : (
                    <RelatedProducts products={related} heading={'Related Products'} />
                )}
            </div>

        </div>
    );
};

export default SingleProductPage;
