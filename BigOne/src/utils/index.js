import axios from 'axios'
import useAuthService from '../services/AuthService'

/*
Ce code importe axios et crée une instance personnalisée d'axios appelée customFetch.
Cette instance est configurée pour utiliser une URL de base, ce qui te permet de ne pas avoir 
à répéter l'URL de base à chaque requête
Si tu veux changer l'URL pour pointer vers un serveur de production, tu n'as
 qu'à changer productionUrl et toutes les requêtes utiliseront cette nouvelle URL de base.

*/

// src/services/api.js

// Base URL for API
const productionUrl = 'http://localhost:8080'

// Create an Axios instance
const customFetch = axios.create({
  baseURL: productionUrl,
})

customFetch.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or another secure place
    const accessToken = localStorage.getItem('jwt-token')

    // If the token exists, add it to the Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  }
)

// Function to make API requests with token
export const fetchWithAuth = async (url, method = 'GET', data = null) => {
  try {
    const response = await customFetch({
      url,
      method,
      data,
    })

    return response.data
  } catch (error) {
    // Handle errors as needed
    console.error('API call failed:', error)
    throw error
  }
}
