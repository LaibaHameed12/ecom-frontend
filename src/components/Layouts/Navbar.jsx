'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getUser, isAdmin, isSuperadmin } from '@/redux/slices/auth/authSlice';
import { selectCartTotalQuantity } from '@/redux/slices/cart/cartSlice';
import Container from '../common/Container';
import { Search, ShoppingCart, User, ChevronDown, Menu, X, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
    const user = useSelector(getUser);
    const admin = useSelector(isAdmin);
    const superadmin = useSelector(isSuperadmin);
    const cartQuantity = useSelector(selectCartTotalQuantity);

    const [searchTerm, setSearchTerm] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isTopBarVisible, setIsTopBarVisible] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (user) setIsTopBarVisible(false);
    }, [user]);

    const handleCloseTopBar = () => setIsTopBarVisible(false);


    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
        }
    };


    return (
        <div className="inter">
            {/* Top bar */}
            {isTopBarVisible && !user && (
                <div className="bg-black flex items-center justify-evenly py-4 gap-2 text-white">
                    <p className="text-sm">
                        Sign up and get 20% off to your first order.
                        <Link href={'/register'} className="underline font-medium px-2">
                            Sign Up Now
                        </Link>
                    </p>
                    <X onClick={handleCloseTopBar} size={20} className="cursor-pointer" />
                </div>
            )}

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <Container>
                    <div className="w-full px-4 sm:px-6 lg:px-16">
                        <div className="flex items-center gap-12 justify-between h-20">
                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 rounded-md text-gray-600 hover:text-gray-900"
                                >
                                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>

                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href={'/'} className="text-2xl font-black text-black">SHOP.CO</Link>
                            </div>

                            {/* Desktop Navigation Links */}
                            <div className="hidden md:block">
                                <div className="flex items-center space-x-8">
                                    <div className="relative group">
                                        <button
                                            onClick={() => router.push('/products')}
                                            className="flex items-center cursor-pointer text-gray-900 hover:text-gray-600 font-medium text-base"
                                        >
                                            Shop
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </button>
                                    </div>

                                    <a
                                        href="#"
                                        className="text-gray-900 hover:text-gray-600 font-medium text-base cursor-pointer"
                                    >
                                        On Sale
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-900 hover:text-gray-600 font-medium text-base cursor-pointer"
                                    >
                                        New Arrivals
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-900 hover:text-gray-600 font-medium text-base cursor-pointer"
                                    >
                                        Brands
                                    </a>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="hidden sm:block flex-1 max-w-lg">
                                <form onSubmit={handleSearch} className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search for products..."
                                        className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </form>

                            </div>

                            {/* Right side icons */}
                            <div className="flex items-center space-x-4">
                                {/* Mobile search icon */}
                                <button className="sm:hidden p-2 text-gray-600 hover:text-gray-900">
                                    <Search className="h-5 w-5" />
                                </button>

                                {/* If NOT logged in → Sign Up + Login */}
                                {!user && (
                                    <>
                                        <Link href="/register" className="p-2 text-gray-600 hover:text-gray-900">
                                            Sign Up
                                        </Link>
                                        <Link href="/login" className="p-2 text-gray-600 hover:text-gray-900">
                                            Login
                                        </Link>
                                    </>
                                )}

                                {/* If Admin OR Superadmin → Dashboard */}
                                {user && (admin || superadmin) && (
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="py-2 px-6 rounded-lg flex items-center gap-2 cursor-pointer bg-black text-white hover:bg-gray-600"
                                    >
                                        <LayoutDashboard className="h-5 w-5" />
                                        Dashboard
                                    </button>
                                )}

                                {/* If normal user → Cart + Profile */}
                                {user && !admin && !superadmin && (
                                    <>
                                        <button
                                            onClick={() => router.push('/cart')}
                                            className="p-2 cursor-pointer text-gray-600 hover:text-gray-900 relative"
                                        >
                                            {cartQuantity > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                    {cartQuantity}
                                                </span>
                                            )}
                                            <ShoppingCart className="h-5 w-5" />
                                        </button>

                                        <Link href="/profile" className="p-2 text-gray-600 hover:text-gray-900">
                                            <User className="h-5 w-5" />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                                    {/* Mobile Search */}
                                    <div className="px-3 py-2">
                                        <form onSubmit={handleSearch} className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Search className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Search for products..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                        </form>

                                    </div>

                                    {/* Mobile Navigation Links */}
                                    <div className="space-y-1">
                                        <Link href={'/products'} className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md">
                                            Shop
                                            <ChevronDown className="h-4 w-4" />
                                        </Link>
                                        <a
                                            href="#"
                                            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md"
                                        >
                                            On Sale
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md"
                                        >
                                            New Arrivals
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md"
                                        >
                                            Brands
                                        </a>

                                        {/* Role-based mobile menu */}
                                        {!user && (
                                            <>
                                                <Link
                                                    href="/register"
                                                    className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md"
                                                >
                                                    Sign Up
                                                </Link>
                                                <Link
                                                    href="/login"
                                                    className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md"
                                                >
                                                    Login
                                                </Link>
                                            </>
                                        )}

                                        {user && (admin || superadmin) && (
                                            <button
                                                onClick={() => router.push('/dashboard')}
                                                className="w-full px-3 py-2 flex items-center gap-2 text-base font-medium text-white bg-black hover:bg-gray-600 rounded-md"
                                            >
                                                <LayoutDashboard className="h-5 w-5" />
                                                Dashboard
                                            </button>
                                        )}

                                        {user && !admin && !superadmin && (
                                            <>
                                                <button
                                                    onClick={() => router.push('/cart')}
                                                    className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md"
                                                >
                                                    <ShoppingCart className="h-5 w-5" />
                                                    {cartQuantity > 0 && (
                                                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                            {cartQuantity}
                                                        </span>
                                                    )}
                                                </button>
                                                <Link
                                                    href="/profile"
                                                    className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md"
                                                >
                                                    Profile
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </nav>
        </div>
    );
}
