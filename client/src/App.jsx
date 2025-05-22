import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Events from './Pages/Events'
import AlumniDirectory from './Pages/AlumniDirectory'
import Posts from './Pages/Posts'
import Scholarship from './Pages/Scholarships'
import AboutUs from './Pages/AboutUs'
import Scholarships from './Pages/Scholarships'
import Login from './Pages/Login'
import AlumniDonationForm from './Pages/Donation'
import Community from './Pages/Community'
import ProfileSubmission from './Pages/ProfileSubmission'
import AdminDashboard from './Pages/AdminDashboard'
import AdminLogin from './Pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/alumni-directory" element={<AlumniDirectory />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/scholarhips" element={<Scholarship />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/donation" element={<AlumniDonationForm/>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Protected Routes */}
        <Route 
          path="/community" 
          element={
            <ProtectedRoute>
              <Community/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile-submission" 
          element={
            <ProtectedRoute>
              <ProfileSubmission/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App