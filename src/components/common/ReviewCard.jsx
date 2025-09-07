'use client';

import React from 'react';
import { Star, VerifiedIcon } from 'lucide-react';

export const ReviewCard = ({ review }) => {
    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));

    return (
        <div className="border rounded-[20px] p-6 border-gray-200 h-full w-full">
            <div className="flex flex-col space-y-3">
                <div className="flex space-x-1">{renderStars(review.rating)}</div>

                <div className="flex items-center space-x-1">
                    <h4 className="font-bold text-gray-900">
                        {review.user?.fullName || 'Anonymous'}
                    </h4>
                    {review.order && <VerifiedIcon className="text-white fill-[#01AB31]" />}
                </div>

                {review.comment && <p className="text-gray-700 leading-relaxed">{review.comment}</p>}

                <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};
