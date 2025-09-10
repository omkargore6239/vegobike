// src/components/profile/ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import ProfileEdit from './ProfileEdit';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isEditing) {
    return <ProfileEdit onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl blur-lg opacity-30"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-white px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => navigate(-1)} 
                    className="group p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold mb-2 text-gray-900">👤 My Profile</h1>
                    <p className="text-gray-600">Manage your account settings</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    ✏️ Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="border-2 border-red-300 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-blue-600">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-blue-100">{user.email}</p>
                <div className="mt-4 bg-white/20 rounded-full px-4 py-2 inline-block backdrop-blur-sm">
                  <span className="text-white text-sm font-medium">
                    Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  {[
                    { id: 'personal', label: '👤 Personal Info', icon: '👤' },
                    { id: 'address', label: '📍 Address', icon: '📍' },
                    { id: 'preferences', label: '⚙️ Preferences', icon: '⚙️' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <label className="text-gray-500 text-sm font-medium">First Name</label>
                        <p className="text-gray-900 font-semibold text-lg">{user.firstName}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <label className="text-gray-500 text-sm font-medium">Last Name</label>
                        <p className="text-gray-900 font-semibold text-lg">{user.lastName}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <label className="text-gray-500 text-sm font-medium">Email</label>
                        <p className="text-gray-900 font-semibold text-lg">{user.email}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <label className="text-gray-500 text-sm font-medium">Phone</label>
                        <p className="text-gray-900 font-semibold text-lg">{user.phone}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 md:col-span-2">
                        <label className="text-gray-500 text-sm font-medium">Date of Birth</label>
                        <p className="text-gray-900 font-semibold text-lg">
                          {new Date(user.dateOfBirth).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'address' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">📍 Address Information</h3>
                      <div className="space-y-3">
                        <p><span className="text-gray-500">Street:</span> <span className="font-semibold text-gray-900">{user.address?.street}</span></p>
                        <p><span className="text-gray-500">City:</span> <span className="font-semibold text-gray-900">{user.address?.city}</span></p>
                        <p><span className="text-gray-500">State:</span> <span className="font-semibold text-gray-900">{user.address?.state}</span></p>
                        <p><span className="text-gray-500">Pincode:</span> <span className="font-semibold text-gray-900">{user.address?.pincode}</span></p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">⚙️ App Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">📧 Email Notifications</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.preferences?.notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.preferences?.notifications ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">🌙 Dark Mode</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.preferences?.darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.preferences?.darkMode ? 'Dark' : 'Light'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">🌐 Language</span>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {user.preferences?.language === 'en' ? 'English' : user.preferences?.language}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
