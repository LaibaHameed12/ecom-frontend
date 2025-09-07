import React from 'react'

const FAQ = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
            <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg p-4">
                    <summary className="font-medium cursor-pointer">What is your return policy?</summary>
                    <p className="mt-2 text-gray-700">We offer a 30-day return policy for all items in original condition.</p>
                </details>
                <details className="border border-gray-200 rounded-lg p-4">
                    <summary className="font-medium cursor-pointer">How does sizing work?</summary>
                    <p className="mt-2 text-gray-700">Our sizes run true to standard sizing. Check our size guide for detailed measurements.</p>
                </details>
                <details className="border border-gray-200 rounded-lg p-4">
                    <summary className="font-medium cursor-pointer">How long does shipping take?</summary>
                    <p className="mt-2 text-gray-700">Standard shipping takes 3-5 business days, express shipping takes 1-2 business days.</p>
                </details>
            </div>
        </div>
    )
}

export default FAQ