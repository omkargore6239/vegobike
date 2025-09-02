// src/pages/rental/Checkout.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RentalCheckout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { bike, selectedPackage, packagePrice, search } = state || {};
  const valid = !!bike && !!selectedPackage && !!packagePrice && !!search;

  // Enhanced totals calculation
  const totals = useMemo(() => {
    if (!valid) return {
      subtotal: 0,
      gst: 0,
      platformFee: 0,
      discount: 0,
      deposit: 0,
      payableAmount: 0,
      total: 0,
      refundableAmount: 0,
      savings: 0
    };

    const subtotal = packagePrice;
    const gst = Math.round(subtotal * 0.18);
    const platformFee = 99;
    const discount = selectedPackage.duration >= 7 ? Math.round(subtotal * 0.05) : 0;
    const deposit = bike.refundable_deposit;
    const payableAmount = subtotal + gst + platformFee - discount;
    const total = payableAmount + deposit;
    const refundableAmount = deposit;
    const savings = discount;

    return {
      subtotal,
      gst,
      platformFee,
      discount,
      deposit,
      payableAmount,
      total,
      refundableAmount,
      savings
    };
  }, [bike, packagePrice, selectedPackage, valid]);

  useEffect(() => {
    if (!valid) {
      navigate("/rental", { replace: true });
    }
  }, [valid, navigate]);

  const showNotification = (message, type = 'warning') => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      showNotification('⚠️ Please select a payment method to continue');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      navigate("/rental/booking", {
        state: {
          bike,
          selectedPackage,
          packagePrice,
          search,
          totals,
          paymentMethod
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  if (!valid) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* Modern Alert Notification */}
      {showAlert && (
        <div className="fixed top-6 right-6 z-50 animate-bounce-in">
          <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-amber-500 p-5 max-w-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-100 rounded-full">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-1">Action Required</p>
                <p className="text-sm text-gray-700">{alertMessage}</p>
              </div>
              <button onClick={() => setShowAlert(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        
        {/* Ultra Modern Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl blur-lg opacity-20"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 px-8 py-8">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => navigate(-1)} 
                    className="group p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">💳 Secure Checkout</h1>
                    <p className="text-purple-100">Complete your premium bike rental experience</p>
                  </div>
                </div>
                
                {/* Animated Progress Steps */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Search</div>
                    </div>
                    <div className="w-12 h-1 bg-green-400 rounded-full"></div>
                    <div className="relative">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Select</div>
                    </div>
                    <div className="w-12 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="relative">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-3">
          
          {/* Left Column - Booking Details */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Premium Bike Summary */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Dream Ride</h2>
                    <p className="text-gray-600">Premium bike selection confirmed</p>
                  </div>
                </div>
                
                <div className="flex gap-8 mb-8">
                  <div className="relative group">
                    <img 
                      src={bike.image} 
                      alt={`${bike.company} ${bike.name}`} 
                      className="w-40 h-28 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='140' viewBox='0 0 200 140'%3E%3Crect width='200' height='140' fill='%23f3f4f6'/%3E%3Ctext x='100' y='70' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='14' fill='%236b7280'%3E${bike.company} ${bike.name}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                      ✓ Confirmed
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{bike.company} {bike.name}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="font-medium">{bike.number}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-amber-100 rounded-full px-3 py-1">
                        <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium text-amber-600">{bike.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{bike.store_address}</span>
                    </div>
                  </div>
                </div>

                {/* Trip Timeline Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900">Selected Package</h4>
                        <p className="text-blue-700">{selectedPackage.label}</p>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">₹{packagePrice}</div>
                    {totals.savings > 0 && (
                      <div className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save ₹{totals.savings}
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-900">Pickup</h4>
                        <p className="text-green-700 text-sm">
                          {search.start?.toLocaleString('en-IN', { 
                            day: '2-digit', month: 'short',
                            hour: '2-digit', minute: '2-digit', hour12: true 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-green-800 font-medium">{search.locationName}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-red-500 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-900">Return</h4>
                        <p className="text-red-700 text-sm">
                          {search.end?.toLocaleString('en-IN', { 
                            day: '2-digit', month: 'short',
                            hour: '2-digit', minute: '2-digit', hour12: true 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-red-800 font-medium">{search.days} Day{search.days > 1 ? 's' : ''}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ultra Modern Payment Selection */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Choose Payment Method</h2>
                    <p className="text-gray-600">Select your preferred way to pay</p>
                  </div>
                </div>
                
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Cash on Delivery Option */}
                    <label className={`group cursor-pointer rounded-3xl border-2 p-8 transition-all duration-300 ${
                      paymentMethod === 'cod' 
                        ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100 shadow-2xl transform scale-105' 
                        : 'border-gray-200 bg-gray-50 hover:border-orange-200 hover:bg-orange-50 hover:scale-105 hover:shadow-xl'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-6">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          paymentMethod === 'cod' 
                            ? 'border-orange-500 bg-orange-500 shadow-lg scale-110' 
                            : 'border-gray-300 group-hover:border-orange-300'
                        }`}>
                          {paymentMethod === 'cod' && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl">💵</span>
                            <h3 className="text-xl font-bold text-gray-900">Cash on Delivery</h3>
                          </div>
                          <p className="text-gray-600 mb-4">Pay when you pick up the bike</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-orange-600 bg-orange-100 rounded-full px-3 py-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="font-medium">No advance payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600 bg-green-100 rounded-full px-3 py-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="font-medium">Quick & Easy</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Online Payment Option */}
                    <label className={`group cursor-pointer rounded-3xl border-2 p-8 transition-all duration-300 ${
                      paymentMethod === 'online' 
                        ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 shadow-2xl transform scale-105' 
                        : 'border-gray-200 bg-gray-50 hover:border-blue-200 hover:bg-blue-50 hover:scale-105 hover:shadow-xl'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-6">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          paymentMethod === 'online' 
                            ? 'border-blue-500 bg-blue-500 shadow-lg scale-110' 
                            : 'border-gray-300 group-hover:border-blue-300'
                        }`}>
                          {paymentMethod === 'online' && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl">💳</span>
                            <h3 className="text-xl font-bold text-gray-900">Pay Online</h3>
                          </div>
                          <p className="text-gray-600 mb-4">UPI, Cards, Net Banking, Wallets</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-blue-600 bg-blue-100 rounded-full px-3 py-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              <span className="font-medium">100% Secure</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600 bg-green-100 rounded-full px-3 py-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <span className="font-medium">Instant</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="xl:col-span-1">
            <div className="sticky top-6 space-y-6">
              
              {/* Price Summary Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-3xl blur opacity-25"></div>
                <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <div className="text-center mb-8">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl inline-block mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Price Summary</h2>
                    <p className="text-gray-600">Complete cost breakdown</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-700">Package ({selectedPackage.label})</span>
                      <span className="font-bold text-lg">₹{totals.subtotal}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">GST (18%)</span>
                        <div className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">Tax</div>
                      </div>
                      <span className="font-bold">₹{totals.gst}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">Platform Fee</span>
                        <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Service</div>
                      </div>
                      <span className="font-bold">₹{totals.platformFee}</span>
                    </div>
                    
                    {totals.discount > 0 && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">Long Rental Discount</span>
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">5% OFF</div>
                        </div>
                        <span className="font-bold text-green-600">-₹{totals.discount}</span>
                      </div>
                    )}
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-green-800">Subtotal</span>
                        <span className="text-2xl font-bold text-green-700">₹{totals.payableAmount}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-blue-800">Security Deposit</span>
                          <div className="text-xs text-blue-600 mt-1">Fully Refundable</div>
                        </div>
                        <span className="text-xl font-bold text-blue-700">₹{totals.deposit}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-lg font-bold">Total Amount</span>
                          <div className="text-sm text-gray-300 mt-1">Final Payment</div>
                        </div>
                        <span className="text-3xl font-bold">₹{totals.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Section */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <h4 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      What's Included
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-blue-800">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Full tank fuel included</span>
                      </div>
                      <div className="flex items-center gap-3 text-blue-800">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>24/7 roadside assistance</span>
                      </div>
                      <div className="flex items-center gap-3 text-blue-800">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Free cancellation up to 2 hours</span>
                      </div>
                      <div className="flex items-center gap-3 text-blue-800">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Sanitized before every ride</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="text-center p-4 bg-gray-50 rounded-2xl mb-6">
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-sm font-bold">🔒 Bank-Level Security</span>
                    </div>
                    <div className="text-xs text-gray-500">256-bit SSL encryption</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ultimate Pay Now Button */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl blur-lg opacity-30"></div>
            <button
              onClick={onSubmit}
              disabled={!paymentMethod || isLoading}
              className={`relative w-full rounded-3xl px-8 py-6 text-xl font-bold transition-all duration-300 ${
                paymentMethod && !isLoading
                  ? 'bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl hover:scale-105 transform'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-4">
                  <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Processing Payment...</span>
                </div>
              ) : !paymentMethod ? (
                <div className="flex items-center justify-center gap-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Select Payment Method to Continue</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>PAY NOW ₹{totals.total} - {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: translateX(100%) scale(0.3);
            opacity: 0;
          }
          50% {
            transform: translateX(-10px) scale(1.05);
          }
          70% {
            transform: translateX(5px) scale(0.95);
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
}
