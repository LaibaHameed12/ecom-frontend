import ProtectedRoute from '@/components/common/ProtectedRoute'
import VerifyForm from '@/components/Forms/VerifyForm'
import React from 'react'

const Verify = () => {
    return (
        <ProtectedRoute authRequired={false}>
            <VerifyForm />
        </ProtectedRoute>
    )
}

export default Verify