import React, { useState } from 'react'
import { SectionTitle, FormInput, SubmitBtn } from '../components'
import axios from 'axios'
import { fetchWithAuth } from '../utils'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const NewCustomer = () => {
  // State to track form values
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate() // Initialize useNavigate

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission behavior
    const data = { name, email }
    // Make the POST request to save the customer
    try {
      const response = await fetchWithAuth('customers', 'POST', data)
      console.log('Customer saved:', response.data)
      setSuccess('Customer saved successfully!')
      setError(null)
      // Clear the form
      setName('')
      setEmail('')
      // Redirect to the /customers page after saving
      navigate('/customers') // Redirect after successful save
    } catch (error) {
      console.error('Error saving customer:', error)
      setError('Failed to save customer.')
      setSuccess(null)
    }
  }

  return (
    <div>
      <SectionTitle text="Create new Customer" />
      <div className="flex mt-4 justify-center bg-slate-800 ">
        <section className="shadow-2xl w-96 rounded-3xl p-6 ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-6 mx-4">
              <label className="text-white my-2 mx-2 text-sm font-medium">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="p-3 pl-4 rounded-lg text-white bg-slate-800 border border-white"
                value={name} // Bind value to state
                onChange={(e) => setName(e.target.value)}
                required // Make field required
              />
            </div>
            <div className="flex flex-col my-6 mx-4">
              <label className="text-white my-2 mx-2 text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="p-3 pl-4 rounded-lg text-white bg-slate-800 border border-white"
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)}
                required // Make field required
              />
            </div>
            <div className="px-4 py-4">
              <SubmitBtn text="Save" />
            </div>
          </form>
          {success && <p className="text-green-500">{success}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </section>
      </div>
    </div>
  )
}

export default NewCustomer
