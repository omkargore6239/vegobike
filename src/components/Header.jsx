import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ProfileMenu from "./profile/ProfileMenu.jsx";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header role="banner" className="sticky top-0 z-50 backdrop-blur-md bg-[#000099]/95 border-b border-[#9999ff]/30 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9999ff] to-[#7777ff] text-[#000099] font-bold text-lg shadow-lg group-hover:shadow-[#9999ff]/25 transition-all duration-300">
                V
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9999ff] to-[#7777ff] rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white group-hover:text-[#9999ff] transition-colors duration-300">
                VEGO BIKE
              </span>
              <p className="text-xs text-[#e6e6ff] group-hover:text-white transition-colors duration-300">
                Auto Services Hub
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rental"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Vehicle Rental
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/spare-parts"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Spare Parts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/servicing"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Servicing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/purchase-sale"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Purchase & Sale
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Side - CTA Button & Profile Menu */}
          <div className="flex items-center gap-4">
            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Link
                to="/rental"
                className="bg-[#9999ff] hover:bg-[#7777ff] text-[#000099] px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-[#9999ff]/25 hover:scale-105"
              >
                Book Now
              </Link>
            </div>

            {/* Profile Menu - Always Visible */}
            <ProfileMenu />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-[#9999ff] hover:bg-white/5 transition-colors duration-300"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav role="navigation" aria-label="Mobile navigation" className="pt-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  end
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rental"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Vehicle Rental
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/spare-parts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Spare Parts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/servicing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Servicing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/purchase-sale"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-[#9999ff] text-[#000099] shadow-lg" 
                        : "text-white hover:text-[#9999ff] hover:bg-white/5"
                    }`
                  }
                >
                  Purchase & Sale
                </NavLink>
              </li>
              <li className="pt-2">
                <Link
                  to="/rental"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-[#9999ff] hover:bg-[#7777ff] text-[#000099] px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 text-center shadow-lg"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
  