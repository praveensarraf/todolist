import React from 'react'
import Navbar from './shared/Navbar'
import Tasks from './tasks/Tasks'
import Footer from './shared/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Tasks/>
      <Footer/>
    </>
  )
}

export default Home