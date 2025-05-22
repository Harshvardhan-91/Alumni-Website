import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, GraduationCap, Building, Briefcase, MapPin, Linkedin, Upload } from "lucide-react";
import { NavbarComponent } from '../components/navbar'
import Footer from '../components/footer'
const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    graduatingYear: new Date().getFullYear().toString(),
    confirmPassword: '',
    // Additional alumni profile fields
    department: '',
    company: '',
    role: '',
    linkedin: '',
    location: 'INDIA',
    profileImage: null
  });
  
  // For image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    }
  }, [user, navigate, location]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file
      });
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    // For login
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError('Email and password are required');
        return false;
      }
    }
    // For signup
    else {
      if (!formData.name || !formData.email || !formData.password || !formData.graduatingYear) {
        setError('Name, email, password, and graduating year are required');
        return false;
      }
      
      // Department is required for alumni profile
      if (!formData.department) {
        setError('Department is required for alumni verification');
        return false;
      }
      
      // Company and role are required for alumni profile
      if (!formData.company || !formData.role) {
        setError('Current company and role are required for alumni verification');
        return false;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      
      const yearNumber = parseInt(formData.graduatingYear);
      if (isNaN(yearNumber) || yearNumber < 1950 || yearNumber > 2030) {
        setError('Graduating year must be between 1950 and 2030');
        return false;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
      
      // LinkedIn URL validation if provided
      if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
        setError('Please enter a valid LinkedIn URL');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form first
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
  
    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error);
        }
      } else {
        // Register user with alumni profile data
        const result = await register({
          username: formData.email.split('@')[0], // Generate username from email
          name: formData.name,
          email: formData.email,
          password: formData.password,
          graduatingYear: parseInt(formData.graduatingYear),
          // Include alumni profile data
          department: formData.department,
          company: formData.company,
          designation: formData.role,
          linkedin: formData.linkedin,
          country: formData.location,
          profileImage: formData.profileImage
        });
        if (result.success) {
          navigate('/profile-submission');
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <NavbarComponent />
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please {isLogin ? 'sign in to' : 'create'} your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex mb-4 border-b">
            <button
              className={`flex-1 py-2 text-center ${isLogin ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center ${!isLogin ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin ? (
              <>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Profile Photo
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      Max size: 5MB. Square image recommended.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Graduating Year
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <GraduationCap size={18} />
                      </span>
                      <input
                        type="number"
                        name="graduatingYear"
                        value={formData.graduatingYear}
                        onChange={handleChange}
                        min="1950"
                        max="2030"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your graduating year"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <GraduationCap size={18} />
                      </span>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Department</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Chemical">Chemical</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Information Technology">Information Technology</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Current Company & Role - Two columns */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Company
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <Building size={18} />
                      </span>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your current company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Role
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <Briefcase size={18} />
                      </span>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your job title"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* LinkedIn & Location - Two columns */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <Linkedin size={18} />
                      </span>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <MapPin size={18} />
                      </span>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="INDIA">INDIA</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AuthPage;
