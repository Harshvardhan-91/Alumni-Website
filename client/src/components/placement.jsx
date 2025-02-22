import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, GraduationCap, Briefcase, TrendingUp, ChevronDown, ChevronUp, Building2, Award, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom';
const stats = [
  { 
    name: 'Students Placed', 
    value: 95, 
    icon: Users, 
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    textColor: 'text-white',
    detail: 'Out of 100 eligible students',
    chartData: [74, 89, 90.32, 100] // Last 4 years
  },
  { 
    name: 'Average Package', 
    value: 900000, 
    prefix: '$', 
    icon: Briefcase, 
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    textColor: 'text-white',
    detail: '15% increase from last year',
    chartData: [600000, 776000, 745000, 726000]
  },
  { 
    name: 'Highest Package', 
    value: 150000, 
    prefix: '$', 
    icon: TrendingUp, 
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    textColor: 'text-white',
    detail: 'Offered by a leading tech giant',
    chartData: [1100000, 2200000, 1400000, 1515000]
  },
  { 
    name: 'Companies Visited', 
    value: 50, 
    icon: Building2, 
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    textColor: 'text-white',
    detail: 'Including Fortune 500 companies',
    chartData: [26, 29, 28, 50]
  },
]

const departmentInfo = [
  {
    title: "State-of-the-art Facilities",
    description: "Our laboratories are equipped with the latest technology, including AI-powered workstations, VR/AR development kits, and high-performance computing clusters.",
    icon: Building2,
    link:"https://departments.nitj.ac.in/dept/ch/DepartmentLab"
  },
  {
    title: "Expert Faculty",
    description: "Our faculty members have an average of 15+ years of industry experience and have published in top-tier academic journals.",
    icon: GraduationCap,
    link:"https://departments.nitj.ac.in/dept/ch/Faculty"
  },
  {
    title: "Industry Collaborations",
    description: "We have active partnerships with companies like Google, Microsoft, and Amazon for internships, projects, and research opportunities.",
    icon: Briefcase,
    link:"#"
  },
  {
    title: "Cutting-edge Curriculum",
    description: "Our curriculum is regularly updated to include the latest technologies and methodologies, ensuring our students are always industry-ready.",
    icon: BookOpen,
    link:"https://departments.nitj.ac.in/dept/ch/Syllabus"
  },
  {
    title: "Research Excellence",
    description: "Students can participate in groundbreaking research in fields like Quantum Computing, Blockchain, and Artificial Intelligence.",
    icon: Award,
    link:"#"
  },
]

// Custom hook for scroll reveal
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

function CountUp({ from, to, duration }) {
  CountUp.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  };
  
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime
    let animationFrame

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * (to - from) + from))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration])

  return <>{count.toLocaleString()}</>
}

export default function EnhancedDepartmentStats() {
  const [expandedInfo, setExpandedInfo] = useState(null)
  const [headerRef, isHeaderVisible] = useScrollReveal();
  const [statsRef, isStatsVisible] = useScrollReveal();
  const [infoRef, isInfoVisible] = useScrollReveal();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 transform
            ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="text-blue-600 font-semibold tracking-wider uppercase mb-2 block">
            Placement Statistics
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Department of Chemical Engineering
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 rounded-full" />
          <p className="text-gray-600">
            Empowering futures through excellence in education and industry partnerships
          </p>
        </div>
        
        <div 
          ref={statsRef}
          className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16 transition-all duration-1000 transform
            ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.name}
              className={`${stat.color} ${stat.textColor} rounded-xl p-6 shadow-lg 
                         hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <stat.icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-bold">
                  {stat.prefix}
                  <CountUp from={0} to={stat.value} duration={2} />
                  {stat.suffix}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{stat.name}</h3>
              <p className="text-sm opacity-90">{stat.detail}</p>
              
              <div className="mt-4 flex items-end space-x-1 h-12">
                {stat.chartData.map((value, i) => (
                  <div
                    key={i}
                    className="w-1/4 bg-white/20 rounded-t transition-all duration-500 hover:bg-white/30"
                    style={{ 
                      height: `${(value / Math.max(...stat.chartData)) * 100}%`,
                      transitionDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 text-xs opacity-75 text-center">
                Last 4 Years Trend
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={infoRef}
          className={`bg-white rounded-xl shadow-xl p-8 transition-all duration-1000 transform
            ${isInfoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Why Choose Our Department?</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {departmentInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button 
                  onClick={() => setExpandedInfo(expandedInfo === index ? null : index)}
                  className="flex items-start w-full text-left space-x-4"
                >
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg flex-shrink-0">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                    <Link to={info.link}>
                      <span className="font-semibold text-gray-900">{info.title}</span>
                    </Link>
                      {expandedInfo === index ? 
                        <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                    </div>
                    <AnimatePresence>
                      {expandedInfo === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 text-sm text-gray-600"
                        >
                          {info.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}