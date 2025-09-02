// src/pages/rental/BookingHistory.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Modern Alert/Notification Component
const ModernAlert = ({ show, onClose, type, title, message, autoClose = true }) => {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, autoClose]);

  if (!show) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'from-green-500 to-emerald-600',
          border: 'border-green-200',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'error':
        return {
          bg: 'from-red-500 to-pink-600',
          border: 'border-red-200',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      case 'warning':
        return {
          bg: 'from-amber-500 to-orange-600',
          border: 'border-amber-200',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        };
      default:
        return {
          bg: 'from-blue-500 to-indigo-600',
          border: 'border-blue-200',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-bounce-in">
      <div className="relative max-w-sm">
        {/* Animated background blur */}
        <div className={`absolute inset-0 bg-gradient-to-r ${styles.bg} rounded-2xl blur-sm opacity-80`}></div>
        
        {/* Main alert content */}
        <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-white overflow-hidden">
          {/* Colored header bar */}
          <div className={`h-2 bg-gradient-to-r ${styles.bg}`}></div>
          
          <div className="p-5">
            <div className="flex items-start gap-4">
              {/* Animated icon container */}
              <div className={`p-3 bg-gradient-to-br ${styles.bg} rounded-full shadow-lg animate-pulse-scale`}>
                {styles.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
                
                {/* Animated progress bar */}
                {autoClose && (
                  <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${styles.bg} rounded-full animate-shrink-width`}></div>
                  </div>
                )}
              </div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Success Animation Modal
const SuccessAnimation = ({ show, onClose, title, message, icon }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md mx-4 overflow-hidden animate-zoom-bounce-in">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-4 w-8 h-8 bg-green-200 rounded-full opacity-20 animate-float-1"></div>
          <div className="absolute top-12 right-8 w-6 h-6 bg-emerald-200 rounded-full opacity-30 animate-float-2"></div>
          <div className="absolute bottom-8 left-8 w-4 h-4 bg-teal-200 rounded-full opacity-25 animate-float-3"></div>
        </div>
        
        <div className="relative p-8 text-center">
          {/* Large animated icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce-scale">
              {icon || (
                <svg className="w-10 h-10 text-white animate-draw-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3 animate-slide-up-1">{title}</h2>
          <p className="text-gray-600 leading-relaxed mb-6 animate-slide-up-2">{message}</p>
          
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-slide-up-3"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Image Upload Modal Component
const ImageUploadModal = ({ isOpen, onClose, onSubmit, title, isUploading, uploadType, bookingId }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);

  useEffect(() => {
    if (isOpen) {
      setImages([null, null, null, null]);
      setPreviews([null, null, null, null]);
    }
  }, [isOpen, uploadType, bookingId]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      const newPreviews = [...previews];
      
      newImages[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      
      setImages(newImages);
      setPreviews(newPreviews);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    
    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    
    newImages[index] = null;
    newPreviews[index] = null;
    
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = () => {
    if (images.some(img => img === null)) {
      return;
    }
    onSubmit(images);
  };

  const resetModal = () => {
    previews.forEach(preview => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    });
    setImages([null, null, null, null]);
    setPreviews([null, null, null, null]);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  const angleLabels = ['Front View', 'Left Side', 'Right Side', 'Rear View'];
  const uploadTypeLabel = uploadType === 'start' ? '🚀 Starting' : '🏁 Ending';
  const completedCount = images.filter(img => img !== null).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-modal-bounce-in">
        <div className={`${uploadType === 'start' ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600' : 'bg-gradient-to-r from-red-500 via-pink-600 to-rose-600'} p-6 rounded-t-3xl text-white relative overflow-hidden`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-8 left-8 w-16 h-16 bg-white opacity-5 rounded-full animate-float-1"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-white opacity-90 text-sm mb-3">
                {uploadType === 'start' 
                  ? 'Document bike condition at pickup with 4 clear photos' 
                  : 'Document bike condition at return with 4 new photos'
                }
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  {uploadTypeLabel} Trip Documentation
                </div>
                <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-bold backdrop-blur-sm">
                  {completedCount}/4 Photos
                </div>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {[0, 1, 2, 3].map((index) => (
              <div key={`${uploadType}-${bookingId}-${index}`} className="relative group">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-all duration-300 h-40 flex items-center justify-center group-hover:shadow-lg">
                  {previews[index] ? (
                    <div className="relative w-full h-full animate-fade-in">
                      <img 
                        src={previews[index]} 
                        alt={`Bike ${uploadType} angle ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-md"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-300 shadow-lg hover:scale-110 animate-bounce-in"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      {/* Success checkmark */}
                      <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1 animate-scale-in">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full group-hover:scale-105 transition-transform duration-300">
                      <div className="p-4 bg-gray-100 rounded-full mb-3 group-hover:bg-blue-100 transition-colors duration-300">
                        <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Upload Photo</p>
                      <p className="text-xs text-gray-500">{angleLabels[index]}</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        className="hidden"
                        key={`input-${uploadType}-${bookingId}-${index}`}
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Upload Progress</span>
              <span className="text-sm font-bold text-gray-900">{completedCount}/4 Complete</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  uploadType === 'start' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                    : 'bg-gradient-to-r from-red-500 to-pink-600'
                }`}
                style={{ width: `${(completedCount / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={`${uploadType === 'start' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} rounded-2xl p-6 mb-8 border-2`}>
            <h4 className={`font-bold mb-3 flex items-center gap-3 ${uploadType === 'start' ? 'text-green-900' : 'text-red-900'}`}>
              <div className={`p-2 rounded-full ${uploadType === 'start' ? 'bg-green-500' : 'bg-red-500'}`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              📸 {uploadType === 'start' ? 'Start Trip' : 'End Trip'} Photo Guidelines
            </h4>
            <ul className={`text-sm space-y-2 ${uploadType === 'start' ? 'text-green-800' : 'text-red-800'}`}>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Take clear, well-lit photos from all 4 specified angles
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Document any existing damages, scratches, or issues
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ensure license plate and key details are visible
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {uploadType === 'start' 
                  ? 'These photos will be used as baseline condition reference' 
                  : 'These photos will be compared with start trip photos for damage assessment'
                }
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleClose}
              className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={images.some(img => img === null) || isUploading}
              className={`flex-1 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                images.every(img => img !== null) && !isUploading
                  ? `${uploadType === 'start' ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'} text-white shadow-lg hover:shadow-xl`
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed scale-95'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Uploading {uploadType === 'start' ? 'Start' : 'End'} Photos...</span>
                </div>
              ) : (
                `Submit ${uploadType === 'start' ? 'Start Trip' : 'End Trip'} Photos`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock booking data generator
const generateBookingHistory = (newBooking = null) => {
  const baseBookings = [
    {
      id: "BK123456",
      bike: {
        company: "Royal Enfield",
        name: "Classic 350",
        number: "KA-01-AB-1234",
        image: "https://picsum.photos/200/120?random=10"
      },
      location: "Bengaluru",
      startDate: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      paymentMethod: "online",
      amount: 9500,
      status: "Completed",
      tripStarted: true,
      tripEnded: true,
      packageType: "7 Days",
      startImages: [],
      endImages: []
    },
    {
      id: "BK123457",
      bike: {
        company: "Bajaj",
        name: "Pulsar NS 200",
        number: "KA-02-CD-5678",
        image: "https://picsum.photos/200/120?random=11"
      },
      location: "Hyderabad",
      startDate: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() + 1 * 24 * 3600 * 1000).toISOString(),
      paymentMethod: "cod",
      amount: 6000,
      status: "Active",
      tripStarted: true,
      tripEnded: false,
      packageType: "3 Days",
      startImages: [],
      endImages: []
    },
    {
      id: "BK123458",
      bike: {
        company: "Honda",
        name: "CB Shine",
        number: "KA-03-EF-9012",
        image: "https://picsum.photos/200/120?random=12"
      },
      location: "Chennai",
      startDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
      paymentMethod: "online",
      amount: 4500,
      status: "Confirmed",
      tripStarted: false,
      tripEnded: false,
      packageType: "3 Days",
      startImages: [],
      endImages: []
    },
    {
      id: "BK123459",
      bike: {
        company: "TVS",
        name: "Apache RTR",
        number: "KA-04-GH-3456",
        image: "https://picsum.photos/200/120?random=13"
      },
      location: "Pune",
      startDate: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
      paymentMethod: "cod",
      amount: 7200,
      status: "Completed",
      tripStarted: true,
      tripEnded: true,
      packageType: "5 Days",
      startImages: [],
      endImages: []
    }
  ];

  if (newBooking) {
    return [newBooking, ...baseBookings];
  }
  return baseBookings;
};

export default function BookingHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [successData, setSuccessData] = useState({});
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [uploadType, setUploadType] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const newBooking = location.state?.newBooking;
    const bookingHistory = generateBookingHistory(newBooking);
    setBookings(bookingHistory);

    if (newBooking) {
      showNotification('success', '🎉 Booking Added!', 'Your booking has been successfully added to your history and is ready to go!');
    }
  }, [location.state]);

  const showNotification = (type, title, message) => {
    setAlertData({ type, title, message });
    setShowAlert(true);
  };

  const showSuccess = (title, message, icon) => {
    setSuccessData({ title, message, icon });
    setShowSuccessAnimation(true);
  };

  const handleStartTrip = (bookingId) => {
    setShowImageUpload(false);
    setTimeout(() => {
      setCurrentBookingId(bookingId);
      setUploadType('start');
      setShowImageUpload(true);
    }, 100);
  };

  const handleEndTrip = (bookingId) => {
    setShowImageUpload(false);
    setTimeout(() => {
      setCurrentBookingId(bookingId);
      setUploadType('end');
      setShowImageUpload(true);
    }, 100);
  };

  const handleImageUploadSubmit = (images) => {
    setIsUploading(true);
    
    setTimeout(() => {
      setBookings(prev => 
        prev.map(booking => {
          if (booking.id === currentBookingId) {
            if (uploadType === 'start') {
              return { 
                ...booking, 
                tripStarted: true,
                status: 'Active',
                startImages: [...images]
              };
            } else {
              return { 
                ...booking, 
                tripEnded: true,
                status: 'Completed',
                endImages: [...images]
              };
            }
          }
          return booking;
        })
      );
      
      setShowImageUpload(false);
      setCurrentBookingId(null);
      setUploadType('');
      setIsUploading(false);
      
      // Show success animation
      const actionType = uploadType === 'start' ? 'Trip Started!' : 'Trip Completed!';
      const actionMessage = uploadType === 'start' 
        ? 'Your adventure has begun! Safe travels and enjoy your ride.' 
        : 'Welcome back! Your trip has been completed successfully with all photos documented.';
      
      const actionIcon = uploadType === 'start' ? (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ) : (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      );
      
      showSuccess(actionType, actionMessage, actionIcon);
    }, 2000);
  };

  const closeModal = () => {
    setShowImageUpload(false);
    setCurrentBookingId(null);
    setUploadType('');
    setIsUploading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200';
      case 'Active':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200';
      case 'Confirmed':
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Active':
        return <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>;
      case 'Confirmed':
        return (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4">
      
      {/* Modern Alert Notification */}
      <ModernAlert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
      />

      {/* Success Animation Modal */}
      <SuccessAnimation
        show={showSuccessAnimation}
        onClose={() => setShowSuccessAnimation(false)}
        title={successData.title}
        message={successData.message}
        icon={successData.icon}
      />

      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Enhanced Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl blur-lg opacity-20 animate-pulse-slow"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => navigate("/")} 
                    className="group p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold mb-2">🚗 My Adventures</h1>
                    <p className="text-indigo-100">Track and manage your bike rentals</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold animate-counter">{bookings.length}</div>
                  <div className="text-indigo-200 text-sm">Total Journeys</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          // Enhanced Empty State
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur-lg opacity-10"></div>
            <div className="relative bg-white rounded-3xl shadow-xl p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float-1">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Adventures Yet</h3>
              <p className="text-gray-600 mb-8 text-lg">Ready to start your first epic bike journey?</p>
              <button
                onClick={() => navigate("/rental")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl animate-bounce-subtle"
              >
                🚀 Start Your Journey
              </button>
            </div>
          </div>
        ) : (
          // Enhanced Booking Cards Grid
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bookings.map((booking, index) => (
              <div key={booking.id} className="group relative animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform group-hover:scale-105 transition-all duration-500">
                  <div className="p-6">
                    
                    {/* Enhanced Header Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={booking.bike.image} 
                            alt={`${booking.bike.company} ${booking.bike.name}`}
                            className="w-20 h-14 object-cover rounded-xl shadow-lg"
                            onError={(e) => {
                              e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'%3E%3Crect width='80' height='60' fill='%23f3f4f6'/%3E%3Ctext x='40' y='30' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='8' fill='%236b7280'%3EBike%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                          {booking.status === 'Active' && (
                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                              LIVE
                            </div>
                          )}
                        </div>
                        <div>
                          <h2 className="font-bold text-gray-900 text-xl mb-1">
                            {booking.bike.company} {booking.bike.name}
                          </h2>
                          <p className="text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            {booking.bike.number}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-md ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </div>
                    </div>

                    {/* Enhanced Details Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                        <span className="text-gray-500 text-xs">Booking ID</span>
                        <p className="font-bold text-gray-900">{booking.id}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                        <span className="text-gray-500 text-xs">Location</span>
                        <p className="font-bold text-gray-900">{booking.location}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                        <span className="text-green-600 text-xs">Pickup</span>
                        <p className="font-bold text-gray-900">
                          {new Date(booking.startDate).toLocaleDateString('en-IN', { 
                            day: '2-digit', month: 'short',
                            hour: '2-digit', minute: '2-digit', hour12: true 
                          })}
                        </p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-3 border border-red-200">
                        <span className="text-red-600 text-xs">Return</span>
                        <p className="font-bold text-gray-900">
                          {new Date(booking.endDate).toLocaleDateString('en-IN', { 
                            day: '2-digit', month: 'short',
                            hour: '2-digit', minute: '2-digit', hour12: true 
                          })}
                        </p>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                        <span className="text-purple-600 text-xs">Package</span>
                        <p className="font-bold text-gray-900">{booking.packageType}</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                        <span className="text-blue-600 text-xs">Amount</span>
                        <p className="font-bold text-gray-900 text-lg">Rs. {booking.amount}</p>
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {booking.status === 'Confirmed' && !booking.tripStarted && (
                          <button
                            onClick={() => handleStartTrip(booking.id)}
                            className="group flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Start Trip
                          </button>
                        )}
                        
                        {booking.status === 'Active' && booking.tripStarted && !booking.tripEnded && (
                          <button
                            onClick={() => handleEndTrip(booking.id)}
                            className="group flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <svg className="w-5 h-5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                            </svg>
                            End Trip
                          </button>
                        )}
                        
                        {booking.status === 'Completed' && booking.tripEnded && (
                          <div className="flex items-center gap-3 text-green-700 text-sm font-bold">
                            <div className="p-2 bg-green-100 rounded-full animate-pulse">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="animate-fade-in">Journey Completed</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-2 rounded-full text-xs font-bold shadow-sm ${
                          booking.paymentMethod === 'online' 
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                            : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {booking.paymentMethod === 'online' ? '💳 Online' : '💵 COD'}
                        </div>
                        
                        <button 
                          onClick={() => window.print()} 
                          className="p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 group"
                          title="Print Receipt"
                        >
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Image Upload Modal */}
      <ImageUploadModal
        isOpen={showImageUpload}
        onClose={closeModal}
        onSubmit={handleImageUploadSubmit}
        title={uploadType === 'start' ? '📸 Start Trip - Upload 4 Fresh Photos' : '📸 End Trip - Upload 4 New Photos'}
        isUploading={isUploading}
        uploadType={uploadType}
        bookingId={currentBookingId}
      />

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes slide-bounce-in {
          0% {
            transform: translateX(100%) scale(0.3);
            opacity: 0;
          }
          50% {
            transform: translateX(-10px) scale(1.05);
          }
          70% {
            transform: translateX(5px) scale(0.98);
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes shrink-width {
          0% { width: 100%; }
          100% { width: 0%; }
        }

        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoom-bounce-in {
          0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes modal-bounce-in {
          0% {
            transform: scale(0.3) translateY(-50px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(10px);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }

        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }

        @keyframes bounce-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes draw-check {
          0% { stroke-dasharray: 0 50; }
          100% { stroke-dasharray: 50 0; }
        }

        @keyframes slide-up-1 {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes slide-up-2 {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes slide-up-3 {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes fade-in-up {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes counter {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes scale-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-slide-bounce-in {
          animation: slide-bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-shrink-width {
          animation: shrink-width 4s linear;
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-zoom-bounce-in {
          animation: zoom-bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-modal-bounce-in {
          animation: modal-bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }

        .animate-bounce-scale {
          animation: bounce-scale 2s infinite;
        }

        .animate-draw-check {
          animation: draw-check 0.8s ease-out;
        }

        .animate-slide-up-1 {
          animation: slide-up-1 0.6s ease-out;
        }

        .animate-slide-up-2 {
          animation: slide-up-2 0.8s ease-out;
        }

        .animate-slide-up-3 {
          animation: slide-up-3 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-counter {
          animation: counter 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
}
