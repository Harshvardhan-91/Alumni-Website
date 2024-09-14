import React, { useState, useEffect, useRef } from 'react';
import alumni1 from '../assets/notable1.jpeg';
import alumni2 from "../assets/notable2.png";
import cover2 from "../assets/cover2.jpg";

const alumniData = [
  {
    name: 'Sadaf Chaudhary',
    photo: alumni1,
    background: cover2,
    helpDesk: 'Indian Foreign Service',
    graduatingYear: '2012-2016',
    message: 'My time at the university was transformative and set the foundation for my career. Even now whenever I look back, I find myself missing the beautiful campus, the very competent faculty and host of friends I made there among seniors, batchmates, and juniors alike. Today, as I represent my country at the World stage, I continue carrying within me the values and life lessons this institute has installed in me, and I represent all of us together.',
  },
  {
    name: 'Prince Kumar Singh',
    photo: alumni2,
    background: cover2,
    helpDesk: 'Indian Foreign Service',
    graduatingYear: '2016-2020',
    message: "I'm Prince Kumar Singh, B.Tech Chemical Engineering (Batch 2016-2020). Those four years were the best part of my life. NITJ blessed me with good friends from different parts of the country. I got good exposure and a conducive environment here. I learned so many things from friends and professors, due to which I scored the highest marks in chemical engineering optional in the history of IFS exam as per my knowledge. Apart from Academics, I was also a member of the library committee and PRAYAAS society.",
  },
  {
    name: 'Sadaf Chaudhary',
    photo: alumni1,
    background: cover2,
    helpDesk: 'Indian Foreign Service',
    graduatingYear: '2018',
    message: 'My time at the university was transformative and set the foundation for my career.',
  }
];

const AlumniSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = alumniData.length;
  const intervalRef = useRef(null);

  const startSlider = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(current => (current === length - 1 ? 0 : current + 1));
    }, 7000); // 7 seconds interval
  };

  useEffect(() => {
    startSlider();
    return () => clearInterval(intervalRef.current);
  }, [length]);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    startSlider();
  };

  return (
    <div className="my-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Notable Alumni</h2>
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-2xl">
        <div className="relative w-full h-96 flex">
          {alumniData.map((alumnus, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${
                index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {index === current && (
                <div className="flex h-full">
                  {/* Left side: Alumni image */}
                  <div className="w-1/3 h-full overflow-hidden flex items-center justify-center">
                    <img
                      src={alumnus.photo}
                      alt={alumnus.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  {/* Right side: Alumni content */}
                  <div className="w-2/3 h-full relative flex items-center p-8 bg-cover bg-center"
                       style={{
                         backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${alumnus.background})`
                       }}>
                    <div className="relative z-10 text-white">
                      <h1 className="text-3xl font-bold mb-2">{alumnus.name}</h1>
                      <p className="text-xl font-semibold mb-1">{alumnus.helpDesk}</p>
                      <p className="text-lg mb-4">Batch - {alumnus.graduatingYear}</p>
                      <p className="italic text-base leading-relaxed">"{alumnus.message}"</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {alumniData.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                current === index ? 'bg-white' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniSlider;
