import React from 'react'
import LinkBanner from './LinkBanner'
import Navbar from '../../components/Navbar'
import Content from './Content'
function Home() {
  return (
    <div className='bg-[#F4F4F4]'>
        <LinkBanner/>
        <Navbar/>
        <Content/>
    </div>
  )
}

export default Home