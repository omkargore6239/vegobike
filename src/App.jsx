// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import SpareParts from "./pages/SpareParts.jsx";
import VehicleServicing from "./pages/VehicleServicing.jsx";
import PurchaseSale from "./pages/PurchaseSale.jsx";
import RentalSearch from "./pages/rental/Search.jsx";
import RentalResults from "./pages/rental/Results.jsx";
import RentalCheckout from "./pages/rental/Checkout.jsx";
import BookingConfirmation from "./pages/rental/BookingConfirmation.jsx";
import BookingHistory from "./pages/rental/BookingHistory.jsx";
import ProfilePage from "./components/profile/ProfilePage.jsx";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          <Header />
          <main role="main" className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rental" element={<RentalSearch />} />
              <Route path="/rental/results" element={<RentalResults />} />
              <Route path="/rental/checkout" element={<RentalCheckout />} />
              <Route path="/rental/booking" element={<BookingConfirmation />} />
              <Route path="/spare-parts" element={<SpareParts />} />
              <Route path="/servicing" element={<VehicleServicing />} />
              <Route path="/purchase-sale" element={<PurchaseSale />} />
              <Route path="/rental/bookings" element={<BookingHistory />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}
