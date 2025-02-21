import React, { useRef, useState, useEffect } from 'react';
import { CalendarIcon, ArrowRight, MapPin, Clock, Users } from "lucide-react";
import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpg";

// Custom hook for scroll reveal
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
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
    id: 1,
    date: "2025-02-22",
    time: "9:00 PM - 10:00 PM",
    title: "Alumni Interaction Session",
    description: "Annual conference showcasing the latest in technology trends and innovations.",
    location: "Online Event",
    attendees: "250+",
    imageUrl: event1,
    tags: ['Technology', 'Innovation']
  },
  {
    id: 2,
    date: "2024-07-01",
    time: "9:00 AM - 9:00 AM (Next Day)",
    title: "Community Hackathon",
    description: "24-hour coding event to solve local community challenges.",
    location: "Computer Science Building",
    attendees: "100+",
    imageUrl: event2,
    tags: ['Hackathon', 'Community']
  },
  {
    id: 3,
    date: "2024-07-22",
    time: "2:00 PM - 5:00 PM",
    title: "AI and Ethics Workshop",
    description: "Exploring the ethical implications of artificial intelligence in society.",
    location: "Seminar Hall",
    attendees: "150+",
    imageUrl: event3,
    tags: ['AI', 'Ethics']
  }
];

export default function UpcomingEvents() {
  const [headerRef, isHeaderVisible] = useScrollReveal();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-1000 transform
            ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="text-blue-600 font-semibold tracking-wider uppercase mb-2 block">
            What's Coming Up
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 rounded-full" />
          <p className="text-gray-600">
            Join us for these exciting upcoming events and be part of our vibrant community
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => {
            const [cardRef, isCardVisible] = useScrollReveal({
              threshold: 0.1,
              rootMargin: '50px'
            });

            return (
              <div
                key={event.id}
                ref={cardRef}
                className={`transform transition-all duration-1000 
                  ${isCardVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl 
                             transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="flex gap-2 mb-2">
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 text-xs font-medium text-white 
                                     bg-white/20 backdrop-blur-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm 
                                   font-medium bg-blue-100 text-blue-800">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 
                                 transition-colors duration-300">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {event.attendees} Expected Attendees
                      </div>
                    </div>

                    <a href="#" 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 
                               font-medium group/link">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 
                                           transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}