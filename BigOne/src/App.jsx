import React, { Children } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  About,
  Accounts,
  Customers,
  Error,
  HomeLayout,
  Landing,
  Login,
  NewCustomer,
  CustomerAccounts,
  AccountHistorique,
  AccountOperations,
} from './pages'

import { ErrorElement } from './components'

import { loader as landingLoader } from './pages/Landing'
import { loader as customersLoader } from './pages/Customers'
import { loader as customerAccountsLoader } from './pages/CustomerAccounts'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin'
/*
const router = createBrowserRouter([
  //les elements qui ont pas un nav
  {
    path: '/login',
    element: <Login />,
    //Si une erreur se produit, elle redirige vers la page d'erreur définie par errorElement: <Error />.
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      //les elements qui ont un nav
      {
        path: '/',
        //HomeLayout contient les elements qui ne change pas dans les children
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
          {
            // l'element qui s'affiche si je tape /
            index: true,
            element: <Landing />,
            errorElement: <ErrorElement />,
            loader: landingLoader,
          },
          {
            path: 'about',
            element: <About />,
          },
          {
            path: 'accounts',
            element: <Accounts />,
          },
          {
            path: 'accounts/historique',
            element: <AccountHistorique />,
          },
          {
            path: 'accounts/operations',
            element: <AccountOperations />,
          },
          {
            path: 'customers',
            element: <Customers />,
            errorElement: <ErrorElement />,
            loader: customersLoader,
          },
          {
            path: 'customers/:id',
            element: <CustomerAccounts />,
            loader: customerAccountsLoader,
          },
          {
            path: 'customers/new',
            element: <NewCustomer />,
          },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
*/

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Landing />,
            errorElement: <ErrorElement />,
            loader: landingLoader,
          },
          {
            path: 'about',
            element: <About />,
          },
          {
            path: 'accounts',
            element: <Accounts />,
          },
          {
            path: 'accounts/historique',
            element: <AccountHistorique />,
          },
          {
            path: 'accounts/operations',
            element: <AccountOperations />,
          },
          {
            path: 'customers',
            element: <ProtectedRouteAdmin requiredRole="ADMIN" />, // Spécifier le rôle requis
            errorElement: <ErrorElement />,
            children: [
              {
                index: true,
                element: <Customers />,
                loader: customersLoader,
              },
              {
                path: ':id',
                element: <CustomerAccounts />,
                loader: customerAccountsLoader,
              },
              {
                path: 'new',
                element: <NewCustomer />,
              },
            ],
          },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
