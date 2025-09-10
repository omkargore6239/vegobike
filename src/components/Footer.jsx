import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#000099] border-t-2 border-[#9999ff]/30 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9999ff] to-[#7777ff] text-[#000099] font-bold text-lg shadow-lg">
                  V
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9999ff] to-[#7777ff] rounded-xl blur opacity-25"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">VEGO BIKE</h3>
                <p className="text-xs text-[#e6e6ff]">Auto Services Hub</p>
              </div>
            </div>
            
            <p className="text-[#e6e6ff] leading-relaxed mb-4 text-sm">
              Your trusted partner for vehicle rentals, sales, and services. 
              Experience premium quality and exceptional customer service.
            </p>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#9999ff]">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <span className="text-[#e6e6ff] text-sm">4.8/5 Rating</span>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 bg-[#9999ff]/10 hover:bg-[#9999ff]/20 rounded-lg flex items-center justify-center text-[#9999ff] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#9999ff]/10 hover:bg-[#9999ff]/20 rounded-lg flex items-center justify-center text-[#9999ff] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#9999ff]/10 hover:bg-[#9999ff]/20 rounded-lg flex items-center justify-center text-[#9999ff] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/rental" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#9999ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Vehicle Rental
                </Link>
              </li>
              <li>
                <Link to="/spare-parts" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#9999ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Spare Parts
                </Link>
              </li>
              <li>
                <Link to="/servicing" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#9999ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Servicing
                </Link>
              </li>
              <li>
                <Link to="/purchase-sale" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#9999ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Purchase & Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#9999ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#9999ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#9999ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#9999ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#9999ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#9999ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#e6e6ff] text-sm">+91 (555) 123-4567</p>
                  <p className="text-[#9999ff] text-xs">24/7 Support</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#9999ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#9999ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#e6e6ff] text-sm">info@vegobike.com</p>
                  <p className="text-[#9999ff] text-xs">Quick Response</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#9999ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#9999ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#e6e6ff] text-sm">123 Bike Street, City</p>
                  <p className="text-[#9999ff] text-xs">Visit Our Store</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6 p-4 bg-[#9999ff]/5 rounded-lg border border-[#9999ff]/20">
              <h5 className="text-white font-medium mb-2 text-sm">Stay Updated</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/5 border border-[#9999ff]/30 rounded-md text-white placeholder-[#e6e6ff]/70 text-sm focus:outline-none focus:border-[#9999ff] focus:bg-white/10 transition-all duration-300"
                />
                <button className="bg-[#9999ff] hover:bg-[#7777ff] text-[#000099] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-[#9999ff]/20 bg-[#000099]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#e6e6ff] text-sm">
              &copy; 2025 VEGO BIKE. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-[#e6e6ff] hover:text-[#9999ff] transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
