// src/components/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    license: user?.license || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Update user profile (simulate API call)
    console.log('Updating profile:', formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full rounded-lg border-2 border-gray-200 px-4 py-3 ${
                  isEditing ? 'focus:border-blue-500 focus:outline-none' : 'bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full rounded-lg border-2 border-gray-200 px-4 py-3 ${
                  isEditing ? 'focus:border-blue-500 focus:outline-none' : 'bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driving License
              </label>
              <input
                type="text"
                name="license"
                value={formData.license}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full rounded-lg border-2 border-gray-200 px-4 py-3 ${
                  isEditing ? 'focus:border-blue-500 focus:outline-none' : 'bg-gray-50'
                }`}
              />
            </div>

            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 pt-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-red-600 px-4 py-3 text-white font-medium hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            Member since {new Date(user.joinedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
