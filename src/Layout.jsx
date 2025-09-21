import React from 'react'
import Header from './components/ui/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/ui/Footer/Footer'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
