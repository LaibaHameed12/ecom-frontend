'use client'

import { useState } from 'react';
import { ChevronRight, ChevronUp, Settings2, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setFilters, setPagination } from '@/redux/slices/products/productsSlice';

export default function SidebarFilters() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.products.filters);

    // Expanded sections state
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        colors: true,
        size: true,
        dressStyle: true,
    });

    // Local UI states mapped to Redux filters
    const [selectedColor, setSelectedColor] = useState(filters.colors?.[0] || null);
    const [selectedSize, setSelectedSize] = useState(filters.sizes?.[0] || null);
    const [priceRange, setPriceRange] = useState({
        min: filters.minPrice ?? 0,
        max: filters.maxPrice ?? 6000,
    });
    const [selectedCategories, setSelectedCategories] = useState(filters.categories || []);
    const [selectedDressStyle, setSelectedDressStyle] = useState(filters.dressStyle || []);

    // Categories data
    const categories = ['t-shirt', 'shorts', 'shirt', 'hoodie', 'jeans'];

    // Colors data
    const colors = [
        { name: 'green', value: 'green' },
        { name: 'white', value: 'white', border: true },
        { name: 'black', value: 'black' },
    ];

    // Sizes data
    const sizes = [
        'small',
        'medium',
        'large',
    ];

    // Dress styles data
    const dressStyles = ['casual', 'formal', 'party', 'gym'];

    // Price range configuration
    const priceConfig = {
        min: 0,
        max: 6000,
        step: 50,
    };

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleMinPriceChange = (e) => {
        const newMin = Math.min(Number(e.target.value), priceRange.max - priceConfig.step);
        setPriceRange({ ...priceRange, min: newMin });
    };

    const handleMaxPriceChange = (e) => {
        const newMax = Math.max(Number(e.target.value), priceRange.min + priceConfig.step);
        setPriceRange({ ...priceRange, max: newMax });
    };

    const getSliderBackground = () => {
        const minPercent = ((priceRange.min - priceConfig.min) / (priceConfig.max - priceConfig.min)) * 100;
        const maxPercent = ((priceRange.max - priceConfig.min) / (priceConfig.max - priceConfig.min)) * 100;
        return `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${minPercent}%, #000000 ${minPercent}%, #000000 ${maxPercent}%, #e5e7eb ${maxPercent}%, #e5e7eb 100%)`;
    };

    const handleApplyFilters = () => {
        // set filters
        dispatch(
            setFilters({
                categories: selectedCategories,
                dressStyle: selectedDressStyle,
                sizes: selectedSize ? [selectedSize] : [],
                colors: selectedColor ? [selectedColor] : [],
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
            })
        );

        // IMPORTANT: reset pagination to page 1 whenever filters change
        dispatch(setPagination({ page: 1 }));
    };

    return (
        <div className="w-auto bg-white border border-gray-200 rounded-2xl p-6 h-fit">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black">Filters</h2>
                <Settings2 className="w-5 h-5 text-gray-400" />
            </div>

            {/* Categories */}
            <div className="mb-8">
                <div className="space-y-4">
                    {categories.map((category) => (
                        <div
                            key={category}
                            onClick={() =>
                                setSelectedCategories((prev) =>
                                    prev.includes(category)
                                        ? prev.filter((c) => c !== category)
                                        : [...prev, category]
                                )
                            }
                            className={`flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded ${selectedCategories.includes(category) ? 'bg-gray-100' : ''
                                }`}
                        >
                            <span className="text-gray-600 text-base capitalize">{category}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-6"></div>

            {/* Price */}
            <div className="mb-8">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h3 className="text-lg font-bold text-black">Price</h3>
                    <ChevronUp
                        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${expandedSections.price ? '' : 'rotate-180'
                            }`}
                    />
                </button>

                {expandedSections.price && (
                    <div className="space-y-6">
                        {/* Range Slider Container */}
                        <div className="relative">
                            {/* Slider Track */}
                            <div
                                className="h-2 rounded-full"
                                style={{ background: getSliderBackground() }}
                            ></div>

                            {/* Min Range Input */}
                            <input
                                type="range"
                                min={priceConfig.min}
                                max={priceConfig.max}
                                step={priceConfig.step}
                                value={priceRange.min}
                                onChange={handleMinPriceChange}
                                className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                style={{
                                    background: 'transparent',
                                    pointerEvents: 'none',
                                }}
                            />

                            {/* Max Range Input */}
                            <input
                                type="range"
                                min={priceConfig.min}
                                max={priceConfig.max}
                                step={priceConfig.step}
                                value={priceRange.max}
                                onChange={handleMaxPriceChange}
                                className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                style={{
                                    background: 'transparent',
                                    pointerEvents: 'none',
                                }}
                            />
                        </div>

                        {/* Price Value Display */}
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 mb-1">Min</span>
                                <span className="text-sm font-semibold text-black">${priceRange.min}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-400">-</span>
                            <div className="flex flex-col text-right">
                                <span className="text-xs text-gray-500 mb-1">Max</span>
                                <span className="text-sm font-semibold text-black">${priceRange.max}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200 mb-6"></div>

            {/* Colors */}
            <div className="mb-8">
                <button
                    onClick={() => toggleSection('colors')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h3 className="text-lg font-bold text-black">Colors</h3>
                    <ChevronUp
                        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${expandedSections.colors ? '' : 'rotate-180'
                            }`}
                    />
                </button>

                {expandedSections.colors && (
                    <div className="grid grid-cols-5 gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${color.border ? 'border-gray-300' : 'border-transparent'
                                    } ${selectedColor === color.name
                                        ? 'ring-2 ring-gray-400 ring-offset-2'
                                        : ''
                                    }`}
                                style={{ backgroundColor: color.value }}
                            >
                                {selectedColor === color.name && (
                                    <Check
                                        className={`w-4 h-4 ${color.name === 'white' ? 'text-black' : 'text-white'
                                            }`}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200 mb-6"></div>

            {/* Size */}
            <div className="mb-8">
                <button
                    onClick={() => toggleSection('size')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h3 className="text-lg font-bold text-black">Size</h3>
                    <ChevronUp
                        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${expandedSections.size ? '' : 'rotate-180'
                            }`}
                    />
                </button>

                {expandedSections.size && (
                    <div className="grid grid-cols-2 gap-3">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${selectedSize === size
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200 mb-6"></div>

            {/* Dress Style */}
            <div className="mb-8">
                <button
                    onClick={() => toggleSection('dressStyle')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h3 className="text-lg font-bold text-black">Dress Style</h3>
                    <ChevronUp
                        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${expandedSections.dressStyle ? '' : 'rotate-180'
                            }`}
                    />
                </button>

                {expandedSections.dressStyle && (
                    <div className="space-y-4">
                        {dressStyles.map((style) => (
                            <div
                                key={style}
                                onClick={() =>
                                    setSelectedDressStyle((prev) =>
                                        prev.includes(style)
                                            ? prev.filter((s) => s !== style)
                                            : [...prev, style]
                                    )
                                }
                                className={`flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded ${selectedDressStyle.includes(style) ? 'bg-gray-100' : ''
                                    }`}
                            >
                                <span className="text-gray-600 text-base capitalize">{style}</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Apply Filter Button */}
            <button
                onClick={handleApplyFilters}
                className="w-full cursor-pointer bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
                Apply Filter
            </button>

            {/* Clear Filters Button */}
            <button
                onClick={() => {
                    // Reset Redux filters
                    dispatch(clearFilters());

                    // Reset local UI states
                    setSelectedCategories([]);
                    setSelectedDressStyle([]);
                    setSelectedSize(null);
                    setSelectedColor(null);
                    setPriceRange({ min: priceConfig.min, max: priceConfig.max });
                }}
                className="w-full mt-4 cursor-pointer bg-gray-200 text-gray-700 py-4 rounded-full font-medium hover:bg-gray-300 transition-colors duration-200"
            >
                Clear Filters
            </button>


            {/* Custom CSS for range slider */}
            <style jsx>{`
                .slider-thumb {
                    pointer-events: auto;
                }
                
                .slider-thumb::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #000000;
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    pointer-events: auto;
                    position: relative;
                    z-index: 1;
                }

                .slider-thumb::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #000000;
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    pointer-events: auto;
                    position: relative;
                    z-index: 1;
                }

                .slider-thumb::-webkit-slider-track {
                    background: transparent;
                }

                .slider-thumb::-moz-range-track {
                    background: transparent;
                }

                .slider-thumb:focus {
                    outline: none;
                }

                .slider-thumb:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
                }

                .slider-thumb:focus::-moz-range-thumb {
                    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
}