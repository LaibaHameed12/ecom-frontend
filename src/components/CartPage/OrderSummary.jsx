'use client'
import React, { useState } from 'react';
import { Tag, ArrowRight, MapPin, CreditCard, Wallet } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '@/redux/slices/orders/ordersApi';
import { clearCart } from '@/redux/slices/cart/cartSlice';

const OrderSummary = ({ discountPercentage = 20, deliveryFee = 0 }) => {
    const [promoCode, setPromoCode] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const cartItems = useSelector((state) => state.cart.items);
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = Math.round((subtotal * discountPercentage) / 100);
    const total = subtotal - discountAmount + deliveryFee;

    const handleCheckout = async () => {
        if (!address) {
            alert('Please enter delivery address.');
            return;
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        try {
            const orderPayload = {
                items: cartItems.map((item) => ({
                    product: item.product,
                    size: item.size,
                    color: item.color,
                    quantity: item.quantity,
                    price: item.price,
                })),
                shippingAddress: address,
                paymentMethod,
                paymentIntentId: null, // later when integrating Stripe
            };

            const response = await createOrder(orderPayload).unwrap();
            console.log('Order placed successfully:', response);

            dispatch(clearCart());
            alert('Order placed successfully!');
        } catch (err) {
            console.error('Checkout failed:', err);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-6 shadow-sm max-w-md mx-auto mb-6">
                {/* Address Section */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                <div className="relative mb-6">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <MapPin size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Enter your delivery address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                {/* Payment Method Section */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                    {/* Card Payment */}
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-3"
                        />
                        <div className="flex items-center">
                            <CreditCard className="text-gray-600 mr-3" size={20} />
                            <div>
                                <span className="text-gray-900 font-medium">Credit/Debit Card</span>
                                <p className="text-gray-500 text-sm">Pay with your card</p>
                            </div>
                        </div>
                    </label>

                    {/* Points Payment */}
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                            type="radio"
                            name="payment"
                            value="points"
                            checked={paymentMethod === 'points'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-3"
                        />
                        <div className="flex items-center">
                            <Wallet className="text-gray-600 mr-3" size={20} />
                            <div>
                                <span className="text-gray-900 font-medium">Loyalty Points</span>
                                <p className="text-gray-500 text-sm">Use your reward points</p>
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-lg">Subtotal</span>
                        <span className="text-lg font-semibold text-gray-900">${subtotal}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-lg">Discount (-{discountPercentage}%)</span>
                        <span className="text-lg font-semibold text-red-500">-${discountAmount}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-lg">Delivery Fee</span>
                        <span className="text-lg font-semibold text-gray-900">${deliveryFee}</span>
                    </div>
                </div>

                <hr className="border-gray-200 mb-6" />

                <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${total}</span>
                </div>

                <div className="flex gap-3 mb-6">
                    <div className="flex-1 relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Tag size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Add promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-full text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>
                    <button
                        className="px-8 py-4 cursor-pointer bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Apply
                    </button>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full py-4 cursor-pointer bg-black text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                    {isLoading ? 'Processing...' : 'Go to Checkout'}
                    <ArrowRight size={20} />
                </button>
            </div>
        </>
    );
};

export default OrderSummary;
