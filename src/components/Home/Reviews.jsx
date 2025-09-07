'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetAllReviewsQuery } from '@/redux/slices/reviews/reviewsApi';
import { ReviewCard } from '../common/ReviewCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewsSlider = () => {
    const { data: reviews = [], isLoading } = useGetAllReviewsQuery(15);

    if (isLoading) return <div>Loading reviews...</div>;
    if (!reviews.length) return <div>No reviews yet.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
                    OUR HAPPY CUSTOMERS
                </h2>

                {/* Navigation Arrows */}
                <div className="flex items-center space-x-2">
                    <button className="swiper-button-prev-custom p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="swiper-button-next-custom p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !bg-gray-300 !opacity-100',
                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-gray-900',
                }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 3 },
                }}
                className="reviews-swiper"
            >
                {reviews.map((review) =>
                    review.product ? (
                        <SwiperSlide key={review._id} className="flex h-60">
                            <Link href={`/products/${review.product._id}`} className="w-full h-full">
                                <ReviewCard review={review} className="h-full w-full" />
                            </Link>
                        </SwiperSlide>
                    ) : null
                )}
            </Swiper>
        </div>
    );
};

export default ReviewsSlider;
