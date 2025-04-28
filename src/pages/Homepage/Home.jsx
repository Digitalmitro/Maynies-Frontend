import React from 'react'
import LinkBanner from './LinkBanner'
import Navbar from '../../components/Navbar'
import Content from './Content'
import Footer from '../../components/Footer'
function Home() {
  return (
    <div className='bg-[#F4F4F4]'>
        <LinkBanner/>
        <Navbar/>
        <Content/>
        <Footer/>
    </div>
  )
}

export default Home