'use client'
import React, { useState } from 'react';
import Image from 'next/image';

export const ProductImageGallery = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="w-full flex  gap-4">
            {/* Thumbnail Images - Left Side */}
            <div className="flex flex-col justify-between h-[500px] w-[120px]">
                {images.slice(0, 3).map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-full h-[158px] relative rounded-lg overflow-hidden border-2 transition-all bg-gray-50 ${selectedImage === index
                                ? 'border-black ring-2 ring-black ring-opacity-20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Product thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image Display - Right Side */}
            <div className="flex-1">
                <div className="h-[500px] relative bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                        src={images[selectedImage] || "/placeholder-product.jpg"}
                        alt="Product Image"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};
