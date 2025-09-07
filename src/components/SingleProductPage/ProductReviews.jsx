'use client';
import React from 'react';
import { useGetReviewsQuery } from '@/redux/slices/reviews/reviewsApi';
import { ReviewCard } from '../common/ReviewCard';

export const ProductReviews = ({ productId }) => {
    const { data: reviews = [], isLoading, isFetching, error } = useGetReviewsQuery(productId, { skip: !productId });

    if (!productId) return null;
    if (isLoading || isFetching) return <div>Loading reviews...</div>;
    if (error) return <div className="text-red-600">Failed to load reviews.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                    All Reviews ({reviews?.length || 0})
                </h3>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))
                ) : (
                    <div className="text-gray-600 col-span-full">No reviews yet.</div>
                )}
            </div>
        </div>
    );
};
