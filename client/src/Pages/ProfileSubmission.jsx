import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Phone, 
  Linkedin, 
  Upload,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileSubmission = () => {
  const navigate = useNavigate();
  const { user, submitAlumniProfile, pendingProfile, getPendingProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    batch: '',
    department: '',
    degree: '',
    company: '',
    designation: '',
    linkedin: '',
    country: 'INDIA',
    phone: ''
  });

  const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Chemical", "Biotechnology", "Electrical", "Information Technology"];
  const batches = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
  const degrees = ["B.Tech", "M.Tech", "Ph.D", "MBA"];
  const countries = ["INDIA", "USA", "UK", "Canada", "Australia", "Germany", "Japan", "Singapore", "Other"];

  // Check if user already has a pending profile
  useEffect(() => {
    const checkPendingProfile = async () => {
      if (user?.profileCompleted) {
        setLoading(true);
        const result = await getPendingProfile();
        setLoading(false);
        
        if (result.success && result.data) {
          // Redirect to status page or show status
          setSuccess('You have already submitted your profile for verification');
        }
      }
    };
    
    checkPendingProfile();
  }, [user, getPendingProfile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = ['name', 'batch', 'department', 'degree', 'company', 'designation'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }
    
    if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
      setError('Please enter a valid LinkedIn URL');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await submitAlumniProfile(formData, profileImage);
      
      if (result.success) {
        setSuccess('Profile submitted successfully for verification');
        // Reset form after success
        setFormData({
          name: user?.name || '',
          batch: '',
          department: '',
          degree: '',
          company: '',
          designation: '',
          linkedin: '',
          country: 'INDIA',
          phone: ''
        });
        setProfileImage(null);
        setImagePreview(null);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // If user is not logged in, redirect to login page
  if (!user) {
    navigate('/login', { state: { from: { pathname: '/profile-submission' } } });
    return null;
  }

  // If user already has a verified alumni profile
  if (user.role === 'alumni' && user.isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Alumni Status</CardTitle>
              <CardDescription>Your alumni status is active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Verified Alumni</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your alumni profile has been verified and is visible in the alumni directory.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate('/alumni-directory')}>
                View Alumni Directory
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // If user has a pending profile verification
  if (pendingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Verification Pending</CardTitle>
              <CardDescription>Your alumni profile is under review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
                  <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Verification in Progress</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your alumni profile has been submitted for verification. Our team will review it shortly.
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Submitted on: {new Date(pendingProfile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => navigate('/')}>
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Alumni Profile Submission</h1>
          <p className="mt-2 text-gray-600">Complete your profile to be listed in the alumni directory</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
            <p>{success}</p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Your Alumni Information</CardTitle>
            <CardDescription>
              Fill in your details for verification. This information will be displayed in the alumni directory after verification.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center justify-center">
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
                    Upload Photo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                
                <p className="mt-2 text-xs text-gray-500">
                  Max size: 5MB. Recommended: Square JPG or PNG.
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <User size={18} />
                  </span>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              {/* Batch & Department - Two columns */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Year</label>
                  <Select name="batch" onValueChange={(value) => handleSelectChange('batch', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select batch year" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map((batch) => (
                        <SelectItem key={batch} value={batch}>
                          {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <Select name="department" onValueChange={(value) => handleSelectChange('department', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <GraduationCap size={18} />
                  </span>
                  <Select name="degree" onValueChange={(value) => handleSelectChange('degree', value)}>
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {degrees.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <Building size={18} />
                  </span>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Where do you work?"
                    required
                  />
                </div>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Position</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <Briefcase size={18} />
                  </span>
                  <Input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Your job title"
                    required
                  />
                </div>
              </div>

              {/* Country & Phone - Two columns */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <MapPin size={18} />
                    </span>
                    <Select name="country" onValueChange={(value) => handleSelectChange('country', value)} defaultValue="INDIA">
                      <SelectTrigger className="w-full pl-10">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Phone size={18} />
                    </span>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <Linkedin size={18} />
                  </span>
                  <Input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Optional but recommended for verification</p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit for Verification'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSubmission;
