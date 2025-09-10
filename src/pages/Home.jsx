import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden bg-gradient-to-br from-[#000099] to-[#1a1a66]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                <span className="w-2 h-2 bg-[#9999ff] rounded-full animate-pulse"></span>
                Welcome to VEGO BIKE
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Your Complete{" "}
              <span className="bg-gradient-to-r from-[#9999ff] to-[#7777ff] bg-clip-text text-transparent">
                Auto Services
              </span>{" "}
              Hub
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Experience premium vehicle rental, expert servicing, genuine spare parts, and seamless purchase & sale services all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/rental"
                className="bg-[#9999ff] hover:bg-[#7777ff] text-[#000099] px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2"
              >
                <span>🚗</span>
                Book Vehicle Now
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white hover:bg-white hover:text-[#000099] px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <span>📋</span>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Simple Service Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-white">
        

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Vehicle Rental Card */}
          <div className="group bg-white border border-gray-200 hover:border-[#9999ff] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9999ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#9999ff]/20 transition-colors duration-300">
                <span className="text-3xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Rental</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Rent premium vehicles with flexible terms and 24/7 support.
              </p>
              <Link
                to="/rental"
                className="inline-flex items-center text-[#9999ff] hover:text-[#000099] font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
              >
                Explore Rentals
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Spare Parts Card */}
          <div className="group bg-white border border-gray-200 hover:border-[#9999ff] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9999ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#9999ff]/20 transition-colors duration-300">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Spare Parts</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Genuine spare parts with warranty and fast delivery service.
              </p>
              <Link
                to="/spare-parts"
                className="inline-flex items-center text-[#9999ff] hover:text-[#000099] font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
              >
                Browse Parts
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Vehicle Servicing Card */}
          <div className="group bg-white border border-gray-200 hover:border-[#9999ff] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9999ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#9999ff]/20 transition-colors duration-300">
                <span className="text-3xl">🧰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Servicing</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Professional maintenance by certified technicians with quality guarantee.
              </p>
              <Link
                to="/servicing"
                className="inline-flex items-center text-[#9999ff] hover:text-[#000099] font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
              >
                Schedule Service
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Purchase & Sale Card */}
          <div className="group bg-white border border-gray-200 hover:border-[#9999ff] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9999ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#9999ff]/20 transition-colors duration-300">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Purchase & Sale</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Buy or sell vehicles with fair pricing and secure transactions.
              </p>
              <Link
                to="/purchase-sale"
                className="inline-flex items-center text-[#9999ff] hover:text-[#000099] font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
              >
                View Marketplace
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose VEGO BIKE?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the difference with our commitment to quality, service, and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-[#9999ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Every vehicle and part goes through rigorous quality checks to ensure you get the best service possible.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-[#9999ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast & Reliable</h3>
              <p className="text-gray-600">
                Quick turnaround times and reliable service delivery to keep you moving without delays.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-[#9999ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We go above and beyond to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Numbers</h2>
            <p className="text-gray-600 text-lg">Trusted by thousands of customers across the region</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#9999ff] mb-2">5000+</div>
              <div className="text-gray-600 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#9999ff] mb-2">500+</div>
              <div className="text-gray-600 text-sm">Vehicles Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#9999ff] mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#9999ff] mb-2">4.8★</div>
              <div className="text-gray-600 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Simple steps to get started with our services</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#9999ff] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Service</h3>
              <p className="text-gray-600 text-sm">Select the service you need from our comprehensive offerings</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#9999ff] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Book Appointment</h3>
              <p className="text-gray-600 text-sm">Schedule your preferred time slot through our easy booking system</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#9999ff] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Service</h3>
              <p className="text-gray-600 text-sm">Receive professional service from our expert team members</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#9999ff] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enjoy Results</h3>
              <p className="text-gray-600 text-sm">Experience the quality and satisfaction of our premium services</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
