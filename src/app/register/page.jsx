import ProtectedRoute from '@/components/common/ProtectedRoute'
import RegisterForm from '@/components/Forms/RegisterForm'
import Navbar from '@/components/Layouts/Navbar'
import React from 'react'

const Register = () => {
  return (
    <ProtectedRoute authRequired={false}>
        <Navbar/>
        <RegisterForm/>
    </ProtectedRoute>
  )
}

export default Register