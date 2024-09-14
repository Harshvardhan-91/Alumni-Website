'use client'

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, GraduationCap, Briefcase, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'

const stats = [
  { 
    name: 'Students Placed', 
    value: 95, 
    icon: Users, 
    color: 'bg-blue-100 text-blue-800',
    detail: 'Out of 100 eligible students'
  },
  { 
    name: 'Average Package', 
    value: 900000, 
    prefix: '$', 
    icon: Briefcase, 
    color: 'bg-green-100 text-green-800',
    detail: '15% increase from last year'
  },
  { 
    name: 'Highest Package', 
    value: 150000, 
    prefix: '$', 
    icon: TrendingUp, 
    color: 'bg-purple-100 text-purple-800',
    detail: 'Offered by a leading tech giant'
  },
  { 
    name: 'Companies Visited', 
    value: 50, 
    icon: GraduationCap, 
    color: 'bg-yellow-100 text-yellow-800',
    detail: 'Including Fortune 500 companies'
  },
]

const departmentInfo = [
  {
    title: "State-of-the-art Facilities",
    description: "Our laboratories are equipped with the latest technology, including AI-powered workstations, VR/AR development kits, and high-performance computing clusters."
  },
  {
    title: "Expert Faculty",
    description: "Our faculty members have an average of 15+ years of industry experience and have published in top-tier academic journals."
  },
  {
    title: "Industry Collaborations",
    description: "We have active partnerships with companies like Google, Microsoft, and Amazon for internships, projects, and research opportunities."
  },
  {
    title: "Cutting-edge Curriculum",
    description: "Our curriculum is regularly updated to include the latest technologies and methodologies, ensuring our students are always industry-ready."
  },
  {
    title: "Research Opportunities",
    description: "Students can participate in groundbreaking research in fields like Quantum Computing, Blockchain, and Artificial Intelligence."
  },
]

export default function EnhancedDepartmentStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedInfo, setExpandedInfo] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-12 bg-gradient-to-br">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Department of Chemical Engineering
        </motion.h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stat.color} rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, delay: index * 0.1, repeat: Infinity, repeatType: "reverse", ease: "anticipate" }}
                >
                  <stat.icon className="h-8 w-8" />
                </motion.div>
                <span className="text-3xl font-bold">
                  {stat.prefix && stat.prefix}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 2, delay: index * 0.1 }}
                  >
                    {typeof stat.value === 'number' && (
                      <CountUp from={0} to={stat.value} duration={2} />
                    )}
                  </motion.span>
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{stat.name}</h3>
              <p className="text-sm opacity-80">{stat.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6">Why Choose Our Department?</h3>
          <ul className="space-y-4">
            {departmentInfo.map((info, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-300"
              >
                <button 
                  onClick={() => setExpandedInfo(expandedInfo === index ? null : index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="font-semibold">{info.title}</span>
                  {expandedInfo === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
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
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

// CountUp component for animated number counting
function CountUp({ from, to, duration }) {
  // Add 'from' to the props validation
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