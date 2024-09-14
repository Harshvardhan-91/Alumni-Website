import React from 'react'
import { Users, Briefcase, Heart } from 'lucide-react'

const engagementOptions = [
  {
    title: 'Connect',
    icon: Users,
    description: 'Expand your professional network and stay connected with fellow NITJ alumni through our exclusive events and programs.',
    cta: 'Join Our Network',
  },
  {
    title: 'Hire',
    icon: Briefcase,
    description: 'Tap into NITJ\'s pool of talented graduates and students. Elevate your team with our accomplished alumni.',
    cta: 'Access Talent Pool',
  },
  {
    title: 'Give',
    icon: Heart,
    description: 'Support the next generation of innovators. Your contributions fund scholarships and critical initiatives at NITJ.',
    cta: 'Make a Difference',
  },
]

export default function AlumniEngagement() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl text-center mb-12">
          Engage with NITJ and Your Fellow Alumni
        </h2>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {engagementOptions.map((option) => (
              <div
                key={option.title}
                className="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-5">
                    <option.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-base text-gray-500 mb-4">{option.description}</p>
                  <div className="mt-auto">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                    >
                      {option.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}