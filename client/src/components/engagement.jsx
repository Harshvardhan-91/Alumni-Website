import React, { useRef, useState, useEffect } from 'react';
import { Users, Briefcase, Heart, ArrowRight } from 'lucide-react';

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

const engagementOptions = [
  {
    title: 'Connect',
    icon: Users,
    description: 'Expand your professional network and stay connected with fellow NITJ alumni through our exclusive events and programs.',
    cta: 'Join Our Network',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'group-hover:from-blue-600 group-hover:to-blue-700',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    title: 'Hire',
    icon: Briefcase,
    description: 'Tap into NITJ\'s pool of talented graduates and students. Elevate your team with our accomplished alumni.',
    cta: 'Access Talent Pool',
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'group-hover:from-purple-600 group-hover:to-purple-700',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  {
    title: 'Give',
    icon: Heart,
    description: 'Support the next generation of innovators. Your contributions fund scholarships and critical initiatives at NITJ.',
    cta: 'Make a Difference',
    color: 'from-rose-500 to-rose-600',
    hoverColor: 'group-hover:from-rose-600 group-hover:to-rose-700',
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600'
  },
]

export default function AlumniEngagement() {
  const [headerRef, isHeaderVisible] = useScrollReveal();
  const [cardsRef, isCardsVisible] = useScrollReveal();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 transform
            ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="text-blue-600 font-semibold tracking-wider uppercase mb-2 block">
            Get Involved
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Engage with NITJ and Your Fellow Alumni
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 rounded-full" />
          <p className="text-gray-600">
            Join our vibrant community and make a lasting impact on future generations
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000
            ${isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {engagementOptions.map((option, index) => (
            <div
              key={option.title}
              className="group relative"
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 
                            transform group-hover:-translate-y-1 group-hover:shadow-xl">
                {/* Colored Top Bar */}
                <div className={`h-2 bg-gradient-to-r ${option.color} ${option.hoverColor} transition-all duration-300`} />
                
                <div className="p-8">
                  {/* Icon */}
                  <div className={`${option.lightColor} w-14 h-14 rounded-xl flex items-center justify-center 
                                mb-6 transform transition-transform duration-300 group-hover:scale-110`}>
                    <option.icon className={`w-7 h-7 ${option.textColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{option.description}</p>

                  {/* CTA Button */}
                  <a
                    href="/donation"
                    className={`inline-flex items-center px-4 py-2 rounded-lg ${option.textColor} 
                              ${option.lightColor} group-hover:bg-opacity-70 transition-all duration-300`}
                  >
                    <span className="mr-2">{option.cta}</span>
                    <ArrowRight className="w-4 h-4 transform transition-transform duration-300 
                                         group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}