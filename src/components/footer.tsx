import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Soulivo</h3>
            <p className="text-gray-400 mb-6">
              Empowering individuals to achieve mental wellness through personalized therapy and mindfulness practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Meet The Team</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Individual Therapy</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Group Meditation</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Couples Counseling</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Mindfulness Training</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Stress Management</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-primary mt-1 mr-3 h-5 w-5" />
                <span className="text-gray-400">1234 Wellness Avenue, Suite 100<br/>San Francisco, CA 94110</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-3 h-5 w-5" />
                <a href="mailto:info@soulivo.com" className="text-gray-400 hover:text-white transition-colors">info@soulivo.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="text-primary mr-3 h-5 w-5" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-start">
                <Clock className="text-primary mt-1 mr-3 h-5 w-5" />
                <span className="text-gray-400">Monday-Friday: 9am-6pm<br/>Saturday: 10am-2pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Soulivo. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
