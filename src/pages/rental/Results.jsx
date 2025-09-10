// src/pages/rental/Results.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  BIKES, 
  LOCATIONS, 
  STORES,
  getBikesByStore,
  getStoreById,
  getLocationById
} from "./data";

export default function RentalResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPackages, setSelectedPackages] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    priceRange: { min: '', max: '' }
  });

  // Parse search parameters
  const search = useMemo(() => {
    const city = params.get("city") || "mumbai";
    const store = params.get("store") || "";
    const pickupDate = params.get("pickupDate") || "";
    const pickupTime = params.get("pickupTime") || "";
    const dropoffDate = params.get("dropoffDate") || "";
    const dropoffTime = params.get("dropoffTime") || "";

    let start = null;
    let end = null;
    
    if (pickupDate && pickupTime) {
      start = new Date(`${pickupDate}T${pickupTime}:00`);
    }
    
    if (dropoffDate && dropoffTime) {
      end = new Date(`${dropoffDate}T${dropoffTime}:00`);
    }

    let hours = 1;
    let days = 1;
    if (start && end) {
      const diffTime = end.getTime() - start.getTime();
      hours = Math.ceil(diffTime / (1000 * 60 * 60));
      days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (hours <= 0) hours = 1;
      if (days <= 0) days = 1;
    }

    const locationData = getLocationById(city);
    const storeData = getStoreById(store);
    const locationName = locationData?.name || "Unknown Location";
    const storeName = storeData?.name || "Store";

    return { 
      city, store, pickupDate, pickupTime, dropoffDate, dropoffTime,
      start, end, hours, days, locationName, storeName, storeData
    };
  }, [params]);

  // Get all bikes first
  const allBikes = useMemo(() => {
    if (search.store) {
      return getBikesByStore(search.store);
    } else {
      return BIKES.filter(bike => bike.location === search.city);
    }
  }, [search.city, search.store]);

  // Filter bikes based on applied filters
  const filteredBikes = useMemo(() => {
    let bikes = [...allBikes];

    // Apply brand filter
    if (filters.brands.length > 0) {
      bikes = bikes.filter(bike => filters.brands.includes(bike.company));
    }

    // Apply model filter
    if (filters.models.length > 0) {
      bikes = bikes.filter(bike => filters.models.includes(bike.name));
    }

    return bikes;
  }, [allBikes, filters]);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const brands = [...new Set(allBikes.map(bike => bike.company))];
    const models = [...new Set(allBikes.map(bike => bike.name))];
    
    return { brands, models };
  }, [allBikes]);

  const packageOptions = [
    { label: "1 Day", key: "1_day", duration: 1, popular: false },
    { label: "7 Days", key: "7_days", duration: 7, popular: true },
    { label: "15 Days", key: "15_days", duration: 15, popular: false },
    { label: "30 Days", key: "30_days", duration: 30, popular: false }
  ];

  // Calculate date/time based pricing
  const calculateDateTimePrice = (bike) => {
    if (search.hours <= 24) {
      return bike.pricePerHour * search.hours;
    } else {
      const dailyRate = bike.pricePerHour * 24 * 0.8;
      return Math.round(dailyRate * search.days);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => {
      if (filterType === 'priceRange') {
        return {
          ...prev,
          priceRange: { ...prev.priceRange, ...value }
        };
      } else {
        const currentValues = prev[filterType];
        const newValues = checked 
          ? [...currentValues, value]
          : currentValues.filter(item => item !== value);
        
        return {
          ...prev,
          [filterType]: newValues
        };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      brands: [],
      models: [],
      priceRange: { min: '', max: '' }
    });
  };

  // Updated handlePackageSelect with quick animations and proper unselect
  const handlePackageSelect = (bikeId, packageOption) => {
    setSelectedPackages(prev => {
      if (prev[bikeId]?.key === packageOption.key) {
        // Unselect - remove completely
        const newSelection = {...prev};
        delete newSelection[bikeId];
        return newSelection;
      } else {
        // Select new package
        return { ...prev, [bikeId]: packageOption };
      }
    });
  };

  const handleBookNow = (bike) => {
    const selectedPackage = selectedPackages[bike.id];
    const dateTimePrice = calculateDateTimePrice(bike);
    
    const finalPrice = selectedPackage ? bike.packages[selectedPackage.key] : dateTimePrice;
    const pricingType = selectedPackage ? 'package' : 'datetime';

    navigate("/rental/checkout", { 
      state: { 
        bike, 
        selectedPackage: selectedPackage || null,
        packagePrice: selectedPackage ? bike.packages[selectedPackage.key] : null,
        dateTimePrice,
        finalPrice,
        pricingType,
        search 
      } 
    });
  };

  const formatDateOnly = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short',
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    });
  };

  const formatTimeOnly = (date) => {
    if (!date) return "";
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  // Filter Component
  const FilterSection = ({ isMobile = false }) => (
    <div className={`bg-white rounded-lg shadow-sm border p-4 ${isMobile ? '' : 'sticky top-4'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Brands Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Brands</h4>
        <div className="space-y-2">
          {filterOptions.brands.map(brand => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={(e) => handleFilterChange('brands', brand, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Models Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Models</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {filterOptions.models.map(model => (
            <label key={model} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.models.includes(model)}
                onChange={(e) => handleFilterChange('models', model, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{model}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Active filter count
  const activeFilterCount = filters.brands.length + filters.models.length + (filters.priceRange.min || filters.priceRange.max ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:py-5">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back to Search</span>
            </button>
            <div className="text-right">
              <h1 className="text-lg font-bold text-gray-900 sm:text-2xl">
                Available in {search.locationName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                {search.storeName && `${search.storeName} • `}
                {filteredBikes.length} bike{filteredBikes.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
        {/* Small Trip Details */}
        {search.start && search.end && (
          <div className="mb-4 bg-white rounded-lg p-3 shadow-sm border">
            <h3 className="text-xs font-semibold text-gray-900 mb-2">Trip Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-gray-500 font-medium">Pickup:</span>
                <div className="text-gray-900 font-semibold text-xs">{formatDateOnly(search.start)}</div>
                <div className="text-gray-700 text-xs">{formatTimeOnly(search.start)}</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Return:</span>
                <div className="text-gray-900 font-semibold text-xs">{formatDateOnly(search.end)}</div>
                <div className="text-gray-700 text-xs">{formatTimeOnly(search.end)}</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Duration:</span>
                <div className="text-gray-900 font-semibold text-xs">{search.days} day{search.days > 1 ? 's' : ''}</div>
                <div className="text-gray-700 text-xs">{search.hours} hour{search.hours > 1 ? 's' : ''}</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Location:</span>
                <div className="text-gray-900 font-semibold text-xs">{search.locationName}</div>
                {search.storeData && (
                  <div className="text-gray-700 text-xs">{search.storeData.name}</div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSection />
          </div>

          {/* Bikes Grid */}
          <div className="flex-1">
            <div className="grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-20 lg:pb-6">
              {filteredBikes.map(bike => {
                const selectedPackage = selectedPackages[bike.id];
                const dateTimePrice = calculateDateTimePrice(bike);
                const finalPrice = selectedPackage ? bike.packages[selectedPackage.key] : dateTimePrice;
                
                return (
                  <article 
                    key={bike.id} 
                    className="overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Bike Image */}
                    <div className="relative">
                      <img 
                        src={bike.image} 
                        alt={`${bike.company} ${bike.name}`} 
                        className="h-28 sm:h-36 w-full object-cover"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e5e7eb'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='16' fill='%236b7280'%3E${bike.company} ${bike.name}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>

                    {/* Bike Details */}
                    <div className="p-3 sm:p-4">
                      <div className="mb-3">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">
                          {bike.company} {bike.name}
                        </h3>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1 space-y-1">
                          <div>
                            <span className="font-medium">Vehicle:</span> {bike.number}
                          </div>
                          <div className="truncate">
                            <span className="font-medium">Store:</span> {bike.store_address}
                          </div>
                        </div>
                      </div>

                      {/* Package Selection with Quick Animations */}
                      <div className="mb-3">
                        <h4 className="mb-2 text-xs sm:text-sm font-semibold text-gray-900">
                          {selectedPackage ? 'Package Selected' : 'Choose Package'}
                        </h4>
                        <div className="grid grid-cols-2 gap-1 sm:gap-2">
                          {packageOptions.map((pkg) => (
                            <button
                              key={pkg.key}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePackageSelect(bike.id, pkg);
                              }}
                              className={`relative overflow-hidden rounded-md sm:rounded-lg border-2 p-1.5 sm:p-2.5 text-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 ${
                                selectedPackage?.key === pkg.key
                                  ? 'border-blue-500 bg-blue-500 text-white shadow-lg scale-105 animate-pulse'
                                  : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 hover:scale-102'
                              }`}
                            >
                              {pkg.popular && (
                                <div className="absolute -right-1 -top-1 rounded-full bg-orange-500 px-1 sm:px-1.5 py-0.5 text-xs font-bold text-white">
                                  ★
                                </div>
                              )}
                              <div className={`text-xs font-medium transition-colors duration-150 ${
                                selectedPackage?.key === pkg.key ? 'text-white' : 'text-gray-600'
                              }`}>
                                {pkg.label}
                              </div>
                              <div className={`text-xs sm:text-sm font-bold transition-colors duration-150 ${
                                selectedPackage?.key === pkg.key ? 'text-white' : 'text-gray-900'
                              }`}>
                                ₹{bike.packages[pkg.key].toLocaleString()}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Security Deposit */}
                      <div className="mb-3 text-center">
                        <p className="text-xs text-red-600 font-medium">
                          *Security deposit: ₹{bike.refundable_deposit.toLocaleString()} (refundable)
                        </p>
                      </div>

                      {/* Book Now Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(bike);
                        }}
                        className="w-full rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg hover:from-blue-900 hover:to-blue-900 hover:shadow-xl hover:scale-102 focus:ring-blue-500 active:scale-95"
                      >
                        <div className="flex items-center justify-center gap-2">
                          Book Now
                        </div>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* No Results */}
            {filteredBikes.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="mx-auto mb-4 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">No bikes match your filters</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Try adjusting your filter criteria to see more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Mobile Filter Button - Bottom Right */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        >
          <div className="relative">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {activeFilterCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="relative min-h-screen flex items-end">
            <div className="relative bg-white w-full max-h-[80vh] overflow-y-auto rounded-t-2xl">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <FilterSection isMobile={true} />
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    Apply Filters ({filteredBikes.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
