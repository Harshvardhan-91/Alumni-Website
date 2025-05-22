import React, { createContext, useState, useContext, useEffect } from 'react';

// Ensure API_BASE_URL has the correct format without the /api suffix
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://alumni-website-backend2.onrender.com';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingProfile, setPendingProfile] = useState(null);

  useEffect(() => {
    // Check for stored token on mount and validate it
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      validateToken(token); // Validate the token with the server
    }
    setLoading(false);
  }, []);
  // Validate token with the server
  const validateToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // If token is invalid, log the user out
        logout();
        return;
      }

      const data = await response.json();
      // Update user data in case it changed
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      // If user has submitted a profile, check its status
      if (data.user.profileCompleted) {
        checkPendingProfile(token);
      }
    } catch (error) {
      console.error('Token validation error:', error);
    }
  };

  // Check if user has a pending profile request
  const checkPendingProfile = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pending-alumni/my-request`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.pendingRequest) {
          setPendingProfile(data.pendingRequest);
        }
      }
    } catch (error) {
      console.error('Error checking pending profile:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      // If user has submitted a profile, check its status
      if (data.user.profileCompleted) {
        checkPendingProfile(data.token);
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

const register = async (userData) => {
  try {
    console.log("Registering user with data:", userData);
    
    // Always use FormData for consistency, even if there's no image
    const formData = new FormData();
      
    // Add all user data to form
    Object.keys(userData).forEach(key => {
      if (key !== 'profileImage') {
        formData.append(key, userData[key]);
      }
    });
    
    // Add image if it exists
    if (userData.profileImage) {
      console.log("Adding profile image to form data");
      formData.append('profileImage', userData.profileImage);
    }
    
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      body: formData, // Don't set Content-Type header with FormData
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Registration failed. Please try again.'
    };
  }
};

// Admin login
const adminLogin = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Admin login failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Submit alumni profile for verification
const submitAlumniProfile = async (profileData, profileImage) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Create form data for file upload
    const formData = new FormData();
    
    // Add all profile fields to form data
    Object.keys(profileData).forEach(key => {
      formData.append(key, profileData[key]);
    });
    
    // Add image if it exists
    if (profileImage) {
      formData.append('image', profileImage);
    }

    const response = await fetch(`${API_BASE_URL}/api/pending-alumni/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type here, it will be set automatically with the boundary
      },
      body: formData,
      credentials: 'include'
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Profile submission failed');
    }

    // Update user info
    const updatedUser = { ...user, profileCompleted: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setPendingProfile(data.data);
    
    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  setPendingProfile(null);
};
  // Get pending profile status
  const getPendingProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }

      const response = await fetch(`${API_BASE_URL}/api/pending-alumni/my-request`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get profile status');
      }

      setPendingProfile(data.pendingRequest);
      return { success: true, data: data.pendingRequest };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      pendingProfile,
      loading, 
      login, 
      register, 
      adminLogin,
      logout, 
      submitAlumniProfile,
      getPendingProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);