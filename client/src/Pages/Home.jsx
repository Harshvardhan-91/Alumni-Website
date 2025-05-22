import React from 'react'
import HeroSection from '../components/herosection';
import EnhancedAlumniSlider from '../components/alumnislider';
import UpcomingEvents from '../components/upcomingevents';
import Placement from "../components/placement";
import DeanMessage from '../components/dean';
import AlumniEngagement from '../components/engagement'; 
import { NavbarComponent } from '../components/navbar'
import Footer from '../components/footer'
const Home = () => {
  return (
    <>
      <NavbarComponent/>
      <div className='w-[90vw] m-auto'>
        <HeroSection/>
        <EnhancedAlumniSlider/>
        <UpcomingEvents/>
        <Placement/>
        <DeanMessage/>
        <AlumniEngagement/>
      </div>
      <Footer/>
      </>
  )
}

export default Home
