'use client'
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
    const {
        _id,
        title,
        images,
        price,
        averageRating,
        sale, // ✅ sale object from backend
    } = product;

    const router = useRouter();

    // ✅ calculate discount if sale is active and within timeframe
    const now = new Date();
    let discountPrice = null;
    let discountPercent = null;

    if (
        sale?.isOnSale &&
        (!sale.startsAt || new Date(sale.startsAt) <= now) &&
        (!sale.endsAt || new Date(sale.endsAt) >= now)
    ) {
        if (sale.discountType === "percent" && sale.discountValue) {
            discountPercent = sale.discountValue;
            discountPrice = price - (price * sale.discountValue) / 100;
        } else if (sale.discountType === "flat" && sale.discountValue) {
            discountPrice = Math.max(price - sale.discountValue, 0);
            discountPercent = Math.round((sale.discountValue / price) * 100);
        }
    }

    return (
        <div
            onClick={() => router.push(`products/${_id}`)}
            className="max-w-sm cursor-pointer"
        >
            {/* Product Image */}
            <div className="relative overflow-hidden">
                <div className="w-[300px] h-[300px] flex items-center justify-center">
                    <Image
                        src={images?.[0] || "/assets/product.png"}
                        alt={title || "product image"}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300 rounded-4xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                    />
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
                {/* Product Name */}
                <h3 className="text-lg font-medium lowercase text-black leading-tight truncate">
                    {title}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-4 h-4 ${star <= Math.round(averageRating || 0)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">
                        {averageRating ? `${averageRating.toFixed(1)}/5` : "No reviews"}
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-black">
                        ${discountPrice !== null ? discountPrice.toFixed(2) : price}
                    </span>
                    {discountPrice !== null && (
                        <>
                            <span className="text-lg text-gray-400 line-through">
                                ${price}
                            </span>
                            {discountPercent && (
                                <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded-full">
                                    -{discountPercent}%
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
