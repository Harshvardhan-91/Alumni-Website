import React from 'react';
import { Award, BookOpen, Calculator, Calendar, CheckCircle, Gift, GraduationCap, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Scholarships = () => {
  const featuredScholarships = [
    {
      title: "Merit Excellence Scholarship",
      amount: "₹50,000",
      deadline: "August 15, 2025",
      criteria: "CGPA above 8.5",
      icon: <Award className="h-8 w-8 text-blue-600" />,
      description: "Awarded to top-performing students in Chemical Engineering based on academic excellence."
    },
    {
      title: "Research Innovation Grant",
      amount: "₹75,000",
      deadline: "September 30, 2025",
      criteria: "Research Proposal Required",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      description: "Supporting innovative research projects in Chemical Engineering and related fields."
    },
    {
      title: "Alumni Support Scholarship",
      amount: "₹60,000",
      deadline: "July 31, 2025",
      criteria: "Need-based",
      icon: <Gift className="h-8 w-8 text-blue-600" />,
      description: "Funded by our generous alumni to support deserving students facing financial challenges."
    }
  ];

  const eligibilityCriteria = [
    {
      title: "Academic Performance",
      description: "Minimum CGPA requirements vary by scholarship type",
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Enrollment Status",
      description: "Must be a full-time Chemical Engineering student",
      icon: <CheckCircle className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Application Timeline",
      description: "Applications must be submitted by specified deadlines",
      icon: <Calendar className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Documentation",
      description: "Complete documentation including academic records required",
      icon: <Calculator className="h-6 w-6 text-blue-600" />
    }
  ];

  const applicationSteps = [
    "Review eligibility criteria and scholarship requirements",
    "Gather necessary documentation (academic transcripts, income certificates, etc.)",
    "Complete the online application form",
    "Submit supporting documents",
    "Track application status through the portal"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Chemical Engineering Scholarships</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Supporting excellence in Chemical Engineering through merit-based and need-based scholarships, 
            making quality education accessible to deserving students.
          </p>
          <div className="h-1 w-20 bg-white mx-auto mt-8 rounded-full"></div>
        </div>
      </div>

      {/* Featured Scholarships Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredScholarships.map((scholarship, index) => (
            <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {scholarship.icon}
                  <h3 className="text-xl font-semibold ml-3">{scholarship.title}</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600">{scholarship.description}</p>
                  <div className="border-t pt-3">
                    <p className="text-blue-600 font-semibold">Amount: {scholarship.amount}</p>
                    <p className="text-gray-600">Deadline: {scholarship.deadline}</p>
                    <p className="text-gray-600">Criteria: {scholarship.criteria}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Eligibility Criteria Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understanding the eligibility requirements is the first step towards securing financial support for your education.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eligibilityCriteria.map((criteria, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {criteria.icon}
                <h3 className="text-lg font-semibold ml-3">{criteria.title}</h3>
              </div>
              <p className="text-gray-600">{criteria.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Process Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">How to Apply</h3>
                <ul className="space-y-4">
                  {applicationSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex items-center justify-center bg-blue-100 text-blue-800 rounded-full w-6 h-6 mt-1 mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800 ml-2">Need Help?</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Our scholarship support team is here to assist you with any questions about the application process.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Email: scholarships@nitj.ac.in</li>
                  <li>• Phone: +91-XXX-XXX-XXXX</li>
                  <li>• Office Hours: Monday-Friday, 9 AM - 5 PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Dates Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Dates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mark your calendar with these crucial deadlines for the academic year 2025-26.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">First Semester</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Application Opens</span>
                  <span className="text-blue-600 font-medium">July 1, 2025</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Submission Deadline</span>
                  <span className="text-blue-600 font-medium">August 15, 2025</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Results Announcement</span>
                  <span className="text-blue-600 font-medium">September 1, 2025</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Second Semester</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Application Opens</span>
                  <span className="text-blue-600 font-medium">December 1, 2025</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Submission Deadline</span>
                  <span className="text-blue-600 font-medium">January 15, 2026</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Results Announcement</span>
                  <span className="text-blue-600 font-medium">February 1, 2026</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;