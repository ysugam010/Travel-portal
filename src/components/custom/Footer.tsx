import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Tripco</h3>
          <p className="text-sm">
            Your ultimate partner in discovering the world. We offer seamless booking for flights, hotels, and unforgettable activities.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-6 w-6" /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
          <ul className="space-y-2">
            <li><Link to="/flight-results" className="hover:text-white transition-colors">Flight Booking</Link></li>
            <li><Link to="/hostelry-results" className="hover:text-white transition-colors">Hotel Booking</Link></li>
            <li><Link to="/explore" className="hover:text-white transition-colors">Explore Destinations</Link></li>
            <li><Link to="/activity" className="hover:text-white transition-colors">Book Activities</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <div className="space-y-3">
            <p className="flex items-center"><MapPin className="h-5 w-5 mr-2 text-gray-500" /> 30 Great Peter St, Westminster, London SW1P 2BU, United Kingdom</p>
            <p className="flex items-center"><Mail className="h-5 w-5 mr-2 text-gray-500" /> info@tripco.com</p>
            <p className="flex items-center"><Phone className="h-5 w-5 mr-2 text-gray-500" /> +44 20 7946 0000</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Tripco. All rights reserved.
      </div>
    </footer>
  );
}