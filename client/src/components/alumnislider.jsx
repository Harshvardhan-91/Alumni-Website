import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Award, MapPin, Quote } from 'lucide-react';
import alumni2 from "../assets/notable2.png";

// Alumni data
const alumni = [
  {
    name: "Inrwindeep Singh",
    profession: "Managing Director, Accenture",
    batch: "1992-1996",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHUWSgqi-wvsg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727902691310?e=1743638400&v=beta&t=5wtR_9JpAYfc_AcfCmyPf96Syik0N9KJLlo0g49R5zk",
    quote: "My time at the university was transformative and set the foundation for my career. Even now whenever I look back, I find myself missing the beautiful campus, the very competent faculty and host of friends I made there among seniors, batchmates, and juniors alike. Today, as I represent my country at the World stage, I continue carrying within me the values and life lessons this institute has installed in me, and I represent all of us together."
  },
  {
    name: 'Prince Kumar Singh',
    profession: "Indian Foreign Service",
    batch: "2016-2020",
    image: alumni2,
    quote: "I'm Prince Kumar Singh, B.Tech Chemical Engineering (Batch 2016-2020). Those four years were the best part of my life. NITJ blessed me with good friends from different parts of the country. I got good exposure and a conducive environment here. I learned so many things from friends and professors, due to which I scored the highest marks in chemical engineering optional in the history of IFS exam as per my knowledge. Apart from Academics, I was also a member of the library committee and PRAYAAS society.",
  },
  {
    name: 'Sadaf Chaudhary',
    profession: "Indian Foreign Service",
    batch: "2012-2016",
    image: "https://twocircles.net/wp-content/uploads/2021/09/IMG_20210925_183247.jpg",
    quote: "I am deeply inspired by the strides NIT Jalandhar has made in academics, research, and innovation. The legacy of excellence continues to grow, and it is heartening to see the department grooming young engineers who are ready to address real-world challenges.I extend my heartfelt thanks to the institute and the department for their enduring support and for inviting me to contribute to its legacy The world is full of opportunities waiting for those who dare to explore and innovate.",
  },
  {
    name: 'Ms Jaspreet Kalra',
    profession: "Senior Vice President at Citi,",
    batch: "2000-2004",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQFp-9S8a3pOUw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1538102580915?e=1743638400&v=beta&t=BQ3FfCplbD5dBt0dUTGl_1XOvHvrbw_T202ftSwAbzM",
    quote: "I am deeply inspired by the strides NIT Jalandhar has made in academics, research, and innovation. The legacy of excellence continues to grow, and it is heartening to see the department grooming young engineers who are ready to address real-world challenges.I extend my heartfelt thanks to the institute and the department for their enduring support and for inviting me to contribute to its legacy The world is full of opportunities waiting for those who dare to explore and innovate.",
  },
  {
    name: 'Mr Harry Samby',
    profession: "CEO of Milaneil Capital, Ontario, Canada",
    batch: "1995-1999",
    image: "https://media.licdn.com/dms/image/v2/C5603AQEw1fEaBH673w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1616686366764?e=1743638400&v=beta&t=ghUxS2PnLv5KoaJdconZcCwkGOIatbhfd1Ec5FDb7DY",
    quote: "I am deeply inspired by the strides NIT Jalandhar has made in academics, research, and innovation. The legacy of excellence continues to grow, and it is heartening to see the department grooming young engineers who are ready to address real-world challenges.I extend my heartfelt thanks to the institute and the department for their enduring support and for inviting me to contribute to its legacy The world is full of opportunities waiting for those who dare to explore and innovate.",
  },
  {
    name: 'Mr.Nishkam Batta',
    profession: "Founder, HonestAI-Gen AI, ML & NLP,",
    batch: "2005-2009",
    image: "https://media.licdn.com/dms/image/v2/D5603AQE-Yf5sSNtUgw/profile-displayphoto-shrink_800_800/B56ZTTKg4eGUAg-/0/1738709536884?e=1745452800&v=beta&t=Yc00NtGPxhhwD3F0LQwr64GrVfDHqHWugfpVbPafX2c",
    quote: "I am deeply inspired by the strides NIT Jalandhar has made in academics, research, and innovation. The legacy of excellence continues to grow, and it is heartening to see the department grooming young engineers who are ready to address real-world challenges.I extend my heartfelt thanks to the institute and the department for their enduring support and for inviting me to contribute to its legacy The world is full of opportunities waiting for those who dare to explore and innovate.",
  }
];

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

export default function ModernAlumniSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [sliderRef, isSliderVisible] = useScrollReveal();
  const [titleRef, isTitleVisible] = useScrollReveal();
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % alumni.length);
      }, 2000); // Change slide every 5 seconds
    };

    if (!isHovered) {
      startAutoPlay();
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className={`text-center relative z-10 mb-16 transition-all duration-1000 transform
            ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="text-blue-600 font-semibold tracking-wider uppercase mb-4 block">
            Meet Our Alumni
          </span>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Notable Personalities
          </h2>
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        <div 
          ref={sliderRef}
          className={`relative transition-all duration-1000 transform
            ${isSliderVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <div 
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {alumni.map((alum, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row h-[500px]">
                      <div className="md:w-5/12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent z-10" />
                        <img 
                          src={alum.image} 
                          alt={alum.name}
                          className="absolute inset-0 w-full h-full object-cover object-center transform 
                                   group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t 
                                      from-black/80 to-transparent transform translate-y-2 
                                      group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {alum.name}
                          </h3>
                          <p className="text-lg text-blue-200 mb-2">
                            {alum.profession}
                          </p>
                          <div className="inline-flex items-center px-3 py-1 bg-white/10 
                                        backdrop-blur-sm rounded-full">
                            <Award className="w-4 h-4 mr-2 text-blue-300" />
                            <span className="text-sm text-white">Batch {alum.batch}</span>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-7/12 p-8 flex flex-col bg-white">
                        <div className="flex-grow">
                          <Quote className="w-10 h-10 text-blue-100 mb-4 transform -scale-x-100" />
                          <p className="text-gray-600 leading-relaxed line-clamp-[12]">
                            {alum.quote}
                          </p>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                              <span>Alumni Network</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center -translate-y-1/2">
            <button
              onClick={() => handleSlideChange((currentSlide - 1 + alumni.length) % alumni.length)}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl 
                       transition-all duration-200 transform hover:-translate-x-1"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={() => handleSlideChange((currentSlide + 1) % alumni.length)}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl 
                       transition-all duration-200 transform hover:translate-x-1"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          <div className="absolute -bottom-10 left-0 right-0">
            <div className="flex justify-center items-center gap-3">
              {alumni.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  className={`transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-8 h-2 bg-blue-600'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  } rounded-full`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}