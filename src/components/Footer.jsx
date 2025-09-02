import React from "react";

export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>&copy; {new Date().getFullYear()} Auto Services Hub. All rights reserved.</p>
        <p className="text-gray-500">Built with React Router and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
