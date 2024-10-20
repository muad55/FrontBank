import React from 'react'
import { fetchWithAuth } from '../utils'
import { SectionTitle, CustomerData } from '../components'

const url = '/customers'
export const loader = async () => {
  try {
    return await fetchWithAuth(url) // This will return the data directly
  } catch (error) {
    console.error('Failed to load data:', error)
    return { data: [] } // Return an empty array or handle the error appropriately
  }
}

// tt les composants de cutomers maintenant a l'accées a response.data , il suffit seulement d'utiliser useLoaderData
const Customers = () => {
  return (
    <div>
      <SectionTitle text="Customers" />
      <CustomerData />
    </div>
  )
}

export default Customers
