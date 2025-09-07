import ProtectedRoute from '@/components/common/ProtectedRoute'
import LoginForm from '@/components/Forms/LoginForm'
import Navbar from '@/components/Layouts/Navbar'
import React from 'react'

const Login = () => {
    return (
        <ProtectedRoute authRequired={false}>
            <Navbar/>
            <LoginForm />
        </ProtectedRoute>
    )
}

export default Login