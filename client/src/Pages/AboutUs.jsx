import React from 'react';
import { BookOpen, Users, Award, Globe, Trophy, Briefcase, GraduationCap, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs = () => {
  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "10,000+", label: "Alumni Worldwide" },
    { icon: <BookOpen className="h-6 w-6" />, value: "50+", label: "Years of Excellence" },
    { icon: <Award className="h-6 w-6" />, value: "500+", label: "Notable Alumni" },
    { icon: <Globe className="h-6 w-6" />, value: "30+", label: "Countries Represented" },
  ];

  const achievements = [
    {
      icon: <Trophy className="h-8 w-8 text-blue-600" />,
      title: "Industry Leaders",
      description: "Our alumni hold leadership positions in Fortune 500 companies, leading technological innovation and business transformation worldwide.",
      stats: "100+ CEOs and Directors"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-600" />,
      title: "Entrepreneurs",
      description: "NITJ alumni have founded successful startups and businesses, creating jobs and driving economic growth across sectors.",
      stats: "200+ Startups Founded"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      title: "Academic Excellence",
      description: "Many of our alumni are distinguished professors and researchers at prestigious institutions globally.",
      stats: "150+ PhD Holders"
    }
  ];

  const teams = [
    {
      name: "Dr Poonam Gera",
      role: "Head of Department",
      department: "Chemical Engineering",
      image: "https://nitj.ac.in/files/1724841196778-Picture-%20Dr%20PG.jpg"
    },
    {
      name: "Dr Ajay Bansal",
      role: "Registrar",
      department: "NIT Jalandhar",
      image: "https://nitj.ac.in/files/1717741345401-Passport%20Pic.jpg"
    },
    {
      name: "Dr Shailendra Bajpai",
      role: "Chief Warden",
      department: "NIT Jalandhar",
      image: "https://nitj.ac.in/files/1708596109985-Self%20pic.jpg"
    }
  ];

  const historicalMilestones = [
    {
      year: "1987",
      title: "Establishment",
      description: "Founded as Regional Engineering College Jalandhar"
    },
    {
      year: "2002",
      title: "NIT Status",
      description: "Transformed into National Institute of Technology"
    },
    {
      year: "2007",
      title: "Institute of National Importance",
      description: "Declared as Institute of National Importance by NIT Act"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About NITJ Alumni Association</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Connecting generations of excellence, fostering relationships, and building a stronger future for our NITJ community. We bridge the past with the present to inspire future innovation.
          </p>
          <div className="h-1 w-20 bg-white mx-auto mt-8 rounded-full"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From our humble beginnings to becoming one of India's premier technological institutions, our journey has been marked by continuous growth and excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {historicalMilestones.map((milestone, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
              <p className="text-gray-600">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Vision</h3>
                <p className="text-gray-700">
                  To create a vibrant, engaged alumni community that supports the growth and development of NITJ while fostering meaningful connections between past, present, and future generations of students.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Values</h3>
                <p className="text-gray-700">
                  Excellence, Innovation, Integrity, and Community. We believe in nurturing lifelong relationships and creating opportunities for professional and personal growth among our alumni network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated individuals who work tirelessly to strengthen our alumni community and foster meaningful connections.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {teams.map((member, index) => (
            <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.department}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Alumni Impact Section */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-800 w-full">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Alumni Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our alumni continue to make remarkable contributions across various fields,
              embodying the spirit of excellence that NITJ stands for.
            </p>
            <div className="h-1 w-20 bg-white mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-white space-y-4">
                  <div className="p-4 bg-white bg-opacity-20 rounded-full">
                    {achievement.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{achievement.title}</h3>
                  <p className="text-blue-100 text-center">
                    {achievement.description}
                  </p>
                  <div className="mt-4 text-lg font-semibold text-blue-200">
                    {achievement.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Global Recognition</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Forbes 30 Under 30', 'National Awards', 'Research Patents', 'International Honors'].map((recognition, index) => (
                <div key={index} className="bg-white bg-opacity-5 rounded-lg p-4">
                  <p className="text-blue-100">{recognition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;