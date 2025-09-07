'use client';
import {
    ShoppingCart,
    Eye,
    Calendar,
    DollarSign,
    User,
} from 'lucide-react';
import { useState } from 'react';
import {
    useGetOrdersQuery,
    useUpdateOrderMutation,
} from '@/redux/slices/orders/ordersApi';
import { OrderDetailsModal } from './OrderDetailsModal';

export const OrdersList = () => {
    const { data: orders = [], isLoading, isError } = useGetOrdersQuery();
    const [updateOrder] = useUpdateOrderMutation();
    const [viewingOrder, setViewingOrder] = useState(null);

    const statusOptions = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

    const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

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

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateOrder({ id, status: newStatus }).unwrap();
        } catch (err) {
            console.error('Failed to update order status:', err);
            alert('Failed to update order status. Please try again.');
        }
    };

    if (isLoading) {
        return <div className="p-6 text-gray-600">Loading orders...</div>;
    }

    if (isError) {
        return <div className="p-6 text-red-500">Failed to load orders.</div>;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Orders Management</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Products</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 px-4 font-medium text-gray-900">#{order._id}</td>
                                <td className="py-4 px-4">
                                    <div className="text-sm text-gray-600 lowercase">
                                        {order.items
                                            .map((item) => `${item.product?.title || 'Unknown'} (x${item.quantity})`)
                                            .join(', ')}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-900">
                                            {order.user?.name || order.user?.email || 'N/A'}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2 font-medium text-gray-900">
                                        {order.paymentMethod === "points" ? (
                                            <span className='text-xs' >{order.totalAmount / 250 } points</span>
                                        ) : (
                                            <>
                                                <DollarSign className="w-4 h-4" />
                                                <span>${order.totalAmount}</span>
                                            </>
                                        )}
                                    </div>

                                </td>
                                <td className="py-4 px-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)} focus:outline-none focus:ring-2 focus:ring-gray-200`}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-4 px-4">
                                    <button
                                        onClick={() => setViewingOrder(order)}
                                        className="p-1 cursor-pointer rounded hover:bg-gray-100 text-gray-600 transition-colors"
                                        title="View Order Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal */}
            <OrderDetailsModal
                order={viewingOrder}
                isOpen={!!viewingOrder}
                onClose={() => setViewingOrder(null)}
            />
        </div>
    );
};