'use client'
import React from 'react'
import HomeProducts from './HomeProducts'
import { useGetProductsQuery } from '@/redux/slices/products/productsApi'

const NewArrivals = () => {
  // fetch products sorted by creation date, descending
  const { data, isLoading, isError } = useGetProductsQuery({
    page: 1,
    limit: 4,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })

  const products = data?.products || []

  if (isLoading) {
    return <div className="py-10 text-center">Loading new arrivals...</div>
  }

  if (isError) {
    return <div className="py-10 text-center text-red-500">Failed to load products</div>
  }

  return (
    <div className="pt-10 border-b border-black/10">
      <HomeProducts heading="NEW ARRIVALS" products={products} />
    </div>
  )
}

export default NewArrivals
