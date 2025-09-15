"use client";

import { logout, getUser } from "@/redux/slices/auth/authSlice";
import { User, ChevronDown, Home, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsDropdownOpen(false);
        router.push("/login"); // Redirect to login page
    };

    const handleHomeClick = () => {
        router.push("/");
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors"
                    >
                        Admin Dashboard
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500">
                            Welcome, {user?.fullName || user?.username || "Admin"}
                        </div>

                        {/* User Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center cursor-pointer gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2"
                            >
                                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    {/* Home Option */}
                                    <button
                                        onClick={handleHomeClick}
                                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <Home className="w-4 h-4" />
                                        Home
                                    </button>

                                    {/* Divider */}
                                    <div className="border-t border-gray-100 my-1"></div>

                                    {/* Logout Option */}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;