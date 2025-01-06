import React, { useState } from "react";
import { Search, MapPin, Building, GraduationCap, Filter, Briefcase, Calendar, Mail, Phone } from "lucide-react";
import { FiLinkedin } from "react-icons/fi"; // Import LinkedIn icon
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

  // Sample alumni data - replace with your actual data
  const alumniData = [
    {
      id: 1,
      name: "Rahul Sharma",
      image: "/api/placeholder/150/150",
      batch: "2018",
      department: "Computer Science",
      degree: "B.Tech",
      company: "Microsoft",
      designation: "Senior Software Engineer",
      location: "Bangalore, India",
      industry: "Technology",
      email: "rahul.sharma@example.com",
      phone: "+91 98765 43210",
      linkedin: "linkedin.com/in/rahulsharma",
      achievements: "Led development of Azure cloud services, Patent holder",
    },
    {
      id: 2,
      name: "Priya Patel",
      image: "/api/placeholder/150/150",
      batch: "2019",
      department: "Electronics",
      degree: "B.Tech",
      company: "Intel",
      designation: "Hardware Engineer",
      location: "Pune, India",
      industry: "Semiconductor",
      email: "priya.patel@example.com",
      phone: "+91 98765 43211",
      linkedin: "linkedin.com/in/priyapatel",
      achievements: "Published research paper on VLSI design",
    },
    // Add more alumni profiles here
  ];

  const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Chemical"];
  const batches = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  const industries = ["Technology", "Semiconductor", "Manufacturing", "Consulting", "Finance"];
  const locations = ["Bangalore", "Pune", "Delhi", "Mumbai", "International"];

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

                  <Select onValueChange={(value) => setFilters({ ...filters, industry: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
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

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumniData.map((alumni) => (
            <Card key={alumni.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{alumni.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {alumni.designation} at {alumni.company}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {alumni.degree}, {alumni.batch}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Building className="h-4 w-4 mr-2" />
                        {alumni.department}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {alumni.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Achievements</h4>
                  <p className="text-sm text-gray-600 mb-4">{alumni.achievements}</p>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
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
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Alumni
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectory;
