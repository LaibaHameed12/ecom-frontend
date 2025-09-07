import React from 'react'

const ProductDetails = () => {
    return (
        <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium mb-2">Materials & Care</h4>
                    <ul className="text-gray-700 space-y-1">
                        <li>100% Premium Cotton</li>
                        <li>Machine wash cold</li>
                        <li>Tumble dry low</li>
                        <li>Do not bleach</li>
                        <li>Iron on low heat</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Features</h4>
                    <ul className="text-gray-700 space-y-1">
                        <li>Soft and breathable fabric</li>
                        <li>Comfortable fit</li>
                        <li>Durable construction</li>
                        <li>Pre-shrunk</li>
                        <li>Reinforced seams</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails