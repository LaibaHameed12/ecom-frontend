import React from 'react';
import { Star } from 'lucide-react';

export const ProductInfo = ({ product }) => {
    const {
        title,
        description,
        price,
        averageRating,
        ratingCount,
        sale,
        pointsPrice,
        purchaseType,
    } = product;

    // ⭐ rating stars
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-5 h-5 ${index < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
            />
        ));
    };

    // 🏷️ sale price calculation
    const now = new Date();
    let discountPrice = null;
    let discountPercent = null;

    if (
        sale?.isOnSale &&
        (!sale.startsAt || new Date(sale.startsAt) <= now) &&
        (!sale.endsAt || new Date(sale.endsAt) >= now)
    ) {
        if (sale.discountType === 'percent' && sale.discountValue) {
            discountPercent = sale.discountValue;
            discountPrice = price - (price * sale.discountValue) / 100;
        } else if (sale.discountType === 'flat' && sale.discountValue) {
            discountPrice = Math.max(price - sale.discountValue, 0);
            discountPercent = Math.round((sale.discountValue / price) * 100);
        }
    }

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
                <div className="flex space-x-1">{renderStars(averageRating)}</div>
                <span className="text-sm text-gray-600">
                    {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings yet'}
                </span>
                {ratingCount > 0 && (
                    <span className="text-sm text-gray-500">
                        ({ratingCount} reviews)
                    </span>
                )}
            </div>

            {/* Price */}
            <div className="space-y-2">
                <div className="flex items-center space-x-3">
                    {discountPrice !== null ? (
                        <>
                            <span className="text-2xl font-bold text-red-600">
                                ${discountPrice.toFixed(2)}
                            </span>
                            <span className="text-xl text-gray-500 line-through">
                                ${price}
                            </span>
                            {discountPercent && (
                                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                                    -{discountPercent}%
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-3xl font-bold text-gray-900">${price}</span>
                    )}
                </div>

                {purchaseType?.includes('points') && (
                    <div className="text-sm text-blue-600 font-medium">
                        Or pay with {pointsPrice} points
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 pb-4">
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};
