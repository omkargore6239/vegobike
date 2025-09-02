// src/pages/rental/Results.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BIKES, LOCATIONS } from "./data";

export default function RentalResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [selectedBike, setSelectedBike] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Parse search parameters
  const search = useMemo(() => {
    const store = params.get("store") || "blr";
    const startDateTimeStr = params.get("startDateTime");
    const endDateTimeStr = params.get("endDateTime");

    const start = startDateTimeStr ? new Date(startDateTimeStr) : null;
    const end = endDateTimeStr ? new Date(endDateTimeStr) : null;

    // Calculate rental duration in days
    let days = 1;
    if (start && end) {
      const diffTime = end.getTime() - start.getTime();
      days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (days <= 0) days = 1;
    }

    const locationName = LOCATIONS.find(l => l.id === store)?.name || "Bengaluru";

    return { store, start, end, days, locationName };
  }, [params]);

  // Filter bikes by store location
  const bikes = useMemo(
    () => BIKES.filter(b => b.location === search.store),
    [search.store]
  );

  // Package options
  const packageOptions = [
    { label: "1 Day", key: "1_day", duration: 1, popular: false },
    { label: "7 Days", key: "7_days", duration: 7, popular: true },
    { label: "15 Days", key: "15_days", duration: 15, popular: false },
    { label: "30 Days", key: "30_days", duration: 30, popular: false }
  ];

  // Handle bike selection
  const handleBikeSelect = (bikeId) => {
    if (selectedBike === bikeId) {
      // If clicking the same bike, just keep it selected
      return;
    }
    // Switch to new bike and clear package selection
    setSelectedBike(bikeId);
    setSelectedPackage(null);
  };

  // Handle package selection
  const handlePackageSelect = (bikeId, packageOption) => {
    if (selectedBike !== bikeId) {
      // If selecting package for different bike, switch bikes first
      setSelectedBike(bikeId);
      setSelectedPackage(packageOption);
    } else {
      // Same bike, just update package
      setSelectedPackage(packageOption);
    }
  };

  // Handle book now
  const handleBookNow = (bike) => {
    if (selectedBike !== bike.id || !selectedPackage) {
      alert('Please select a package first!');
      return;
    }

    navigate("/rental/checkout", { 
      state: { 
        bike, 
        selectedPackage,
        packagePrice: bike.packages[selectedPackage.key],
        search 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Search
            </button>
            <div className="text-right">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Available in {search.locationName}
              </h1>
              <p className="text-sm text-gray-600">
                {bikes.length} bike{bikes.length !== 1 ? 's' : ''} found • Select a bike to continue
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Trip Details */}
        {search.start && search.end && (
          <div className="mb-6 rounded-xl bg-white p-4 shadow-sm border">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Trip Details</h3>
            <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
              <div>
                <span className="font-medium">Pickup:</span> {search.start.toLocaleString('en-IN', { 
                  day: '2-digit', month: 'short', year: 'numeric', 
                  hour: '2-digit', minute: '2-digit', hour12: true 
                })}
              </div>
              <div>
                <span className="font-medium">Return:</span> {search.end.toLocaleString('en-IN', { 
                  day: '2-digit', month: 'short', year: 'numeric', 
                  hour: '2-digit', minute: '2-digit', hour12: true 
                })}
              </div>
            </div>
          </div>
        )}

        {/* Selection Status */}
        {selectedBike && (
          <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-800">
                  {bikes.find(b => b.id === selectedBike)?.company} {bikes.find(b => b.id === selectedBike)?.name} selected
                  {selectedPackage && ` • ${selectedPackage.label} package`}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedBike(null);
                  setSelectedPackage(null);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Bikes Grid - All cards fully visible */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bikes.map(bike => {
            const isSelectedBike = selectedBike === bike.id;
            const bikePackage = isSelectedBike ? selectedPackage : null;
            const isOtherBikeSelected = selectedBike && selectedBike !== bike.id;
            
            return (
              <article 
                key={bike.id} 
                onClick={() => handleBikeSelect(bike.id)}
                className={`overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 cursor-pointer ${
                  isSelectedBike 
                    ? 'ring-2 ring-blue-500 shadow-xl transform scale-[1.02]' 
                    : 'hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Bike Image - No overlays except for selected bike */}
                <div className="relative">
                  <img 
                    src={bike.image} 
                    alt={`${bike.company} ${bike.name}`} 
                    className="h-36 w-full object-cover"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e5e7eb'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='16' fill='%236b7280'%3E${bike.company} ${bike.name}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                    {bike.type}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-amber-600 shadow-sm">
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {bike.rating}
                  </div>
                  
                  {/* Only show SELECTED overlay for selected bike */}
                  {isSelectedBike && (
                    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        SELECTED
                      </div>
                    </div>
                  )}
                </div>

                {/* Bike Details - All cards fully visible with normal colors */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                      {bike.company} {bike.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Vehicle:</span> {bike.number}
                    </p>
                  </div>

                  {/* Package Selection - All packages fully visible */}
                  <div className="mb-3">
                    <h4 className="mb-2 text-sm font-semibold text-gray-900">
                      {isSelectedBike ? 'Select Package' : 'Available Packages'}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {packageOptions.map((pkg) => (
                        <button
                          key={pkg.key}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePackageSelect(bike.id, pkg);
                          }}
                          className={`relative overflow-hidden rounded-lg border-2 p-2.5 text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            bikePackage?.key === pkg.key
                              ? 'border-blue-500 bg-blue-500 text-white shadow-lg transform scale-105'
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100 hover:scale-105'
                          }`}
                        >
                          {pkg.popular && (
                            <div className="absolute -right-1 -top-1 rounded-full bg-orange-500 px-1.5 py-0.5 text-xs font-bold text-white">
                              ★
                            </div>
                          )}
                          <div className={`text-xs font-medium ${
                            bikePackage?.key === pkg.key ? 'text-white' : 'text-gray-600'
                          }`}>
                            {pkg.label}
                          </div>
                          <div className={`text-sm font-bold ${
                            bikePackage?.key === pkg.key ? 'text-white' : 'text-gray-900'
                          }`}>
                            ₹{bike.packages[pkg.key]}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deposit Info - Always fully visible */}
                  <div className="mb-3 rounded-lg bg-blue-50 p-2.5 text-center">
                    <div className="text-xs text-blue-600 font-medium">
                      Security Deposit
                    </div>
                    <div className="text-base font-bold text-blue-700">
                      ₹{bike.refundable_deposit}
                    </div>
                  </div>

                  {/* Book Now Button - Only button text changes */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedBike !== bike.id) {
                        handleBikeSelect(bike.id);
                      } else if (selectedPackage) {
                        handleBookNow(bike);
                      }
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      selectedBike === bike.id && selectedPackage
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 focus:ring-green-500'
                        : selectedBike === bike.id && !selectedPackage
                          ? 'bg-blue-100 text-blue-600 border-2 border-blue-300 hover:bg-blue-200'
                          : isOtherBikeSelected
                            ? 'bg-orange-100 text-orange-700 border-2 border-orange-300 hover:bg-orange-200 hover:scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {selectedBike === bike.id && selectedPackage ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Book Now - ₹{bike.packages[selectedPackage.key]}
                      </div>
                    ) : selectedBike === bike.id && !selectedPackage ? (
                      'Select Package Above'
                    ) : isOtherBikeSelected ? (
                      'Select This Bike First'
                    ) : (
                      'Select This Bike'
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* No Results */}
        {bikes.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No bikes available</h3>
            <p className="mt-1 text-sm text-gray-600">
              No bikes found for the selected location. Please try a different location or time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
