import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, 
  ExternalLink, ChevronRight, Heart
} from 'lucide-react';

const SocialIcon = ({ icon: Icon, href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white
               transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
  >
    <Icon size={20} />
  </a>
);

const FooterLink = ({ href, children }) => (
  <Link 
    to={href} 
    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
  >
    <ChevronRight className="h-4 w-4 mr-2 text-blue-400 transform transition-transform duration-300 
                            group-hover:translate-x-1" />
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>

      {/* Content */}
      <div className="relative pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo and Description */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-white">
                NITJ Alumni
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <p className="text-gray-400 leading-relaxed">
                Celebrating the achievements of our remarkable alumni who have made a difference worldwide. 
                Connecting our past to inspire our future.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-6">Quick Links</h2>
              <ul className="space-y-3">
                <li><FooterLink href="/aboutus">About Us</FooterLink></li>
                <li><FooterLink href="/events">Events</FooterLink></li>
                <li><FooterLink href="/notable-alumni">Notable Alumni</FooterLink></li>
                <li><FooterLink href="/contact">Contact Us</FooterLink></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-6">Contact Us</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                  <MapPin className="mr-3 h-5 w-5 text-blue-400" />
                  <span>NIT Jalandhar, Punjab, India</span>
                </li>
                <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                  <Phone className="mr-3 h-5 w-5 text-blue-400" />
                  <span>+91 12345 67890</span>
                </li>
                <li>
                  <a 
                    href="mailto:alumni@nitj.ac.in" 
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    <Mail className="mr-3 h-5 w-5 text-blue-400" />
                    <span>alumni@nitj.ac.in</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Developers Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-6">Developers Corner</h2>
              <p className="text-gray-400 leading-relaxed">
                This website was designed and developed by the Web Development Team of NITJ, aiming to foster 
                connections between current students and our esteemed alumni.
              </p>
              <a 
                href="mailto:devteam@nitj.ac.in" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                Contact Dev Team <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mb-8">
            <SocialIcon icon={Facebook} href="https://facebook.com" label="Facebook" />
            <SocialIcon icon={Twitter} href="https://twitter.com" label="Twitter" />
            <SocialIcon icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
            <SocialIcon icon={Instagram} href="https://instagram.com" label="Instagram" />
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} NITJ Alumni. All Rights Reserved.
              </p>
              <p className="text-gray-400 text-sm flex items-center">
                Made with <Heart className="h-4 w-4 mx-2 text-red-500" /> by NITJ Web Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;