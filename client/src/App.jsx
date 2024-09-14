import React from 'react'
import { NavbarComponent } from './components/navbar'
import HeroSection from './components/herosection'
import AlumniSlider from './components/alumnislider'
import Footer from './components/footer'
import UpcomingEvents from './components/upcomingevents'
import Placement from './components/placement';
import DeanMessage from '@/components/dean'
import AlumniEngagement from './components/engagement'

const App = () => {
  return (
  <>
  <NavbarComponent/>
    <div className='w-[90vw] m-auto'>
      <HeroSection/>
      <AlumniSlider/>
      <UpcomingEvents/>
      <Placement/>
      <DeanMessage/>
      <AlumniEngagement/>
    </div>
    <Footer/>
    </>
  )
}

export default App
