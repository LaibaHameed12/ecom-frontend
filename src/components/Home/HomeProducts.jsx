import React from 'react';
import Container from '../common/Container';
import ProductCard from '../common/PoductCard';
import Link from 'next/link';

// Loading skeleton component that matches ProductCard structure
const ProductCardSkeleton = () => (
    <div className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Image skeleton - matches typical product card image */}
        <div className="w-full aspect-square bg-gray-300 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
        </div>

        {/* Content skeleton - matches typical product card content */}
        <div className="p-4 space-y-3">
            {/* Product name skeleton */}
            <div className="h-5 bg-gray-300 rounded w-4/5"></div>

            {/* Product description/category skeleton */}
            <div className="h-4 bg-gray-300 rounded w-3/5"></div>

            {/* Price skeleton */}
            <div className="flex items-center justify-between">
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>
);

const HomeProducts = ({ heading, products, isLoading }) => {
    return (
        <Container>
            <div className='flex flex-col items-center justify-between sm:justify-center py-12'>
                <h2 className='font-extrabold text-5xl uppercase text-center'>{heading}</h2>

                <div className='grid gap-6 w-full py-12 
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                px-4 sm:px-8 lg:px-16'>
                    {isLoading
                        ? products.map((_, idx) => (
                            <ProductCardSkeleton key={idx} />
                        ))
                        : products.map((product) => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                </div>

                {!isLoading && (
                    <Link
                        href={'/products'}
                        className='capitalize px-16 py-3 font-medium rounded-full border border-black/10'
                    >
                        view all
                    </Link>
                )}
            </div>
        </Container>
    )
}

export default HomeProducts;