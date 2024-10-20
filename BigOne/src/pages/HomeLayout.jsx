import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navbar } from '../components'
const HomeLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-slate-800 min-h-screen">
        <section className="align-element  py-20">
          <Outlet />
        </section>
      </div>
    </>
  )
}

export default HomeLayout
