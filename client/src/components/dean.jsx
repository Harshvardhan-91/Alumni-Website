import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon, MapPin, Mail, Phone } from "lucide-react";
import dean from "../assets/dean.jpg";

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

export default function DeanMessage() {
  const [cardRef, isCardVisible] = useScrollReveal();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div
        ref={cardRef}
        className={`transition-all duration-1000 transform
          ${isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <Card className="overflow-hidden shadow-xl">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-2/5 relative">
              {/* Image Container */}
              <div className="relative h-full overflow-hidden" style={{ minHeight: '500px' }}>
                <img
                  src={dean}
                  alt="Dr. Binod Kumar Kannaujia"
                  className="w-full h-full object-cover"
                />
                {/* Solid gradient overlay that doesn't move */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
              </div>

              {/* Content Container - Fixed Position */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">
                    Dr. Binod Kumar Kannaujia
                  </h2>
                  <p className="text-white/90">Director, NIT Jalandhar</p>
                  
                  {/* Contact Info */}
                  <div className="space-y-2 pt-4 text-sm">
                    <div className="flex items-center text-white/90">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>director@nitj.ac.in</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>+91-181-2690301</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>NIT Jalandhar, Punjab</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <CardContent className="md:w-3/5 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10">
              <QuoteIcon className="w-12 h-12 text-primary/20 mb-4" />
              <div className="space-y-4">
                <p className="text-lg font-medium">Dear Esteemed Alumni,</p>
                <p>
                  It is with great pleasure and a sense of pride that I reach out to you from the heart of our
                  beloved alma mater. As we navigate through these dynamic times, the unwavering strength and
                  support of our alumni community have become our guiding light.
                </p>
                <p>
                  From the bottom of my heart, thank you for being such a vital, vibrant part of our community.
                  Together, hand in hand, we will continue to build upon the legacy of excellence that defines
                  our university and illuminates the path for future generations.
                </p>
                <div className="pt-4">
                  <p className="font-semibold">With warmest regards and deepest gratitude,</p>
                  <div className="mt-4">
                    <p className="font-semibold">Dr. Binod Kumar Kannaujia</p>
                    <p className="text-sm text-muted-foreground">Director, NIT Jalandhar</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}