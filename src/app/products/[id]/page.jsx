import Footer from '@/components/Layouts/Footer'
import Navbar from '@/components/Layouts/Navbar'
import SingleProductPage from '@/components/SingleProductPage/SingleProductPage'
import React from 'react'

const SingleProducts = () => {
    return (
        <div>
            <Navbar/>
            <SingleProductPage/>
            <Footer/>
        </div>
    )
}

export default SingleProducts