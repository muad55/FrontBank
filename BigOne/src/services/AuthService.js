/*
import { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode' // corrigez ici, jwtDecode n'est pas importé correctement
import { useNavigate } from 'react-router-dom'

const useAuthService = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [roles, setRoles] = useState([])
  const [username, setUsername] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Charger le token depuis localStorage au chargement du composant
    loadJwtTokenFromLocalStorage()
  }, [])

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(response.data)
      const { accessToken } = response.data
      loadProfile(accessToken)
      localStorage.setItem('jwt-token', accessToken) // Stocker le token dans localStorage
      setTimeout(() => {
        navigate('/') // Attendre un court délai avant de rediriger
      }, 500)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const loadProfile = (token) => {
    setIsAuthenticated(true)
    setAccessToken(token)
    const decodedToken = jwtDecode(token)
    setUsername(decodedToken.sub)
    setRoles(decodedToken.scope)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAccessToken('')
    setUsername('')
    setRoles([])
    localStorage.removeItem('jwt-token') // Supprimer le token du localStorage
    navigate('/login') // Redirection vers la page de connexion
  }

  const loadJwtTokenFromLocalStorage = () => {
    const token = localStorage.getItem('jwt-token')
    if (token) {
      loadProfile(token) // Charger le profil si le token est présent
    }
  }

  return {
    isAuthenticated,
    roles,
    username,
    accessToken,
    login,
    logout,
  }
}

export default useAuthService
*/
import { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode' // Assurez-vous que c'est importé correctement
import { useNavigate } from 'react-router-dom'

const useAuthService = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [roles, setRoles] = useState([])
  const [username, setUsername] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const navigate = useNavigate()

  // Charger le token depuis localStorage une seule fois au montage
  useEffect(() => {
    loadJwtTokenFromLocalStorage()
  }, []) // Le tableau vide [] garantit que l'effet ne se produit qu'au montage

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(response.data)
      const { accessToken } = response.data
      loadProfile(accessToken)
      localStorage.setItem('jwt-token', accessToken) // Stocker le token dans localStorage
      navigate('/') // Rediriger après connexion
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const loadProfile = (token) => {
    setIsAuthenticated(true)
    setAccessToken(token)
    const decodedToken = jwtDecode(token)
    setUsername(decodedToken.sub)
    localStorage.setItem('roles', decodedToken.scope)
    setRoles(decodedToken.scope)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAccessToken('')
    setUsername('')
    setRoles([])
    localStorage.removeItem('jwt-token') // Supprimer le token du localStorage
    navigate('/login') // Redirection vers la page de connexion
  }

  const loadJwtTokenFromLocalStorage = () => {
    const token = localStorage.getItem('jwt-token')
    if (token) {
      loadProfile(token) // Charger le profil si le token est présent
    }
  }

  return {
    isAuthenticated,
    roles,
    username,
    accessToken,
    login,
    logout,
  }
}

export default useAuthService
