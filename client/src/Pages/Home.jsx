import React from 'react'
import HeroSection from '../components/herosection';
import EnhancedAlumniSlider from '../components/alumnislider';
import UpcomingEvents from '../components/upcomingevents';
import Placement from "../components/placement";
import DeanMessage from '../components/dean';
import AlumniEngagement from '../components/engagement'; 

const Home = () => {
  return (
    <>
      <div className='w-[90vw] m-auto'>
        <HeroSection/>
        <EnhancedAlumniSlider/>
        <UpcomingEvents/>
        <Placement/>
        <DeanMessage/>
        <AlumniEngagement/>
      </div>
      </>
  )
}

export default Home
