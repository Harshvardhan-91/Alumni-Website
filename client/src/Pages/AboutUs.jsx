import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Users, Award, Globe, Trophy, Briefcase, GraduationCap, Building2, ArrowUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // Create refs for each section
  const statsRef = useRef(null);
  const historyRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const impactRef = useRef(null);

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
      name: "Dr Anurag Kumari Tiwari",
      role: "Head of alumni Relations",
      department: "NIT Jalandhar",
      image: "https://nitj.ac.in/files/1724257451890-Picture1.jpg"
    },
    {
      name: "Dr Sangeeta Garg",
      role: "Professor",
      department: "NIT Jalandhar",
      image: "https://res.cloudinary.com/deysmiqsk/image/upload/v1740160782/dvov0qjorisaud2tzvnn.jpg"
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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
          entry.target.classList.add('reveal-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '-50px'
    });

    const sections = [statsRef, historyRef, missionRef, teamRef, impactRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      sections.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-5xl font-bold mb-6 animate-slideDown">
            About NITJ Alumni Association
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fadeIn">
            Connecting generations of excellence, fostering relationships, and building a stronger future.
          </p>
          <div className="h-1 w-20 bg-white mx-auto mt-8 rounded-full animate-pulse"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef} 
        id="stats" 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 reveal-section"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`bg-white shadow-lg hover:shadow-xl transition-all duration-500 
                ${visibleSections.has('stats') ? 'reveal-card' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center text-blue-600 mb-4 animate-bounce">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section 
        ref={historyRef}
        id="history" 
        className="py-16 relative reveal-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From our humble beginnings to becoming one of India's premier technological institutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {historicalMilestones.map((milestone, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500
                  ${visibleSections.has('history') ? 'reveal-card' : ''}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={missionRef}
        id="mission" 
        className="bg-gray-100 py-16 reveal-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-500
            ${visibleSections.has('mission') ? 'reveal-card' : ''}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl hover:bg-blue-100 transition-all duration-300">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Vision</h3>
                <p className="text-gray-700">
                  To create a vibrant, engaged alumni community that supports the growth and development of NITJ while fostering meaningful connections between past, present, and future generations of students.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl hover:bg-blue-100 transition-all duration-300">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Values</h3>
                <p className="text-gray-700">
                  Excellence, Innovation, Integrity, and Community. We believe in nurturing lifelong relationships and creating opportunities for professional and personal growth among our alumni network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        id="team" 
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 reveal-section"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated individuals who work tirelessly to strengthen our alumni community.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {teams.map((member, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-xl transition-all duration-500 
                ${visibleSections.has('team') ? 'reveal-card' : ''}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="relative mx-auto w-32 h-32 mb-4 overflow-hidden rounded-full 
                  transform transition-transform duration-300 hover:scale-105">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.department}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Alumni Impact Section */}
      <section 
        ref={impactRef}
        id="impact" 
        className="bg-gradient-to-b from-blue-700 to-blue-800 w-full reveal-section"
      >
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Alumni Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our alumni continue to make remarkable contributions across various fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 
                  transition-all duration-500 ${visibleSections.has('impact') ? 'reveal-card' : ''}`}
                style={{ animationDelay: `${index * 200}ms` }}
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
                <div 
                  key={index}
                  className={`bg-white bg-opacity-5 rounded-lg p-4 hover:bg-opacity-10 
                    transition-all duration-500 ${visibleSections.has('impact') ? 'reveal-card' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-blue-100">{recognition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full 
            shadow-lg hover:bg-blue-700 transition-all duration-300 animate-bounce z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* Global styles for animations and effects */}
      <style jsx global>{`
        .reveal-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
          visibility: hidden;
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
          visibility: visible;
        }

        .reveal-card {
          animation: cardReveal 0.8s ease-out forwards;
        }

        @keyframes cardReveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
            visibility: hidden;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          0% { 
            opacity: 0; 
            visibility: hidden;
          }
          100% { 
            opacity: 1;
            visibility: visible;
          }
        }

        .bg-pattern {
          background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
          background-size: 40px 40px;
        }

        .hover-scale {
          transition: transform 0.3s ease;
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        /* Enhanced hover effects */
        .card-hover-effect {
          transition: all 0.3s ease;
        }

        .card-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                    0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced image transitions */
        .team-image-transition {
          transition: all 0.3s ease-in-out;
        }

        .team-image-transition:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        /* Gradient text animation */
        .gradient-text {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          background-size: 200% 200%;
          animation: gradientBG 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Smooth section transitions */
        section {
          transition: opacity 0.5s ease-in-out;
        }

        /* Enhanced button hover effects */
        button {
          transition: all 0.3s ease;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;