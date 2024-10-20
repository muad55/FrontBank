import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchWithAuth } from '../utils'
import { useLocation } from 'react-router-dom'
import { SectionTitle } from '../components'

const AccountOperations = () => {
  const [balance, setBalance] = useState('') // Pour stocker le solde
  const [amount, setAmount] = useState('') // Pour stocker le montant de l'opération
  const [accountDestination, setAccountDestination] = useState('') // Pour les transferts
  const [description, setDescription] = useState('') // Pour la description de l'opération
  const [selectedOption, setSelectedOption] = useState('DEBIT') // Type d'opération sélectionné
  const [error, setError] = useState(null) // Pour stocker les messages d'erreur
  const [success, setSuccess] = useState(null) // Pour afficher les messages de succès

  const location = useLocation()
  const accountId = location.state?.accountId || ''

  // Récupérer les informations du compte
  const fetchAccountInfo = async () => {
    try {
      const response = await fetchWithAuth(`accounts/${accountId}`)
      console.log('Account Data:', response)
      setBalance(response.balance)
      setError(null)
    } catch (error) {
      setError(error.message)
      setBalance(null)
    }
  }
  useEffect(() => {
    if (accountId) {
      fetchAccountInfo()
    }
  }, [accountId])

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  // Fonction pour soumettre une opération (débit, crédit, ou transfert)
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data

    if (selectedOption === 'TRANSFER') {
      data = {
        accountSource: accountId,
        accountDestination,
        amount,
        description,
      }
      try {
        const response = await fetchWithAuth('accounts/transfer', 'POST', data)
        console.log('Réponse du serveur :', response)
        fetchAccountInfo()
        setSuccess('Transfert réussi!')
        setError(null)
      } catch (error) {
        console.error('Erreur lors du transfert :', error)
        setError("Une erreur s'est produite lors du transfert.")
        setSuccess(null)
      }
    } else if (selectedOption === 'DEBIT') {
      data = { accountId, amount, description }
      try {
        const response = await fetchWithAuth('accounts/debit', 'POST', data)
        console.log('Réponse du serveur :', response)
        fetchAccountInfo()
        setSuccess('Débit réussi!')
        setError(null)
      } catch (error) {
        console.error('Erreur lors du débit :', error)
        setError("Une erreur s'est produite lors du débit.")
        setSuccess(null)
      }
    } else if (selectedOption === 'CREDIT') {
      data = { accountId, amount, description }
      try {
        const response = await fetchWithAuth('accounts/credit', 'POST', data)
        console.log('Réponse du serveur :', response)
        fetchAccountInfo()
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
      <SectionTitle text={`Search An Account`} />

      {error && <p>Error: {error}</p>}
      {success && <p>Success: {success}</p>}

      <div>
        <div className="my-2 stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Balance :</div>
            <div className="stat-value">{balance}</div>
          </div>
        </div>

        <div>
          <SectionTitle text={`Account Operations`} />
          <div className="pt-12">
            <div className="flex pb-11 flex-col md:flex-row items-center justify-center">
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
              onSubmit={handleSubmit}
              className="flex flex-col my-2 md:flex-row md:space-x-3"
            >
              {selectedOption === 'TRANSFER' && (
                <label className="input input-bordered flex items-center gap-2">
                  Destination AccountId:
                  <input
                    type="text"
                    value={accountDestination}
                    onChange={(e) => setAccountDestination(e.target.value)}
                    className="grow"
                  />
                </label>
              )}

              <label className="input input-bordered flex items-center gap-2">
                Amount:
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="grow"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2">
                Description:
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="grow"
                />
              </label>

              <button type="submit" className="btn my-2 md:my-0 btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountOperations
