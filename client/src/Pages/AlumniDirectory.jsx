import React, { useState, useEffect } from "react";
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

const AlumniDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    batch: "all",
    department: "all",
    location: "all",
    industry: "all",
  });
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const departments = ["None", "Computer Science", "Electronics", "Mechanical", "Civil", "Chemical", "Biotechnology", "Electrical", "Information Technology"];
  const batches = ["None", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
  const industries = ["None", "Technology", "Semiconductor", "Manufacturing", "Consulting", "Finance", "Automobile", "Construction", "Energy", "Pharmaceuticals", "Chemicals"];
  const locations = ["None", "INDIA", "USA", "Germany", "Switzerland", "Other"];

  const fetchAlumni = async (pageNum = 1) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pageNum,
        limit: 12,
        search: searchTerm,
        ...filters
      });
      
      const baseUrl = 'https://alumni-website-backend2.onrender.com';
      
      const response = await fetch(`${baseUrl}/api/alumni?${queryParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (pageNum === 1) {
        setAlumni(data.alumni);
      } else {
        setAlumni(prev => [...prev, ...data.alumni]);
      }
      
      setTotalPages(data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching alumni:', error);
      setAlumni([]); // Clear alumni on error
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni(1);
  }, [searchTerm, filters]);

  // Debounce search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAlumni(1);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleLoadMore = () => {
    if (page < totalPages) {
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
                  placeholder="Search alumni by name, company, or designation..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-4">
                <div className="space-y-4">
                  <Select onValueChange={(value) => setFilters({ ...filters, batch: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map((batch) => (
                        <SelectItem key={batch} value={batch}>
                          Batch {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(value) => setFilters({ ...filters, department: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(value) => setFilters({ ...filters, location: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Loading State */}
        {loading && page === 1 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading alumni...</p>
          </div>
        )}

        {/* No Results State */}
        {!loading && alumni.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No alumni found matching your criteria</p>
          </div>
        )}

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((alumnus) => (
            <Card key={alumnus._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={alumnus.image}
                    alt={alumnus.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{alumnus.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {alumnus.designation} at {alumnus.company}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {alumnus.degree}, {alumnus.batch}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Building className="h-4 w-4 mr-2" />
                        {alumnus.department}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {alumnus.country}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEmailClick(alumnus.email)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleLinkedinClick(alumnus.linkedin)}
                      disabled={!alumnus.linkedin}
                    >
                      <FiLinkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {alumni.length > 0 && page < totalPages && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More Alumni'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;