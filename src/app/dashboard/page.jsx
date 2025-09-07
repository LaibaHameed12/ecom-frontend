import ProtectedRoute from '@/components/common/ProtectedRoute'
import AdminDashboard from '@/components/DashBoardPages/AdminDashboard'
import React from 'react'

const Dashboard = () => {
    return (
        <ProtectedRoute authRequired={true} allowedRoles={['admin', 'superadmin']}>
            <AdminDashboard/>
        </ProtectedRoute>

    )
}

export default Dashboard