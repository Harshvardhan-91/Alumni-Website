import React from 'react'
import Home from './Pages/Home'
import Events from './Pages/Events'
import { Routes , Route } from 'react-router-dom'
import AlumniDirectory from './Pages/AlumniDirectory'
import Posts from './Pages/Posts'
import Scholarship from './Pages/Scholarships';
import { NavbarComponent } from './components/navbar'
import Footer from './components/footer';
import AboutUs from './Pages/AboutUs';

const App = () => {
  return (
    <div>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/alumni-directory" element={<AlumniDirectory />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/scholarhips" element={<Scholarship />} />
        <Route path="aboutus" element={<AboutUs />} />
      </Routes>
      <Footer/>
    </div>

  )
}

export default App
