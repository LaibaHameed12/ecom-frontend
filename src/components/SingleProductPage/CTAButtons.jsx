'use client'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { addItem } from '@/redux/slices/cart/cartSlice';
import { getUser } from '@/redux/slices/auth/authSlice';

export const CTAButtons = ({ product, selectedVariants }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const user = useSelector(getUser);
    const roles = (user?.roles || []).map((r) => r.toLowerCase());
    const isAdmin = roles.includes('admin');
    const isSuper = roles.includes('superadmin');

    // 🏷️ Discount logic
    const now = new Date();
    let finalPrice = product.price;

    if (
        product.sale?.isOnSale &&
        (!product.sale.startsAt || new Date(product.sale.startsAt) <= now) &&
        (!product.sale.endsAt || new Date(product.sale.endsAt) >= now)
    ) {
        if (product.sale.discountType === 'percent' && product.sale.discountValue) {
            finalPrice =
                product.price - (product.price * product.sale.discountValue) / 100;
        } else if (product.sale.discountType === 'flat' && product.sale.discountValue) {
            finalPrice = Math.max(product.price - product.sale.discountValue, 0);
        }
    }

    const handleQuantityChange = (action) => {
        if (action === 'increase') {
            setQuantity((prev) => prev + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (!selectedVariants.size || !selectedVariants.color) {
            alert('Please select size and color before adding to cart.');
            return;
        }

        dispatch(
            addItem({
                product: product._id,
                size: selectedVariants.size,
                color: selectedVariants.color,
                quantity,
                price: finalPrice,
                title: product.title,
                image: product.images[0],
                purchaseType: product.purchaseType,
            })
        );

        alert('Product added to cart!');
    };

    return (
        <div className="pt-4">
            {!isAdmin && !isSuper && (
                <div className="flex items-center flex-col gap-6 sm:flex-row space-x-4">
                    {/* Quantity buttons */}
                    <div className="flex items-center bg-[#F0F0F0] rounded-full">
                        <button
                            onClick={() => handleQuantityChange('decrease')}
                            className="py-3 px-6 cursor-pointer"
                            disabled={quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-3 text-center min-w-[3rem]">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange('increase')}
                            className="py-3 px-6 cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Add to Cart button */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            )}
        </div>
    );
};
