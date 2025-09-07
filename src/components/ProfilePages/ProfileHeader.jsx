// ProfileHeader.js
import React from 'react';
import { User, LogOut } from 'lucide-react';

export const ProfileHeader = ({ user, onLogout }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                            {user.status}
                        </span>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={onLogout}
                        className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};