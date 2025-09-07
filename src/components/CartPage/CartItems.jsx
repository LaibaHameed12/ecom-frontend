'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from './CartItem';
import { removeItem } from '@/redux/slices/cart/cartSlice';

const CartItems = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveItem = (product, size, color) => {
        dispatch(removeItem({ product, size, color }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
                {cartItems.map((item) => (
                    <CartItem
                        key={`${item.product}-${item.size}-${item.color}`}
                        product={item.product}
                        image={item.image}
                        title={item.title}
                        size={item.size}
                        color={item.color}
                        price={item.price}
                        quantity={item.quantity}
                        onRemove={handleRemoveItem}
                    />
                ))}

                {cartItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartItems;
