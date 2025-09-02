import React from "react";
import { Link } from "react-router-dom";

export default function Card({ to, title, desc, icon = "🚗" }) {
  return (
    <Link
      to={to}
      className="group rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
      <div className="mt-4 text-sm font-medium text-blue-700 group-hover:underline">Open</div>
    </Link>
  );
}
