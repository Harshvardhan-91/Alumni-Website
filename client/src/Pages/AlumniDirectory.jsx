import { useState, useEffect, useCallback } from "react";
import { Search, MapPin, Building, GraduationCap, Filter, Mail } from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarComponent } from '../components/navbar'
import Footer from '../components/footer'

// Import static alumni data for fallback
import staticAlumniData from "../data/alumni-static.json";

const AlumniDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    batch: "all",
    department: "all",
    location: "all",
  });
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usingFallback, setUsingFallback] = useState(false);

  const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Chemical", "Biotechnology", "Electrical", "Information Technology"];
  const batches = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
  const locations = ["INDIA", "USA", "Germany", "UK", "Canada", "Australia", "Japan", "Singapore", "Other"];

  // Define fetchAlumni with useCallback to avoid dependency issues
  const fetchAlumni = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pageNum,
        limit: 12,
        search: searchTerm,
      });
      
      // Add filters if they're not "all"
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "all") {
          queryParams.append(key, value);
        }
      });
      
      // Use environment variable or hardcoded URL as backup
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      const response = await fetch(`${baseUrl}/api/alumni?${queryParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (pageNum === 1) {
        setAlumni(data.alumni);
      } else {
        setAlumni(prev => [...prev, ...data.alumni]);
      }
      
      setUsingFallback(false);
      setTotalPages(data.totalPages || 1);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching alumni:', error);
      
      // Use static data as fallback
      if (pageNum === 1) {
        console.log('Using fallback static alumni data');
        setAlumni(staticAlumniData.alumni || []);
        setUsingFallback(true);
        setTotalPages(1);
      }
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters]);

  // Initial data fetch
  useEffect(() => {
    fetchAlumni(1);
  }, [fetchAlumni]);

  // Debounce search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAlumni(1);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, filters, fetchAlumni]);

  const handleLoadMore = () => {
    if (page < totalPages && !usingFallback) {
      fetchAlumni(page + 1);
    }
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleLinkedinClick = (linkedin) => {
    if (linkedin) {
      window.open(linkedin.startsWith('http') ? linkedin : `https://${linkedin}`, '_blank');
    }
  };

  return (
    <>
      <NavbarComponent />
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Directory</h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect with over 10,000+ NITJ alumni worldwide and build your professional network
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alumni by name, company, or role..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden md:inline">Filters</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Graduating Year</label>
                      <Select onValueChange={(value) => setFilters({ ...filters, batch: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Batches" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Batches</SelectItem>
                          {batches.map((batch) => (
                            <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Department</label>
                      <Select onValueChange={(value) => setFilters({ ...filters, department: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Location</label>
                      <Select onValueChange={(value) => setFilters({ ...filters, location: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" onClick={() => {
                setFilters({
                  batch: "all",
                  department: "all",
                  location: "all",
                });
                setSearchTerm("");
              }}>
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {usingFallback && (
          <div className="text-center p-4 bg-yellow-100 text-yellow-700 rounded-lg mb-6">
            Using locally stored alumni data. Showing a limited selection.
          </div>
        )}

        {/* Results Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {loading ? 'Loading alumni...' : (
              alumni.length > 0 ? `${alumni.length} ${alumni.length === 1 ? 'alum found' : 'alumni found'}` : 'No alumni found'
            )}
          </h2>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-56 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {alumni.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {alumni.map((alum, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex p-4">
                          <div className="mr-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                              {alum.image ? (
                                <img 
                                  src={alum.image} 
                                  alt={alum.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/src/assets/logo.jpeg';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-500">
                                  {alum.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{alum.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">{alum.profession || alum.role || alum.designation}</p>
                            
                            <div className="flex flex-wrap gap-y-1">
                              {alum.batch && (
                                <div className="flex items-center text-xs text-gray-500 mr-3">
                                  <GraduationCap className="h-3 w-3 mr-1" />
                                  <span>{alum.batch}</span>
                                </div>
                              )}
                              
                              {alum.department && (
                                <div className="flex items-center text-xs text-gray-500 mr-3">
                                  <GraduationCap className="h-3 w-3 mr-1" />
                                  <span>{alum.department}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-y-1 mt-1">
                              {alum.company && (
                                <div className="flex items-center text-xs text-gray-500 mr-3">
                                  <Building className="h-3 w-3 mr-1" />
                                  <span>{alum.company}</span>
                                </div>
                              )}
                              
                              {alum.location && (
                                <div className="flex items-center text-xs text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{alum.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Connect Section */}
                        <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                          <div className="text-xs text-gray-500">Connect:</div>
                          <div className="flex gap-2">
                            {alum.email && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 p-0 px-2"
                                onClick={() => handleEmailClick(alum.email)}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                            )}
                            
                            {alum.linkedin && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 p-0 px-2"
                                onClick={() => handleLinkedinClick(alum.linkedin)}
                              >
                                <FiLinkedin className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No matching alumni found. Try adjusting your search filters.</p>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Load More */}
        {!loading && alumni.length > 0 && page < totalPages && !usingFallback && (
          <div className="text-center">
            <Button 
              onClick={handleLoadMore} 
              variant="outline"
              className="px-8"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
      <Footer />
    </>
  );
};

export default AlumniDirectory;
