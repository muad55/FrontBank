import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchWithAuth } from '../utils'
import { useLocation } from 'react-router-dom'
import { SectionTitle } from '../components'

const AccountHistorique = () => {
  const location = useLocation()
  const accountId = location.state?.accountId || '' // Récupérer l'ID de l'account depuis l'état
  const [operations, setOperations] = useState([])
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState()
  const [balance, setBalance] = useState()
  const [pageSize] = useState(5)

  const fetchOperations = async (id, page) => {
    try {
      const response = await fetchWithAuth(
        `accounts/${id}/pageOperations?page=${page}&size=${pageSize}`
      )
      console.log('Account Operations:', response)
      setBalance(response.balance)
      setOperations(response.operationDTOList)
      setTotalPages(response.totalPages)
      setCurrentPage(response.currentPage)
    } catch (error) {
      setError(error.message)
      setOperations([])
    }
  }

  // Utiliser useEffect pour récupérer les opérations dès que l'ID est disponible
  useEffect(() => {
    if (accountId) {
      fetchOperations(accountId, 0)
    }
  }, [accountId]) // Ce useEffect se déclenche lorsque l'ID change

  // Fonction pour changer la page des opérations
  const handlePageChange = (newPage) => {
    fetchOperations(accountId, newPage)
  }

  return (
    <div>
      <SectionTitle text={`Account Historique`} />
      <div className="my-2 stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Balance :</div>
          <div className="stat-value">{balance}</div>
        </div>
      </div>
      {error && <p>Error: {error}</p>}
      {operations.length > 0 ? (
        <div>
          <div className="pt-12">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Operation Type:</th>
                    <th>Amount:</th>
                    <th>Date:</th>
                  </tr>
                </thead>
                <tbody>
                  {operations.map((o) => (
                    <tr className="hover" key={o.id}>
                      <td>{o.type}</td>
                      <td>{o.amount}</td>
                      <td>{new Date(o.operationDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex item-center pt-6 justify-start md:justify-center join">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  className={`join-item btn ${
                    i === currentPage ? 'btn-active' : ''
                  }`}
                  key={i}
                  onClick={() => handlePageChange(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No operations found.</p>
      )}
    </div>
  )
}

export default AccountHistorique
