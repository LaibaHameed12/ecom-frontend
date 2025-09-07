import CartItems from '@/components/CartPage/CartItems'
import OrderSummary from '@/components/CartPage/OrderSummary'
import Container from '@/components/common/Container'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import Footer from '@/components/Layouts/Footer'
import Navbar from '@/components/Layouts/Navbar'
import React from 'react'

const Cart = () => {
  return (
    <>
      <ProtectedRoute authRequired={true} allowedRoles={['user']} >
        <Navbar />
        <Container>
          <div className='w-full px-16 py-12' >
            <h1 className='font-extrabold text-4xl pb-4 uppercase'> Your Cart </h1>
            <div className='w-full flex items-start justify-between py-6'>
              <div className='w-3/5'>
                <CartItems />
              </div>
              <div className='w-2/5'>
                <OrderSummary />
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </ProtectedRoute>
    </>
  )
}

export default Cart