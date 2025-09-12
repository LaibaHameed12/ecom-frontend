'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/redux/slices/cart/cartSlice';

function OrderSuccess() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionId) {
            dispatch(clearCart());
            console.log('Stripe session ID:', sessionId);
        }
    }, [sessionId, dispatch]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Success Icon */}
                <div className="mb-8">
                    <div className="mx-auto w-24 h-24 bg-black rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wide">
                        Payment Successful
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Thank you for your purchase! Your order has been placed successfully and you'll receive a confirmation email shortly.
                    </p>
                    
                    {/* Order Info */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                        <div className="flex items-center justify-center mb-3">
                            <Package className="w-5 h-5 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                Order Status
                            </span>
                        </div>
                        <p className="text-black font-semibold">Processing</p>
                        <p className="text-sm text-gray-500 mt-1">
                            We'll send you tracking information once your order ships
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center group"
                    >
                        <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        Continue Shopping
                    </Link>
                    
                    <Link
                        href="/profile"
                        className="w-full bg-white text-black py-4 px-6 rounded-lg font-semibold uppercase tracking-wide border-2 border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center group"
                    >
                        <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        View My Orders
                    </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">
                        Need help? Contact our support team
                    </p>
                    <Link
                        href="/contact"
                        className="text-black font-medium hover:underline transition-all duration-200"
                    >
                        support@example.com
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 border border-gray-200 rounded-full opacity-50"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-black rounded-full opacity-10"></div>
                <div className="absolute top-1/3 right-20 w-2 h-2 bg-black rounded-full opacity-30"></div>
                <div className="absolute bottom-1/3 left-20 w-3 h-3 border border-black rounded-full opacity-20"></div>
            </div>
        </div>
    );
}

export default function SuccessOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderSuccess/>
        </Suspense>
    )
}
