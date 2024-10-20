import React from 'react'
import { fetchWithAuth } from '../utils'
import { useLoaderData, Link } from 'react-router-dom'
import { SectionTitle } from '../components'

export const loader = async ({ params }) => {
  try {
    return await fetchWithAuth(`/accounts/customers/${params.id}`) // Use fetchWithAuth to include token
  } catch (error) {
    // Handle error (e.g., redirect to login or show an error message)
    console.error('Failed to load data:', error)
    return { data: [] } // Return an empty array or handle the error appropriately
  }
}

const CustomerAccounts = () => {
  const accounts = useLoaderData()
  return (
    <div>
      <SectionTitle text={`Accounts of  ${accounts[0].customerDTO.name}`} />
      <div className="pt-12">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => {
                return (
                  <tr className="hover" key={a.id}>
                    <td>{a.type}</td>
                    <td>{a.status}</td>
                    <td>{a.balance}</td>
                    <td>
                      <Link
                        to="/accounts/historique"
                        state={{ accountId: a.id }}
                      >
                        <button className="btn btn-outline btn-accent">
                          Historique
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="/accounts/operations"
                        state={{ accountId: a.id }}
                      >
                        <button className="btn btn-outline btn-primary">
                          Operations
                        </button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CustomerAccounts
