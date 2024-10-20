import React from 'react'
import { Link } from 'react-router-dom'
import useAuthService from '../services/AuthService'

const Header = () => {
  const { logout, username } = useAuthService()
  console.log(username)
  return (
    <header className="bg-slate-600 py-2 ">
      <div className="align-element space-x-2 flex justify-center md:justify-end">
        <h2>{username}</h2>
        <Link
          onClick={() => {
            logout()
          }}
          className="hover:underline hover:underline-offset-2"
        >
          Logout
        </Link>
      </div>
    </header>
  )
}

export default Header
