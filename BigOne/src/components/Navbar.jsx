import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
/*
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }
  return (
    <section className="flex bg-slate-900">
      <div className="flex flex-col my-2 py-3 md:py-1 items-center w-full md:flex-row md:justify-between  align-element ">
        <h1 className="bg-sky-600 hidden sm:flex  md:ml-0 font-serif px-6 py-3 text-4xl rounded-md text-slate-950 font-extrabold">
          DigBank
        </h1>
        <div className="flex flex-col items-center justify-center text-white md:flex-row">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-slate-600 rounded py-2 md:py-2 md:px-4  px-20'
                : 'hover:bg-slate-800 hover:rounded py-2 md:py-2 md:px-4  px-20'
            }
            to="/"
          >
            Landing
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-slate-600 rounded py-2 md:py-2 md:px-4  px-20'
                : 'hover:bg-slate-800 hover:rounded py-2 md:py-2 md:px-4  px-20'
            }
            to="/about"
          >
            About
          </NavLink>
          <div className="relative">
            <button
              className="flex items-center space-x-2 hover:bg-slate-800 rounded py-2 md:py-2 md:px-4 px-20 text-white"
              onClick={toggleDropdown}
            >
              <span>Customers</span>
              <FaChevronDown />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-slate-800 rounded shadow-lg">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'block bg-slate-600 rounded py-2 px-4'
                      : 'block hover:bg-slate-700 rounded py-2 px-4'
                  }
                  to="/customers"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Customers
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'block bg-slate-600 rounded py-2 px-4'
                      : 'block hover:bg-slate-700 rounded py-2 px-4'
                  }
                  to="/customers/new"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  New Customer
                </NavLink>
              </div>
            )}
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-slate-600 rounded py-2 md:py-2 md:px-4  px-20'
                : 'hover:bg-slate-800 hover:rounded py-2 md:py-2 md:px-4  px-20'
            }
            to="/accounts"
          >
            Accounts
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default Navbar
*/

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const roles = localStorage.getItem('roles') // Vérifie les rôles dans le localStorage

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  return (
    <section className="flex bg-slate-900">
      <div className="flex flex-col my-2 py-3 md:py-1 items-center w-full md:flex-row md:justify-between  align-element">
        <h1 className="bg-sky-600 hidden sm:flex md:ml-0 font-serif px-6 py-3 text-4xl rounded-md text-slate-950 font-extrabold">
          DigBank
        </h1>
        <div className="flex flex-col items-center justify-center text-white md:flex-row">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-slate-600 rounded py-2 md:py-2 md:px-4  px-20'
                : 'hover:bg-slate-800 hover:rounded py-2 md:py-2 md:px-4  px-20'
            }
            to="/"
          >
            Landing
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-slate-600 rounded py-2 md:py-2 md:px-4  px-20'
                : 'hover:bg-slate-800 hover:rounded py-2 md:py-2 md:px-4  px-20'
            }
            to="/about"
          >
            About
          </NavLink>

          {/* Afficher le NavLink Customers seulement si l'utilisateur a le rôle ADMIN */}
          {roles && roles.includes('ADMIN') && (
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:bg-slate-800 rounded py-2 md:py-2 md:px-4 px-20 text-white"
                onClick={toggleDropdown}
              >
                <span>Customers</span>
                <FaChevronDown />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-slate-800 rounded shadow-lg">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'block bg-slate-600 rounded py-2 px-4'
                        : 'block hover:bg-slate-700 rounded py-2 px-4'
                    }
                    to="/customers"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Customers
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'block bg-slate-600 rounded py-2 px-4'
                        : 'block hover:bg-slate-700 rounded py-2 px-4'
                    }
                    to="/customers/new"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    New Customer
                  </NavLink>
                </div>
              )}
            </div>
          )}

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-slate-600 rounded py-2 md:py-2 md:px-4  px-20'
                : 'hover:bg-slate-800 hover:rounded py-2 md:py-2 md:px-4  px-20'
            }
            to="/accounts"
          >
            Accounts
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default Navbar
