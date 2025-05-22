import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { 
  Calendar, MapPin, Clock, Users, ArrowRight, 
  Filter, Search, ChevronDown 
} from 'lucide-react';
import { NavbarComponent } from '../components/navbar'
import Footer from '../components/footer'

// Custom hook for scroll reveal
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
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

const events = [
  {
    date: 'November 15, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Auditorium',
    attendees: '250+',
    title: 'ChemInnovate 2024',
    description:
      'ChemInnovate is an annual event showcasing the latest innovations and breakthroughs in chemical engineering. Participants will get the opportunity to present research papers, attend expert talks, and explore advancements in sustainable chemical processes.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    tags: ['Research', 'Innovation']
  },
  {
    date: 'December 2–3, 2024',
    time: '24 Hours',
    location: 'Computer Lab',
    attendees: '100+',
    title: 'Process Simulation Challenge',
    description:
      'A 24-hour hackathon where students tackle real-world chemical process problems using simulation software like Aspen Plus, COMSOL, and MATLAB. Compete in teams to find the most efficient solutions and present your findings to a panel of judges.',
    image: 'https://storage.googleapis.com/a1aa/image/rnfTHtvth3WsNKGihiItAwQrbXHB4bRqisLldgKqJX9qVH1JA.jpg',
    tags: ['Hackathon', 'Competition']
  },
  {
    date: 'October 30, 2024',
    time: '2:00 PM - 6:00 PM',
    location: 'Engineering Block',
    attendees: '150+',
    title: 'Chem-E-Car Competition',
    description:
      "Teams design and build small, chemically powered cars that must carry a specified load over a given distance. The goal is to precisely control the car's chemical reaction to stop as close to the target distance as possible.",
    image: 'https://storage.googleapis.com/a1aa/image/qZIYazPf8etQyE5GknAD11nhLusHjJRj4k6VBF8DqRkHrOqTA.jpg',
    tags: ['Competition', 'Design']
  },
];

const brands = [
  {
    alt: 'BPCL',
    src: 'https://cdn.worldvectorlogo.com/logos/bharat-petroleum-logo.svg',
  },
  {
    alt: 'Pidilite',
    src: 'https://seeklogo.com/images/P/Pidilite-logo-E5FA719787-seeklogo.com.png',
  },
  {
    alt: 'TATA Chemicals',
    src: 'https://seeklogo.com/images/T/TATA_Chemicals_Limited-logo-A0A0D1B4B3-seeklogo.com.png',
  },
  {
    alt: 'Reliance Industries',
    src: 'https://companieslogo.com/img/orig/RELIANCE.NS-ea204f86.png?t=1596837431',
  },
  {
    alt: 'Indian Oil',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Indian_Oil_Logo.svg/1200px-Indian_Oil_Logo.svg.png',
  },
  {
    alt: 'GAIL India',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/GAIL_Logo.svg/2560px-GAIL_Logo.svg.png',
  }
];

const EventCard = ({ event }) => {
  const [cardRef, isVisible] = useScrollReveal();

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transform transition-transform duration-700
                   group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          {event.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-blue-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Users className="w-4 h-4" />
            <span className="text-sm">{event.attendees}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>

        <Button 
          className="w-full mt-2 group"
          variant="outline"
        >
          Register Now
          <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default function EnhancedEvents() {
  const [headerRef, isHeaderVisible] = useScrollReveal();
  const [filterRef, isFilterVisible] = useScrollReveal();
  const [brandsRef, isBrandsVisible] = useScrollReveal();

  return (
    <>
    <NavbarComponent />
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=2070&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div 
          ref={headerRef}
          className={`relative z-10 max-w-3xl mx-auto text-center px-4 transition-all duration-1000
            ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Explore the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Chemical Engineering
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join us for cutting-edge discussions, breakthrough research, and hands-on workshops 
            that shape tomorrow's innovations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Ticket
            </Button>
            <Button 
              size="lg"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white 
                       hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={filterRef}
            className={`mb-12 transition-all duration-1000
              ${isFilterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                Upcoming Events
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      {/* Brands Section */}
      <section className="py-20 bg-white">
        <div 
          ref={brandsRef}
          className={`container mx-auto px-4 text-center transition-all duration-1000
            ${isBrandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Industry Partners
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We're proud to collaborate with leading companies in the chemical industry, 
            creating valuable opportunities for our students and alumni.
          </p>

          <div className="relative">
            {/* Gradient edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Brands grid */}
            <div className="mx-auto px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                {brands.map((brand, index) => (
                  <div 
                    key={index}
                    className="p-6 group relative"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/50 
                                rounded-xl transition-all duration-300" />
                    
                    {/* Logo */}
                    <div className="relative">
                      <img
                        src={brand.src}
                        alt={brand.alt}
                        className="h-16 w-auto mx-auto filter grayscale hover:grayscale-0 
                                 transition-all duration-500 transform group-hover:scale-110"
                      />
                      
                      {/* Company name tooltip */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm text-gray-600 whitespace-nowrap">{brand.alt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-16">
            <p className="text-gray-600 mb-6">
              Want to become a partner or collaborate with our department?
            </p>
            <Button 
              variant="outline" 
              className="group"
            >
              Partner With Us
              <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}