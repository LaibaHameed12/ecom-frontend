// src/components/ReviewForm.jsx (or same path)
'use client'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateReviewMutation, useCanReviewQuery } from '@/redux/slices/reviews/reviewsApi';
import { useEffect } from 'react';
import { Star, MessageSquare, Send, ShoppingBag, CheckCircle } from 'lucide-react';

export default function ReviewForm({ productId }) {
    const { data: can, isLoading, refetch } = useCanReviewQuery(productId, { skip: !productId });
    const [createReview, { isLoading: isPosting, isSuccess, isError, error }] = useCreateReviewMutation();

    const { register, handleSubmit, reset, watch } = useForm({ defaultValues: { rating: 5, comment: '' } });
    const watchedRating = watch('rating');

    useEffect(() => {
        if (isSuccess) {
            reset();
            refetch();
        }
    }, [isSuccess, reset, refetch]);

    if (!productId) return null;
    if (isLoading) return (
        <div className="animate-pulse">
            <div className="bg-gray-100 h-32 rounded-2xl"></div>
        </div>
    );

    // if user never purchased this product
    if (can && !can.hasPurchased) {
        return (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Purchase Required</h3>
                        <p className="text-sm text-gray-600">You can only review products you have purchased and received.</p>
                    </div>
                </div>
            </div>
        );
    }

    // if purchased but no pending orders left
    if (can && (!can.canReview || (Array.isArray(can.pendingOrders) && can.pendingOrders.length === 0))) {
        return (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Review Complete</h3>
                        <p className="text-sm text-gray-600">You've already reviewed your delivered orders for this product. Thank you!</p>
                    </div>
                </div>
            </div>
        );
    }

    const onSubmit = async (data) => {
        try {
            const pendingOrders = Array.isArray(can?.pendingOrders) ? can.pendingOrders : [];
            const orderId = pendingOrders[0];
            if (!orderId) {
                toast.info('No eligible order found to review.');
                return;
            }

            await createReview({ productId, body: { ...data, orderId } }).unwrap();
            toast.success('Review submitted successfully.');
        } catch (err) {
            const msg = err?.data?.message || err?.error || err?.message;
            if (typeof msg === 'string' && msg.toLowerCase().includes('already reviewed')) {
                toast.info('You already reviewed this product for this order.');
            } else if (typeof msg === 'string') {
                toast.error(msg);
            } else {
                toast.error('Something went wrong while submitting your review.');
            }
            console.error('Review submit error', err);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Write a Review</h3>
                    <p className="text-sm text-gray-500">Share your experience with this product</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Rating Section */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <Star className="w-4 h-4" />
                        Rating
                    </label>

                    <div className="relative">
                        <select
                            {...register('rating')}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                        >
                            {[1, 2, 3, 4, 5].map(v => (
                                <option key={v} value={v} className="py-2">
                                    {v} Star{v > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>

                        {/* Custom Stars Display */}
                        <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex gap-1 pointer-events-none">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= watchedRating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Custom Dropdown Arrow */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <MessageSquare className="w-4 h-4" />
                        Your Review
                    </label>

                    <div className="relative">
                        <textarea
                            {...register('comment')}
                            rows={4}
                            placeholder="Tell us about your experience with this product..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none hover:bg-gray-100"
                        />

                        {/* Character count or word guide */}
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                            Optional
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isPosting}
                        className="group w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isPosting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                Submit Review
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}