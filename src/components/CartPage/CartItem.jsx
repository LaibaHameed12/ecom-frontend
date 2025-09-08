'use client'
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateItemQuantity } from '@/redux/slices/cart/cartSlice';
import { useRouter } from 'next/navigation';

export const CartItem = ({ product, productId, image, title, size, color, price, quantity, onRemove }) => {
    const dispatch = useDispatch();
    const router = useRouter()

    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(1, quantity + change);
        dispatch(updateItemQuantity({ product, size, color, quantity: newQuantity }));
    };

    return (
        <div
            onClick={() => router.push(`/products/${productId}`)}
            className="bg-white cursor-pointer rounded-2xl p-4 sm:p-6 shadow-sm
                       flex flex-col sm:flex-row sm:items-center sm:justify-between
                       space-y-4 sm:space-y-0"
        >
            {/* Mobile: Product Image and Details in Row */}
            <div className="flex items-start space-x-4 sm:flex-1">
                {/* Product Image */}
                <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>

                {/* Product Details */}
                <div className="flex-1 sm:ml-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 lowercase">{title}</h3>
                    <div className="space-y-0.5 sm:space-y-1">
                        <p className="text-sm sm:text-base text-gray-500">
                            <span className="font-medium">Size:</span> {size}
                        </p>
                        <p className="text-sm sm:text-base text-gray-500">
                            <span className="font-medium">Color:</span> {color}
                        </p>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">${price}</p>
                </div>
            </div>

            {/* Controls Container */}
            <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-between sm:space-y-12 sm:ml-4">
                {/* Delete Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(product, size, color);
                    }}
                    className="w-8 h-8 sm:w-8 sm:h-8 cursor-pointer bg-red-500 rounded-lg flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                    <Trash2 size={16} />
                </button>

                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-100 rounded-full">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(-1);
                        }}
                        className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <Minus size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    <span className="w-8 sm:w-12 text-center text-sm sm:text-base font-medium text-gray-900">
                        {quantity}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(1);
                        }}
                        className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};