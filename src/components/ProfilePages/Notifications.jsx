// src/components/Profile/Notifications.js
"use client";
import {
    useGetUserNotificationsQuery, 
    useMarkAsReadMutation,
    useDeleteNotificationMutation,
} from "@/redux/slices/notifications/notificationsApi";
import { Bell, Package, Gift, AlertCircle, X, Check } from "lucide-react";


export const Notifications = ({userId}) => {
    const { data: notifications = [], isLoading } = useGetUserNotificationsQuery(userId);
    const [markAsRead] = useMarkAsReadMutation();
    const [deleteNotification] = useDeleteNotificationMutation();

    if (isLoading) return <p>Loading notifications...</p>;

    const unreadCount = notifications.filter((n) => !n.read).length;

    const getTypeIcon = (type) => {
        switch (type) {
            case "order":
                return Package;
            case "sale":
            case "promotion":
                return Gift;
            case "alert":
            case "admin":
                return AlertCircle;
            default:
                return Bell;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                    {unreadCount > 0 && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                            {unreadCount} new
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No notifications</p>
                    </div>
                ) : (
                    notifications.map((notification) => {
                        const Icon = getTypeIcon(notification.type);
                        return (
                            <div
                                key={notification._id}
                                className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${notification.read
                                    ? "bg-gray-50 border-gray-200"
                                    : "bg-blue-50 border-blue-200"
                                    }`}
                            >
                                <div className="p-2 rounded-full bg-white">
                                    <Icon className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                {notification.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-1 ml-2">
                                            {!notification.read && (
                                                <button
                                                    onClick={() => markAsRead(notification._id)}
                                                    className="p-1 text-gray-400 hover:text-green-600"
                                                    title="Mark as read"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            {/* <button
                                                onClick={() => deleteNotification(notification._id)}
                                                className="p-1 text-gray-400 hover:text-red-600"
                                                title="Delete"
                                            >
                                                <X className="w-4 h-4" />
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
