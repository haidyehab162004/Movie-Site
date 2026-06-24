import React from 'react'
import Navbar from '../Commponants/Layout/Navbar'
import Footer from '../Commponants/Layout/Footer'
import { Outlet } from 'react-router'


export default function MainLayouts() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
