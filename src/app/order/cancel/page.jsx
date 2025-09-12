'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft, ShoppingCart, CreditCard } from 'lucide-react';
import { Suspense } from 'react';

function OrderCancel() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Cancel Icon */}
                <div className="mb-8">
                    <div className="mx-auto w-24 h-24 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
                        <XCircle className="w-12 h-12 text-gray-600" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wide">
                        Payment Cancelled
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Your payment was cancelled and no charges were made. Your items are still in your cart if you'd like to complete your purchase.
                    </p>

                    {/* Info Box */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                        <div className="flex items-center justify-center mb-3">
                            <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                Transaction Status
                            </span>
                        </div>
                        <p className="text-black font-semibold">No Payment Processed</p>
                        <p className="text-sm text-gray-500 mt-1">
                            You have not been charged for this order
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link
                        href="/cart"
                        className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center group"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        Return to Cart
                    </Link>

                    <Link
                        href="/"
                        className="w-full bg-white text-black py-4 px-6 rounded-lg font-semibold uppercase tracking-wide border-2 border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        Continue Shopping
                    </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">
                        Having trouble with checkout?
                    </p>
                    <div className="space-y-2">
                        <Link
                            href="/contact"
                            className="block text-black font-medium hover:underline transition-all duration-200"
                        >
                            Contact Support
                        </Link>
                        <Link
                            href="/help"
                            className="block text-gray-600 hover:text-black transition-all duration-200"
                        >
                            Payment Help Center
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 border border-gray-200 rounded-full opacity-50"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-gray-100 rounded-full opacity-60"></div>
                <div className="absolute top-1/3 right-20 w-2 h-2 bg-gray-400 rounded-full opacity-40"></div>
                <div className="absolute bottom-1/3 left-20 w-3 h-3 border border-gray-300 rounded-full opacity-30"></div>
            </div>
        </div>
    );
}

export default function CancelOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderCancel />
        </Suspense>
    )
}