import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, GraduationCap, Building, Briefcase, MapPin, Linkedin, Upload, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { NavbarComponent } from '../components/navbar'
import Footer from '../components/footer'

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[^a-zA-Z0-9]+/)) strength++;

    const strengthMap = {
      0: { text: 'Very Weak', color: 'bg-red-500' },
      1: { text: 'Weak', color: 'bg-red-400' },
      2: { text: 'Fair', color: 'bg-yellow-400' },
      3: { text: 'Good', color: 'bg-blue-400' },
      4: { text: 'Strong', color: 'bg-green-400' },
      5: { text: 'Very Strong', color: 'bg-green-500' }
    };

    return { strength, ...strengthMap[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 lg:p-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className={`w-full relative z-10 ${isLogin ? 'max-w-md' : 'max-w-6xl'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {isLogin ? 'Welcome Back' : 'Join Alumni Network'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Create your alumni profile'}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm bg-opacity-95">
            {/* Tab Navigation */}
            <div className="flex bg-gray-50 border-b border-gray-200">
              <button
                className={`flex-1 py-4 text-center font-medium transition-all duration-300 relative ${
                  isLogin 
                    ? 'text-blue-600 bg-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setIsLogin(true)}
              >
                {isLogin && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                )}
                Login
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-all duration-300 relative ${
                  !isLogin 
                    ? 'text-blue-600 bg-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setIsLogin(false)}
              >
                {!isLogin && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                )}
                Sign Up
              </button>
            </div>

            <div className={`${isLogin ? 'p-8' : 'p-6 lg:p-10'}`}>
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start space-x-3 animate-pulse">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {isLogin ? (
                  <>
                    {/* Login Form */}
                    <div className="space-y-5">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <Mail size={18} />
                          </span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <Lock size={18} />
                          </span>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="Enter your password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Sign Up Form - Enhanced Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Column - Profile & Basic Info */}
                      <div className="lg:col-span-1 space-y-6">
                        {/* Profile Image Upload */}
                        <div className="flex flex-col items-center py-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Photo</h3>
                          <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg transition-all duration-200 group-hover:border-blue-300">
                              {imagePreview ? (
                                <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                                  <User size={32} />
                                </div>
                              )}
                            </div>
                            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                              <Upload className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={20} />
                            </div>
                          </div>
                          
                          <label className="mt-4 inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all duration-200 transform hover:scale-105">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photo
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="mt-2 text-xs text-gray-500 text-center">
                            Max size: 5MB<br />Square image recommended
                          </p>
                        </div>

                        {/* Basic Information Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                          <div className="space-y-4">
                            {/* Name */}
                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <User size={18} />
                                </span>
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                  placeholder="Enter your full name"
                                  required
                                />
                              </div>
                            </div>

                            {/* Email */}
                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <Mail size={18} />
                                </span>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                  placeholder="Enter your email"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Column - Security & Academic Info */}
                      <div className="lg:col-span-1 space-y-6">
                        {/* Security Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
                          <div className="space-y-4">
                            {/* Password */}
                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <Lock size={18} />
                                </span>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                  placeholder="Enter your password"
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                              {/* Password Strength Indicator */}
                              {formData.password && (
                                <div className="mt-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">
                                      {passwordStrength.text}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Confirm Password */}
                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <Lock size={18} />
                                </span>
                                <input
                                  type={showConfirmPassword ? "text" : "password"}
                                  name="confirmPassword"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                  placeholder="Confirm your password"
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {formData.confirmPassword && (
                                  <div className="absolute right-12 top-3.5">
                                    {formData.password === formData.confirmPassword ? (
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                      <AlertCircle className="h-5 w-5 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Academic Information Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Background</h3>
                          <div className="space-y-4">
                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Graduating Year *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <GraduationCap size={18} />
                                </span>
                                <input
                                  type="number"
                                  name="graduatingYear"
                                  value={formData.graduatingYear}
                                  onChange={handleChange}
                                  min="1950"
                                  max="2030"
                                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                  placeholder="Year"
                                  required
                                />
                              </div>
                            </div>

                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Department *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <GraduationCap size={18} />
                                </span>
                                <select
                                  name="department"
                                  value={formData.department}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none"
                                  required
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
                        </div>
                      </div>

                      {/* Right Column - Professional & Contact Info */}
                      <div className="lg:col-span-1 space-y-6">
                        {/* Professional Information Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
                          <div className="space-y-4">
                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Current Company *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <Building size={18} />
                                </span>
                                <input
                                  type="text"
                                  name="company"
                                  value={formData.company}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                  placeholder="Company name"
                                  required
                                />
                              </div>
                            </div>

                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Current Role *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <Briefcase size={18} />
                                </span>
                                <input
                                  type="text"
                                  name="role"
                                  value={formData.role}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                  placeholder="Job title"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact & Social Information Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact & Social</h3>
                          <div className="space-y-4">
                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                LinkedIn URL
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <Linkedin size={18} />
                                </span>
                                <input
                                  type="url"
                                  name="linkedin"
                                  value={formData.linkedin}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                  placeholder="linkedin.com/in/..."
                                />
                              </div>
                            </div>

                            <div className="group">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Location
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                  <MapPin size={18} />
                                </span>
                                <select
                                  name="location"
                                  value={formData.location}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none"
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
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <div className={`${!isLogin ? 'pt-6 border-t border-gray-200' : ''}`}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? (
              <p>Don't have an account? <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline font-medium">Sign up here</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline font-medium">Sign in here</button></p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;