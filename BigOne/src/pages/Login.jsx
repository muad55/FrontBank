import React, { useState } from 'react'
import { FormInput, SubmitBtn } from '../components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuthService from '../services/AuthService'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuthService()
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission behavior
    // If username or password is empty, show an alert
    if (!username || !password) {
      alert('Please provide both username and password')
      return
    }
    console.log('Username:', username)
    console.log('Password:', password)

    if (username && password) {
      login(username, password)
    } else {
      alert('Please provide both username and password')
    }
  }

  return (
    <div className="flex items-center justify-center bg-slate-800 h-screen">
      <section className="shadow-2xl w-96 rounded-3xl p-6">
        <form onSubmit={handleSubmit}>
          <h4 className="text-center my-7 text-4xl text-gray-200 font-bold">
            Login
          </h4>
          <div className="flex flex-col my-6 mx-4">
            <label className="text-white my-2 mx-2 text-sm font-medium">
              Username:
            </label>
            <input
              type="text"
              name="username"
              className="p-3 pl-4 rounded-lg text-white bg-slate-800 border border-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col my-6 mx-4">
            <label className="text-white my-2 mx-2 text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="p-3 pl-4 rounded-lg text-white bg-slate-800 border border-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="px-4 py-4">
            <SubmitBtn text="Login" />
          </div>
        </form>
        <p className="py-2 text-center text-white">Not a member yet?</p>
      </section>
    </div>
  )
}

export default Login
