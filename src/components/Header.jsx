import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header role="banner" className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold">A</span>
          <span className="text-lg font-semibold">Auto Services Hub</span>
        </Link>

        <nav role="navigation" aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-blue-700 font-medium" : "text-gray-700 hover:text-blue-700"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rental"
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-blue-700 font-medium" : "text-gray-700 hover:text-blue-700"}`
                }
              >
                Vehicle Rental
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/spare-parts"
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-blue-700 font-medium" : "text-gray-700 hover:text-blue-700"}`
                }
              >
                Spare Parts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/servicing"
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-blue-700 font-medium" : "text-gray-700 hover:text-blue-700"}`
                }
              >
                Servicing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/purchase-sale"
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-blue-700 font-medium" : "text-gray-700 hover:text-blue-700"}`
                }
              >
                Purchase & Sale
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
