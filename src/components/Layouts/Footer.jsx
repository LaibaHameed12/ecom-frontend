import { Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';
import Container from '../common/Container';

export default function Footer() {
    return (
        <footer className="bg-gray-100">
            {/* Newsletter Section */}
            <Container>
                <div className="bg-black rounded-3xl mx-4 sm:mx-8 lg:mx-16 -mb-16 relative z-10">
                    <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                            <div className="text-center lg:text-left">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-2xl">
                                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                                </h2>
                            </div>

                            <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[350px]">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full pl-12 pr-6 py-4 rounded-full text-gray-900 placeholder-gray-500 border-0 focus:ring-2 bg-white focus:ring-white focus:outline-none"
                                    />
                                </div>
                                <button className="w-full bg-white text-black py-4 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
                                    Subscribe to Newsletter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Main Footer Content */}
            <div className="pt-24 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">

                        {/* Brand Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-2xl sm:text-3xl font-black text-black">SHOP.CO</h3>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                                We have clothes that suits your style and which you're proud to wear. From women to men.
                            </p>

                            {/* Social Media Icons */}
                            <div className="flex space-x-3">
                                <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
                                    <Twitter className="h-5 w-5 text-gray-700" />
                                </div>
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 cursor-pointer transition-colors">
                                    <Facebook className="h-5 w-5 text-white" />
                                </div>
                                <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
                                    <Instagram className="h-5 w-5 text-gray-700" />
                                </div>
                                <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
                                    <Github className="h-5 w-5 text-gray-700" />
                                </div>
                            </div>
                        </div>

                        {/* Company Links */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-black text-base tracking-widest">COMPANY</h4>
                            <div className="space-y-3">
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">About</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Features</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Works</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Career</a>
                            </div>
                        </div>

                        {/* Help Links */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-black text-base tracking-widest">HELP</h4>
                            <div className="space-y-3">
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Customer Support</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Delivery Details</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Terms & Conditions</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Privacy Policy</a>
                            </div>
                        </div>

                        {/* FAQ Links */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-black text-base tracking-widest">FAQ</h4>
                            <div className="space-y-3">
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Account</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Manage Deliveries</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Orders</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Payments</a>
                            </div>
                        </div>

                        {/* Resources Links */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-black text-base tracking-widest">RESOURCES</h4>
                            <div className="space-y-3">
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Free eBooks</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Development Tutorial</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">How to - Blog</a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm transition-colors">Youtube Playlist</a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-gray-300 mt-12 pt-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-gray-600 text-sm">
                                Shop.co © 2000-2023, All Rights Reserved
                            </p>

                            {/* Payment Methods */}
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">VISA</span>
                                </div>
                                <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center">
                                    <div className="flex space-x-0.5">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">PayPal</span>
                                </div>
                                <div className="w-12 h-8 bg-black rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">Pay</span>
                                </div>
                                <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                                    <span className="text-black text-xs font-bold">G Pay</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}