import React from 'react'
import { NavbarComponent } from '../components/navbar'
import HeroSection from '../components/herosection';
import EnhancedAlumniSlider from '../components/alumnislider';
import Footer from '../components/footer';
import UpcomingEvents from '../components/upcomingevents';
import Placement from "../components/placement";
import DeanMessage from '../components/dean';
import AlumniEngagement from '../components/engagement'; 

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
