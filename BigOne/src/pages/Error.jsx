import React from 'react'
import { useRouteError, Link } from 'react-router-dom'

const Error = () => {
  // savoir le type d'erreur
  const error = useRouteError()
  console.log(error)
  if (error.status === 404) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-800">
        <h2 className="text-center text-5xl text-red-400 font-bold">404</h2>
        <div className="mt-4 text-center text-white text-4xl font-semibold sm:text-5xl ">
          Page not found
        </div>
        <p className="mt-2 text-center text-white text-3xl font-semibold ">
          Sorry , we couldn't fond the page you're looking for
        </p>
        <button className="mt-6 rounded-xl bg-red-400 text-white px-6 py-2">
          <Link to="/">Go Back Home</Link>
        </button>
      </main>
    )
  }

  return (
    <main className="flex flex-row items-center justify-center min-h-screen bg-slate-800">
      <h4 className="text-center text-5xl text-red-400 font-bold">
        there was an error ...
      </h4>
    </main>
  )
}

export default Error
