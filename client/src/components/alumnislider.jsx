import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import alumni1 from "../assets/notable1.jpeg";
import alumni2 from "../assets/notable2.png";
import cover from "../assets/cover2.jpg";

// Define alumni data directly without using an interface
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
    name: ' Ms Jaspreet Kalra',
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
    name: ' Mr.Nishkam Batta',
    profession: "Founder, HonestAI-Gen AI, ML & NLP,",
    batch: "2005-2009",
    image: "https://media.licdn.com/dms/image/v2/D5603AQF9burh9XwBvg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729976430268?e=1743638400&v=beta&t=p10uj0Xgj66ixpqkma3HyihteAO0Df7-wAT6GytXY-g",
    quote: "I am deeply inspired by the strides NIT Jalandhar has made in academics, research, and innovation. The legacy of excellence continues to grow, and it is heartening to see the department grooming young engineers who are ready to address real-world challenges.I extend my heartfelt thanks to the institute and the department for their enduring support and for inviting me to contribute to its legacy The world is full of opportunities waiting for those who dare to explore and innovate.",
  }
  // Add more alumni data here
];

export default function EnhancedAlumniSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % alumni.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % alumni.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + alumni.length) % alumni.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-20">
      <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">Notable Alumni</h2>
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {alumni.map((alum, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row bg-white">
                <div className="md:w-2/5 relative">
                  <img 
                    src={alum.image} 
                    alt={alum.name} 
                    className="w-full h-96 md:h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-4xl font-bold mb-2">{alum.name}</h3>
                    <p className="text-xl text-gray-200 mb-1">{alum.profession}</p>
                    <p className="text-gray-300">Batch - {alum.batch}</p>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 bg-gray-900 text-white relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    // Corrected backgroundImage usage
                    style={{ backgroundImage: `url(${cover})` }}
                  />
                  <div className="relative z-10">
                    <blockquote className="text-lg italic text-gray-200 border-l-4 border-primary pl-6 my-8">
                      "{alum.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={prevSlide} 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 transition-colors duration-200"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 transition-colors duration-200"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors duration-200"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
          <div className="flex space-x-2">
            {alumni.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


