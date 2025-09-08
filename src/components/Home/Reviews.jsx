'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetAllReviewsQuery } from '@/redux/slices/reviews/reviewsApi';
import { ReviewCard } from '../common/ReviewCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewsSlider = () => {
    const { data: reviews = [], isLoading } = useGetAllReviewsQuery(15);

    // Filter reviews that have products
    const validReviews = reviews.filter(review => review.product);

    if (isLoading) return <div>Loading reviews...</div>;
    if (!validReviews.length) return <div>No reviews yet.</div>;

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
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
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
                style={{
                    '--swiper-pagination-bottom': '0px',
                    '--swiper-pagination-bullet-inactive-opacity': '1',
                }}
            >
                {validReviews.map((review) => (
                    <SwiperSlide key={review._id} className="!h-auto">
                        <div className="h-60 w-full">
                            <Link href={`/products/${review.product._id}`} className="block w-full h-full">
                                <ReviewCard
                                    review={review}
                                    className="h-full w-full flex flex-col"
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .reviews-swiper {
                    padding-bottom: 40px;
                }
                
                .reviews-swiper .swiper-slide {
                    height: auto !important;
                    display: flex !important;
                }
                
                .reviews-swiper .swiper-wrapper {
                    align-items: stretch;
                }
                
                .reviews-swiper .swiper-pagination {
                    position: relative;
                    margin-top: 24px;
                }
                
                .reviews-swiper .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    margin: 0 6px;
                    background-color: #d1d5db;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                
                .reviews-swiper .swiper-pagination-bullet-active {
                    background-color: #111827;
                    transform: scale(1.2);
                }
            `}</style>
        </div>
    );
};

export default ReviewsSlider;