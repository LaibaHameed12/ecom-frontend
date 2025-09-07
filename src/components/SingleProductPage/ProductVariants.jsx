
// ProductVariants.jsx
'use client'
import React, { useState, useEffect } from 'react';

export const ProductVariants = ({ variants = [], onVariantChange }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    // Extract unique sizes and colors from variants
    const sizes = [...new Set(variants.map(v => v.size))];
    const colors = [...new Set(variants.map(v => v.color))];

    // Get stock for selected combination
    const getStock = () => {
        if (!selectedSize || !selectedColor) return 0;
        const variant = variants.find(v => v.size === selectedSize && v.color === selectedColor);
        return variant ? variant.stock : 0;
    };

    const colorClasses = {
        black: 'bg-black',
        white: 'bg-white border-gray-300',
        green: 'bg-green-500',
    };

    useEffect(() => {
        if (onVariantChange) {
            onVariantChange({ size: selectedSize, color: selectedColor });
        }
    }, [selectedSize, selectedColor, onVariantChange]);

    return (
        <div className="space-y-4">
            {/* Colors */}
            {colors.length > 0 && (
                <div className='border-b border-black/10 pb-4 '>
                    <h3 className=" font-medium text-black/60 mb-3">Select Color</h3>
                    <div className="flex flex-wrap gap-3">
                        {colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${colorClasses[color] || 'bg-gray-400'
                                    } ${selectedColor === color
                                        ? 'ring-2 ring-black ring-offset-2'
                                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
                                    }`}
                                title={color.charAt(0).toUpperCase() + color.slice(1)}
                            >
                                {color === 'white' && <div className="w-6 h-6 border border-gray-300 rounded-full" />}
                            </button>
                        ))}
                    </div>
                    {/* {selectedColor && (
                        <p className="text-sm text-gray-600 mt-2 capitalize">
                            Selected: {selectedColor}
                        </p>
                    )} */}
                </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
                <div className='border-b border-black/10 pb-4'>
                    <h3 className=" font-medium text-black/60 mb-3">Choose Size</h3>
                    <div className="flex flex-wrap gap-3">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all capitalize ${selectedSize === size
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-300 text-gray-900 hover:border-gray-400'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Stock Information */}
            {selectedSize && selectedColor && (
                <div className="flex items-center space-x-2 text-sm">
                    <span className={`font-medium ${getStock() > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {getStock() > 0 ? `${getStock()} in stock` : 'Out of stock'}
                    </span>
                </div>
            )}
        </div>
    );
};
