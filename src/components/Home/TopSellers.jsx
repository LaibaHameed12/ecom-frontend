'use client'
import React from 'react'
import HomeProducts from './HomeProducts'
import { useGetProductsQuery } from '@/redux/slices/products/productsApi'

const TopSellers = () => {
  const { data, isLoading, isError } = useGetProductsQuery({
    page: 1,
    limit: 4,
    sortBy: 'createdAt',
    sortOrder: 'asc',
  })

  const products = data?.products || []

  if (isLoading) {
    return (
      <div className="pt-10 border-b border-black/10">
        <HomeProducts
          heading="Top Sellers"
          products={Array(4).fill(null)} // pass dummy array for skeletons
          isLoading={true}
        />
      </div>
    )
  }

  if (isError) {
    return <div className="py-10 text-center text-red-500">Failed to load products</div>
  }
  return (
    <div className='pb-10'>
      <HomeProducts heading={'Top Sellers'} products={products} />
    </div>
  )
}

export default TopSellers