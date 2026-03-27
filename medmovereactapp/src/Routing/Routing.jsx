import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../paging/Homepage';
import RoleSelectRegister from '../pages/RoleSelectRegister';
import RoleSelectLogin from '../pages/RoleSelectLogin';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import ProviderRegister from '../pages/ProviderRegister';
import ProviderLogin from '../pages/ProviderLogin';
import ProviderDashboard from '../pages/ProviderDashboard';
import AddAmbulance from '../pages/AddAmbulance';
import EditAmbulance from '../pages/EditAmbulance';
import SearchResults from '../pages/SearchResults';
import Payment from '../pages/Payment';
import BookingSuccess from '../pages/BookingSuccess';
<<<<<<< HEAD
import AboutUs from '../pages/AboutUs';
=======
>>>>>>> 9b0bb0f6bead8cfb6eccdda495159ed02750951c

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RoleSelectRegister />} />
        <Route path="/login" element={<RoleSelectLogin />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/register/provider" element={<ProviderRegister />} />
        <Route path="/login/provider" element={<ProviderLogin />} />
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/add-ambulance" element={<AddAmbulance />} />
        <Route path="/provider/edit-ambulance/:id" element={<EditAmbulance />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
<<<<<<< HEAD
        <Route path="/about" element={<AboutUs />} />
=======
>>>>>>> 9b0bb0f6bead8cfb6eccdda495159ed02750951c
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;

