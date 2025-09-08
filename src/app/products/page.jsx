import Container from '@/components/common/Container';
import Footer from '@/components/Layouts/Footer';
import Navbar from '@/components/Layouts/Navbar';
import SidebarFilters from '@/components/ProductsPage/FiltersSidebar';
import ProductsSection from '@/components/ProductsPage/ProductsSection';
import React, { Suspense } from 'react';

const Products = () => {
    return (
        <>
            <Navbar />
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-8 px-16">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <SidebarFilters />
                    </div>

                    {/* Products Section */}
                    <div className="lg:col-span-3">
                        <Suspense fallback={<div className="text-center py-10">Loading products...</div>}>
                            <ProductsSection />
                        </Suspense>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default Products;
