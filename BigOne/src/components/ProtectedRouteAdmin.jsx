import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthService from '../services/AuthService'

const ProtectedRouteAdmin = ({ requiredRole }) => {
  const roles = localStorage.getItem('roles')

  if (requiredRole && !roles.includes(requiredRole)) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default ProtectedRouteAdmin
