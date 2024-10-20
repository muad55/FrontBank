import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const CustomerData = () => {
  const customers = useLoaderData()
  console.log(customers)

  return (
    <div className="pt-12">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              return (
                <tr className="hover" key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>
                    <Link to={`/customers/${c.id}`}>
                      <button className="btn btn-outline btn-primary">
                        Accounts
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
  )
}

export default CustomerData
