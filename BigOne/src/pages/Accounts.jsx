import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SectionTitle } from '../components'
import { fetchWithAuth } from '../utils'

const Accounts = ({ accountId }) => {
  const [amount, setAmount] = useState('')
  const [accountDestination, setAccountDestination] = useState('')
  const [description, setDescription] = useState('')
  const [selectedOption, setSelectedOption] = useState('DEBIT')
  const [success, setSuccess] = useState(null)
  const [id, setId] = useState(accountId || '')
  const [data, setData] = useState(null)
  const [operations, setOperations] = useState([])
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState()
  const [pageSize] = useState(5)

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }
  const fetchOperations = async (id, page) => {
    try {
      const response = await fetchWithAuth(
        `accounts/${id}/pageOperations?page=${page}&size=${pageSize}`
      )
      console.log('Account Operations:', response)
      setOperations(response.operationDTOList)
      setTotalPages(response.totalPages)
      setCurrentPage(response.currentPage)
    } catch (error) {
      setError(error.message)
      setOperations([])
    }
  }
  const SearchInfo = async () => {
    try {
      const response = await fetchWithAuth(`accounts/${id}`)
      console.log('Account Data:', response)
      setData(response)
      setError(null)
      // Récupère la première page des opérations
      fetchOperations(id, 0)
    } catch (error) {
      setError(error.message)
      setData(null)
      setOperations([])
    }
  }
  const handleSearch = (e) => {
    e.preventDefault()
    SearchInfo()
  }
  const handlePageChange = (newPage) => {
    fetchOperations(id, newPage)
  }
  const handleSubmit = async (accountDestination, amount, description) => {
    let data

    if (selectedOption === 'TRANSFER') {
      data = { accountSource: id, accountDestination, amount, description }
      try {
        const response = await fetchWithAuth('accounts/transfer', 'POST', data)
        console.log('Réponse du serveur :', response)
        SearchInfo()
        fetchOperations()
        setSuccess('Transfert réussi!')
        setError(null)
      } catch (error) {
        console.error('Erreur lors du transfert :', error)
        setError("Une erreur s'est produite lors du transfert.")
        setSuccess(null)
      }
    } else if (selectedOption === 'DEBIT') {
      data = { accountId: id, amount, description }
      try {
        const response = await fetchWithAuth('accounts/debit', 'POST', data)
        console.log('Réponse du serveur :', response)
        SearchInfo()
        fetchOperations()
        setSuccess('Débit réussi!')
        setError(null)
      } catch (error) {
        console.error('Erreur lors du débit :', error)
        setError("Une erreur s'est produite lors du débit.")
        setSuccess(null)
      }
    } else {
      data = { accountId: id, amount, description }
      try {
        const response = await fetchWithAuth('accounts/credit', 'POST', data)
        console.log('Réponse du serveur :', response)
        SearchInfo()
        fetchOperations()
        setSuccess('Crédit réussi!')
        setError(null)
      } catch (error) {
        console.error('Erreur lors du crédit :', error)
        setError("Une erreur s'est produite lors du crédit.")
        setSuccess(null)
      }
    }
  }

  return (
    <div>
      <SectionTitle text={`Search An Account `} />
      <form
        onSubmit={handleSearch}
        className="flex item-center justify-start md:justify-center"
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your AccountId?</span>
          </div>
          <div className="join w-full">
            <input
              name="Id"
              value={id}
              onChange={(e) => {
                setId(e.target.value)
              }}
              className="input w-full input-bordered join-item"
              placeholder="Type here"
            />
            <button type="submit" className="btn join-item px-4 rounded-r-full">
              Search
            </button>
          </div>
        </label>
      </form>

      {error && <p>Error: {error}</p>}

      {data && (
        <div>
          <div className="my-2 stats  stats-vertical shadow">
            <div className="stat">
              <div className="stat-title">Balance :</div>
              <div className="stat-value">{data.balance}</div>
            </div>
          </div>
          <div>
            <SectionTitle text={`Account Operations`} />
            <div className="pt-12">
              <div className="flex pb-11 flex-col  md:flex-row items-center justify-center ">
                <div className="flex mr-7 items-center justify-center">
                  <label className="text-xl mr-5 font-medium">DEBIT</label>
                  <input
                    type="radio"
                    value="DEBIT"
                    className="radio radio-primary"
                    checked={selectedOption === 'DEBIT'}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="flex mr-7 items-center justify-center">
                  <label className="text-xl mr-5 font-medium">CREDIT</label>
                  <input
                    type="radio"
                    className="radio radio-primary"
                    value="CREDIT"
                    checked={selectedOption === 'CREDIT'}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="flex mr-7 items-center justify-center">
                  <label className="text-xl mr-5 font-medium">TRANSFER</label>
                  <input
                    type="radio"
                    value="TRANSFER"
                    className="radio radio-primary"
                    checked={selectedOption === 'TRANSFER'}
                    onChange={handleOptionChange}
                  />
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (selectedOption === 'TRANSFER')
                    handleSubmit(accountDestination, amount, description)
                  else handleSubmit(0, amount, description)
                }}
                className="flex flex-col my-2 md:flex-row md:space-x-3 "
              >
                {selectedOption === 'TRANSFER' && (
                  <>
                    <label className="input input-bordered flex items-center gap-2">
                      Destination AccountId :
                      <input
                        type="text"
                        value={accountDestination}
                        onChange={(e) => {
                          setAccountDestination(e.target.value)
                        }}
                        className="grow"
                      />
                    </label>
                  </>
                )}
                <label className="input my-2 md:my-0 input-bordered flex items-center gap-2">
                  Amount :
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value)
                    }}
                    className="grow"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Description :
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                    className="grow"
                  />
                </label>
                <button type="submit" className="btn my-2 md:my-0 btn-primary">
                  Send
                </button>
              </form>
            </div>
          </div>
          <div>
            {operations.length > 0 && (
              <div>
                <SectionTitle text={`Account Historique`} />
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
                            <td>
                              {new Date(o.operationDate).toLocaleDateString()}
                            </td>
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
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Accounts
