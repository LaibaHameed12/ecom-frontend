import ProtectedRoute from '@/components/common/ProtectedRoute'
import Footer from '@/components/Layouts/Footer'
import Navbar from '@/components/Layouts/Navbar'
import UserProfilePage from '@/components/ProfilePages/ProfilePage'
import React from 'react'

const Profile = () => {
  return (
    <>
      <ProtectedRoute authRequired={true} allowedRoles={['user']} >
        <Navbar />
        <UserProfilePage />
        <Footer />
      </ProtectedRoute>
    </>
  )
}

export default Profile