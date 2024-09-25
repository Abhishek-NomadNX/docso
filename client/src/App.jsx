import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DoctorRegistrationForm from './pages/DoctorRegistrationPage';
import HospitalRegistrationForm from './pages/HospitalRegistrationPage';
import HospitalProfile from './pages/HospitalInfoPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import DoctorInfo from './pages/DoctorInfoPage';
import HospitalInfo from './pages/HospitalInfoPage';
import SearchResults from './pages/SearchResult';
import LandingPage from './pages/LandingPage';
import CreateCategoryForm from './components/CreateCategoryForm';
import CategoryHospitals from "./pages/CategoryHospitals";

const App = () => {
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const checkCategoryPageAuthentication = () => {
    
    return isAdminAuthenticated; 
  };
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctor-registration" element={<DoctorRegistrationForm />} />
        <Route path="/hospital-registration" element={<HospitalRegistrationForm />} />
        <Route path="/hospital-profile" element={<HospitalProfile />} />
        <Route path="/admin-login" element={<AdminLoginPage setAdminAuthenticated={setAdminAuthenticated} />} />
        <Route path="/admin" element={isAdminAuthenticated ? <AdminPage /> : <Navigate to="/admin-login" />} />
        <Route path="/doctor/:doctorId" element={<DoctorInfo />} />
        <Route path="/hospitals/:id" element={<HospitalInfo />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/create-category" element={checkCategoryPageAuthentication() ? <CreateCategoryForm /> : <Navigate to="/admin-login" />} />
        <Route path="/category/:categoryName" element={<CategoryHospitals />} />
        {/* Redirect to homepage if no matching route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
