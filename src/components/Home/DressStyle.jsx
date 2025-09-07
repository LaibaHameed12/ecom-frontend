"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BrowseDressStyle() {
    const router = useRouter();
    return (
        <div className='px-16 pb-20'>
            <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-16 rounded-4xl">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black">
                            BROWSE BY DRESS STYLE
                        </h2>
                    </div>

                    {/* Style Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* First Row */}
                        <div className="lg:col-span-1">
                            {/* Casual Card */}
                            <div onClick={()=>router.push('/products')} className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-72 group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
                                    <Image
                                        src="/assets/fram1.png"
                                        alt="Casual style clothing"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            {/* Formal Card */}
                            <div onClick={()=>router.push('/products')} className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-72 group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">

                                    {/* Replace with Next.js Image: */}
                                    <Image
                                        src="/assets/frame2.png"
                                        alt="Formal style clothing"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                    />

                                </div>
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="lg:col-span-2">
                            {/* Party Card */}
                            <div onClick={()=>router.push('/products')} className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-72 group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
                                    <Image
                                        src="/assets/frame3.png"
                                        alt="Party style clothing"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            {/* Gym Card */}
                            <div onClick={()=>router.push('/products')} className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-72 group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
                                    <Image
                                        src="/assets/frame4.png"
                                        alt="Gym style clothing"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}