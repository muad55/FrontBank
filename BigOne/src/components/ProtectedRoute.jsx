import React from 'react'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
// un hook ou un service pour gérer l'authentification
import useAuthService from '../services/AuthService'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthService()
  const token = localStorage.getItem('jwt-token')
  const roles = localStorage.getItem('roles')
  console.log('isAuthenticated:', isAuthenticated)
  console.log('roles :', roles)

  return isAuthenticated || token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
