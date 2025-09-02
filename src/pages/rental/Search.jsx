// src/pages/rental/Search.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Updated store data to match bike locations
const STORES = [
  {
    id: "blr", // Changed to match bike location
    name: "Bengaluru Hub",
    address: "Multiple locations across Bengaluru",
    rating: 4.8,
    bikes: 45,
  },
  {
    id: "mum", // Changed to match bike location
    name: "Mumbai Center",
    address: "Multiple locations across Mumbai",
    rating: 4.7,
    bikes: 38,
  }
];

export default function RentalSearch() {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current datetime for min attribute (30 minutes from now)
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  const minDateTime = now.toISOString().slice(0, 16);

  // Format datetime for display
  const formatDateTime = (datetimeStr) => {
    if (!datetimeStr) return '';
    const date = new Date(datetimeStr);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!selectedStore) {
      newErrors.store = 'Please select a store location';
    }

    if (!startDateTime) {
      newErrors.startDateTime = 'Please select pickup date and time';
    }

    if (!endDateTime) {
      newErrors.endDateTime = 'Please select return date and time';
    }

    // Check if end datetime is after start datetime
    if (startDateTime && endDateTime) {
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);
      
      if (end <= start) {
        newErrors.endDateTime = 'Return time must be after pickup time';
      }

      // Check if rental is at least 1 hour
      const diffHours = (end - start) / (1000 * 60 * 60);
      if (diffHours < 1) {
        newErrors.endDateTime = 'Minimum rental duration is 1 hour';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const params = new URLSearchParams({
        store: selectedStore, // This will now be "blr" or "mum"
        startDateTime,
        endDateTime,
      });
      navigate(`/rental/results?${params.toString()}`);
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-set end time when start time changes (add 2 hours)
  const handleStartDateTimeChange = (e) => {
    const newStartDateTime = e.target.value;
    setStartDateTime(newStartDateTime);
    
    // Clear related errors
    if (errors.startDateTime) {
      setErrors(prev => ({ ...prev, startDateTime: '', endDateTime: '' }));
    }

    // Auto-set end datetime (2 hours later) if not set
    if (newStartDateTime) {
      const start = new Date(newStartDateTime);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      
      if (!endDateTime || new Date(endDateTime) <= start) {
        setEndDateTime(end.toISOString().slice(0, 16));
      }
    }
  };

  // Handle store selection and auto-close dropdown
  const handleStoreSelect = (storeId) => {
    setSelectedStore(storeId);
    setIsDropdownOpen(false);
    
    // Clear store error
    if (errors.store) {
      setErrors(prev => ({ ...prev, store: '' }));
    }
  };

  // Get selected store details
  const selectedStoreData = STORES.find(store => store.id === selectedStore);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 px-4 py-8 sm:py-12">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
            Book Your Bike
          </h1>
          <p className="mt-3 text-base text-blue-100 sm:text-lg">
            Choose your location and rental duration
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-8 px-4 pb-12 sm:-mt-10 sm:pb-16">
        <div className="mx-auto max-w-lg sm:max-w-xl">
          {/* Booking Form */}
          <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:p-6">
            <form onSubmit={onSubmit} className="space-y-6">
              
              {/* Error Alert */}
              {errors.submit && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p className="text-red-700 text-sm">{errors.submit}</p>
                  </div>
                </div>
              )}
              
              {/* Store Selection */}
              <div>
                <div className="mb-3 text-base font-semibold text-gray-900 sm:text-lg">
                  Select City
                </div>
                
                <div className="dropdown-container relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 sm:px-5 sm:py-4 ${
                      errors.store
                        ? 'border-red-300 bg-red-50'
                        : selectedStore 
                          ? 'border-blue-500 text-gray-900' 
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base">
                        {selectedStore ? selectedStoreData?.name : 'Choose a city...'}
                      </span>
                      <svg 
                        className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </button>

                  {/* Error Message */}
                  {errors.store && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {errors.store}
                    </p>
                  )}

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-xl">
                      <div className="p-1">
                        {STORES.map((store) => (
                          <button
                            key={store.id}
                            type="button"
                            onClick={() => handleStoreSelect(store.id)}
                            className={`w-full rounded-lg px-3 py-3 text-left text-sm transition-all hover:bg-gray-50 sm:text-base ${
                              selectedStore === store.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-900'
                            }`}
                          >
                            {store.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* DateTime Selection */}
              <div className="space-y-5">
                
                {/* Start DateTime */}
                <div>
                  <div className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 sm:text-lg">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/>
                      </svg>
                    </div>
                    Start Time
                  </div>
                  
                  <div className="relative">
                    <input
                      type="datetime-local"
                      min={minDateTime}
                      className={`w-full rounded-xl border-2 bg-white px-4 py-3 pr-12 text-gray-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 sm:px-5 sm:py-4 sm:text-base ${
                        errors.startDateTime ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      value={startDateTime}
                      onChange={handleStartDateTimeChange}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Display formatted datetime */}
                  {startDateTime && (
                    <p className="mt-2 text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
                      Selected: {formatDateTime(startDateTime)}
                    </p>
                  )}
                  
                  {/* Error Message */}
                  {errors.startDateTime && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {errors.startDateTime}
                    </p>
                  )}
                </div>

                {/* End DateTime */}
                <div>
                  <div className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 sm:text-lg">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-700">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/>
                      </svg>
                    </div>
                    End Time
                  </div>
                  
                  <div className="relative">
                    <input
                      type="datetime-local"
                      min={startDateTime || minDateTime}
                      className={`w-full rounded-xl border-2 bg-white px-4 py-3 pr-12 text-gray-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 sm:px-5 sm:py-4 sm:text-base ${
                        errors.endDateTime ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      value={endDateTime}
                      onChange={(e) => {
                        setEndDateTime(e.target.value);
                        if (errors.endDateTime) {
                          setErrors(prev => ({ ...prev, endDateTime: '' }));
                        }
                      }}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Display formatted datetime */}
                  {endDateTime && (
                    <p className="mt-2 text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
                      Selected: {formatDateTime(endDateTime)}
                    </p>
                  )}
                  
                  {/* Error Message */}
                  {errors.endDateTime && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {errors.endDateTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-4 sm:text-base"
                >
                  <div className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Searching...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        Find Available Bikes
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
