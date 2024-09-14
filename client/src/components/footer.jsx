import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Sections */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 space-y-8 md:space-y-0 md:space-x-8">
          {/* Logo and Description */}
          <div className="w-full md:w-1/4">
            <h1 className="text-3xl font-bold mb-4">NITJ Alumni</h1>
            <p className="text-gray-400">
              Celebrating the achievements of our remarkable alumni who have made a difference worldwide. Connecting our past to inspire our future.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#events" className="hover:text-white">Events</a></li>
              <li><a href="#notable-alumni" className="hover:text-white">Notable Alumni</a></li>
              <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                NIT Jalandhar, Punjab, India
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                +91 12345 67890
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href="mailto:alumni@nitj.ac.in" className="hover:text-white">alumni@nitj.ac.in</a>
              </li>
            </ul>
          </div>

          {/* Developers Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Developers</h2>
            <p className="text-gray-400 mb-2">
              This website was designed and developed by the Web Development Team of NITJ, aiming to foster a connection between current students and our esteemed alumni.
            </p>
            <p className="text-gray-400">
              Want to contribute? Reach out to us at <a href="mailto:devteam@nitj.ac.in" className="hover:text-white">devteam@nitj.ac.in</a>
            </p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-start space-x-4 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaLinkedin size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NITJ Alumni. All Rights Reserved.
          </p>
          <div className="text-gray-400 text-sm">
            <p>
              National Institute of Technology Jalandhar, Punjab, India | 
              <a href="mailto:alumni@nitj.ac.in" className="hover:text-white ml-1">alumni@nitj.ac.in</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
