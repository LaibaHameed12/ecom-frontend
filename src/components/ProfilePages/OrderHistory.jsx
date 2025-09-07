"use client";
import React, { useState } from "react";
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react";
import { useGetOrdersQuery } from "@/redux/slices/orders/ordersApi";
import { OrderDetails } from "./OrderDetails";

export const OrderHistory = () => {
    const [selectedTab, setSelectedTab] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ fetch from backend
    const { data: orders = [], isLoading } = useGetOrdersQuery();

    const getStatusIcon = (status) => {
        switch (status) {
            case "delivered":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "shipped":
                return <Truck className="w-5 h-5 text-blue-500" />;
            case "pending":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            default:
                return <Package className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-800";
            case "shipped":
                return "bg-blue-100 text-blue-800";
            case "paid":
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // ✅ sort newest first
    const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const filteredOrders =
        selectedTab === "all"
            ? sortedOrders
            : sortedOrders.filter((order) => order.status === selectedTab);


    if (isLoading) {
        return <p className="text-center text-gray-500">Loading orders...</p>;
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Order History
                </h2>

                {/* Filter Tabs */}
                <div className="flex space-x-4 mb-6 border-b border-gray-200">
                    {["all", "pending", "shipped", "delivered"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`pb-2 cursor-pointer px-1 text-sm font-medium border-b-2 transition-colors capitalize ${selectedTab === tab
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab} (
                            {tab === "all"
                                ? orders.length
                                : orders.filter((o) => o.status === tab).length}
                            )
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No orders found</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        {getStatusIcon(order.status)}
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Placed on{" "}
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-3">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between text-sm"
                                        >
                                            <span>
                                                {item.product?.title || item.product?.name} ×{" "}
                                                {item.quantity}
                                            </span>
                                            <span>${item.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <span className="text-sm text-gray-600">
                                        {order.paymentMethod === "points"
                                            ? <strong>Paid with {order.totalAmount / 250} points</strong>
                                            : <>Total: <strong>${order.totalAmount}</strong></>
                                        }
                                    </span>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-sm cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            <OrderDetails
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};
