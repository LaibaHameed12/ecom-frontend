import React from 'react';
import Container from '../common/Container';
import ProductCard from '../common/PoductCard';
import Link from 'next/link';

const HomeProducts = ({ heading, products }) => {
    return (
        <Container>
            <div className='flex flex-col items-center justify-between sm:justify-center py-12'>
                <h2 className='font-extrabold text-5xl uppercase text-center'>{heading}</h2>

                {/* Responsive Grid */}
                <div className='grid gap-6 w-full py-12 
                        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                        px-4 sm:px-8 lg:px-16'>
                    {
                        products.map((product) => (
                            <ProductCard product={product} key={product._id} />
                        ))
                    }
                </div>

                <Link
                    href={'/products'}
                    className='capitalize px-16 py-3 font-medium rounded-full border border-black/10'
                >
                    view all
                </Link>
            </div>
        </Container>
    );
};

export default HomeProducts;
