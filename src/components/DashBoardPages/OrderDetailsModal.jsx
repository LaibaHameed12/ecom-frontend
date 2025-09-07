'use client';
import {
    X,
    MapPin,
    Package,
    CreditCard,
    User,
    Calendar,
    DollarSign,
} from 'lucide-react';
import Image from 'next/image';

export const OrderDetailsModal = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'paid': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Enhanced Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm" />

            {/* Modal Container */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Order Details
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Order #{order._id}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors duration-200 group"
                        >
                            <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="p-6 space-y-6">
                        {/* Customer & Order Info Card */}
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <User className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {order.user?.name || order.user?.email || 'Anonymous Customer'}
                                    </p>
                                    <p className="text-sm text-gray-500">Customer</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Calendar className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-gray-500">Order Date</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <MapPin className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {order.shippingAddress || 'No address provided'}
                                        </p>
                                        <p className="text-xs text-gray-500">Shipping Address</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Package className="w-4 h-4 text-orange-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                    Products ({order.items.length} items)
                                </h4>
                            </div>

                            <div className="space-y-4">
                                {order.items.map((item, i) => (
                                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                {item.product?.images?.length > 0 ? (
                                                    <Image
                                                        src={item.product?.images[0]}
                                                        alt={item.product?.title || 'Product'}
                                                        width={64}
                                                        height={64}
                                                        className="rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <Package className="w-6 h-6 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <h5 className="font-medium text-gray-900 lowercase mb-1">
                                                    {item.product?.title || 'Unknown Product'}
                                                </h5>
                                                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                                                    {item.size && (
                                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                                            Size: {item.size}
                                                        </span>
                                                    )}
                                                    {item.color && (
                                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                                            Color: {item.color}
                                                        </span>
                                                    )}
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                        Qty: {item.quantity}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    ${item.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment & Status Footer */}
                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <CreditCard className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {order.paymentMethod || 'Not specified'}
                                        </p>
                                        <p className="text-sm text-gray-500">Payment Method</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                        {order.status.toUpperCase()}
                                    </div>

                                    <div className="flex items-center gap-2 text-right">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            {/* <p className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                                                <DollarSign className="w-5 h-5" />
                                                {order.totalAmount}
                                            </p> */}
                                            <div className="flex items-center gap-2 font-medium text-gray-900">
                                                {order.paymentMethod === "points" && (
                                                    <div className='flex flex-col items-end justify-end'>
                                                        <p className="text-xl font-bold text-gray-900 flex items-center gap-1">
                                                            
                                                            <span>${order.totalAmount}</span>
                                                        </p>
                                                        <span>Paid with {order.totalAmount / 250} points</span>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};