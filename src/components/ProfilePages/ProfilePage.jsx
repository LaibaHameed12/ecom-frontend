'use client'
import React, { useState } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { OrderHistory } from './OrderHistory';
import { Notifications } from './Notifications';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from '@/redux/slices/users/usersApi';
import { logout } from '@/redux/slices/auth/authSlice';
import { Bell, Box } from 'lucide-react';

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const dispatch = useDispatch();

    // ✅ Fetch real profile from backend
    const { data: user, isLoading, isError } = useGetProfileQuery();

    if (isLoading) return <p className="text-center py-10">Loading profile...</p>;
    if (isError || !user) return <p className="text-center py-10 text-red-500">Failed to load profile</p>;

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            dispatch(logout());
            window.location.href = '/login';
        }
    };



    const tabs = [
        { id: 'orders', label: 'Order History', icon: <Box/> },
        { id: 'notifications', label: 'Notifications', icon: <Bell/> },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* ✅ Real User */}
                <ProfileHeader
                    user={{
                        name: user.fullName,
                        email: user.email,
                        status: user.isVerified ? 'Verified Member' : 'Pending Verification',
                    }}
                    onLogout={handleLogout}
                />

                {/* Stats (replace with backend fields) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <p className="text-sm text-gray-600">Loyalty Points</p>
                        <p className="text-lg font-semibold text-gray-900">{user.loyaltyPoints}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {user.isActive ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="flex space-x-8 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 cursor-pointer text-sm font-medium border-b-2 flex items-center space-x-2 ${
                                    activeTab === tab.id
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {activeTab === 'orders' && <OrderHistory userId={user._id} />}
                    {activeTab === 'notifications' && <Notifications userId={user._id} />}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
