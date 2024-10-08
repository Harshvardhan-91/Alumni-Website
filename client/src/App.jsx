import React from 'react'
import Home from './Pages/Home'
import Events from './Pages/Events'
import { Routes , Route } from 'react-router-dom'
import AlumniDirectory from './Pages/AlumniDirectory'
import Posts from './Pages/Posts'
import Scholarship from './Pages/Scholarships';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/alumni-directory" element={<AlumniDirectory />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/scholarhips" element={<Scholarship />} />
      </Routes>
    </div>

  )
}

export default App
