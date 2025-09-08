export default function HeroSection() {
    return (
        // bg-[#F0F0F0] 
        <section className="relative  bg-[#F0F0F0]  min-h-screen flex flex-col items-center overflow-hidden w-full">
            {/* Background Pattern/Texture */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div> */}

            <div className="relative z-10 w-full max-w-[1440px] px-4 sm:px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] ">
                    {/* Left Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold font-sans sm:text-5xl lg:text-6xl text-black leading-tight">
                                FIND CLOTHES
                                <br />
                                THAT MATCHES
                                <br />
                                YOUR STYLE
                            </h1>

                            <p className="text-base text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                            </p>
                        </div>

                        <div className="flex justify-center lg:justify-start">
                            <button className="bg-black cursor-pointer text-white px-20 py-4 rounded-full text-base font-medium hover:bg-gray-800 duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                                Shop Now
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-center lg:justify-start space-x-8 pt-8">
                            <div className="text-center lg:text-left">
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900">200+</div>
                                <div className="text-sm text-gray-600">International Brands</div>
                            </div>
                            <div className="h-12 w-px bg-gray-300"></div>
                            <div className="text-center lg:text-left">
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900">2,000+</div>
                                <div className="text-sm text-gray-600">High-Quality Products</div>
                            </div>
                            <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
                            <div className="text-center lg:text-left hidden sm:block">
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900">30,000+</div>
                                <div className="text-sm text-gray-600">Happy Customers</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Main Image Placeholder - Replace with actual image */}
                            <div className="w-80 h-96 sm:w-96 sm:h-[500px] lg:w-[450px] lg:h-[600px] overflow-hidden relative">
                                {/* Placeholder for the actual image */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <img
                                            src="/assets/Hero-section.jpg"
                                            alt="Stylish couple wearing modern outerwear"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-8 -right-4 w-20 h-20">
                            <img src='/assets/large.png' alt="image"  />
                            </div>
                            <div className="absolute top-1/3 -left-6 w-32 h-32">
                            <img src='/assets/small.png' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black flex items-center justify-between flex-wrap py-6 w-full px-4 sm:px-6 lg:px-16" >
                    <img src="/assets/img1.png" />
                    <img src="/assets/img2.png" />
                    <img src="/assets/img3.png" />
                    <img src="/assets/img4.png" />
                    <img src="/assets/img.png" />
                </div>
        </section>
    );
}