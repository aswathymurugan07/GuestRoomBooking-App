import './App.css';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import About from './components/About';
import Contact from './components/Contact';
import RoomDetail from './components/RoomDetail';
import Bookingscreen from './screens/Bookingscreen';
import RegisterScreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import HouseownerNavbar from './components/HouseownerNavbar';
import HouseownerRegister from './screens/HouseownerRegister';
import HouseownerLogin from './screens/HouseownerLogin';
import Houseownerscreen from './screens/Houseownerscreen';
import Houseownerroom from './components/Houseownerroom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:id/:fromdate/:todate" element={<Bookingscreen />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/room/:id/:fromdate/:todate" element={<RoomDetail />} />
          <Route path="/bookings" element={<Profilescreen />} />
          <Route path="/houseowner/*" element={<HouseOwnerRoutes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const isHouseownerRoute = location.pathname.startsWith('/houseowner');

  return isHouseownerRoute ? <HouseownerNavbar /> : <Navbar />;
};

const HouseOwnerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="register" element={<HouseownerRegister />} />
      <Route path="login" element={<HouseownerLogin />} />
      <Route path="rooms" element={<Houseownerscreen />} />
      <Route path="roomdetails" element={<Houseownerroom />} />
    </Routes>
  );
};

export default App;
