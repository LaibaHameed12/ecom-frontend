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
        <div onClick={()=> router.push(`/products/${productId}`)} className="bg-white cursor-pointer rounded-2xl p-6 flex items-center justify-between shadow-sm">
            {/* Product Image */}
            <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* Product Details */}
            <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 lowercase">{title}</h3>
                <div className="space-y-1">
                    <p className="text-gray-500">
                        <span className="font-medium">Size:</span> {size}
                    </p>
                    <p className="text-gray-500">
                        <span className="font-medium">Color:</span> {color}
                    </p>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">${price}</p>
            </div>

            {/* Quantity Controls and Delete */}
            <div className="flex flex-col items-end justify-between space-y-12">
                {/* Delete Button */}
                <button
                    onClick={() => onRemove(product, size, color)}
                    className="w-8 h-8 cursor-pointer bg-red-500 rounded-lg flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                    <Trash2 size={16} />
                </button>

                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-100 rounded-full">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-10 h-10 cursor-pointer flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">
                        {quantity}
                    </span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 cursor-pointer flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
