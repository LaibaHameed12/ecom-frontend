import EditProductForm from '@/components/DashBoardPages/EditProductForm'
import Header from '@/components/DashBoardPages/Header'
import React from 'react'

const EditProductPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>
            <EditProductForm/>
        </div>
    )
}

export default EditProductPage