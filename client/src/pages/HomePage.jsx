import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showSearch={false} showOther={true} />
      <div className="flex flex-1 flex-col items-center justify-center bg-lightGreen py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-docsoGreen mb-8 text-center">Welcome to Docso</h1>
        
        <div className="flex flex-col md:flex-row items-center justify-around w-full max-w-5xl">
          <div className="bg-white shadow-xl rounded-lg p-8 m-4 w-full md:w-2/5 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col items-center">
              <img src="https://img.icons8.com/color/96/000000/doctor-male.png" alt="Doctor" className="mb-4 w-24 h-24" />
              <h2 className="text-2xl font-semibold text-indigo-800 text-center mb-4">Are you a Doctor?</h2>
              <p className="text-gray-600 text-center">Join our network to provide expert healthcare to patients around the world.</p>
              <div className="mt-4 flex space-x-4">
                <button className="bg-docsoGreen text-white px-4 py-2 rounded hover:bg-middleGreen transition-colors duration-200" onClick={() => navigate('/doctor-registration')}>Register As a Doctor</button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-lg p-8 m-4 w-full md:w-2/5 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col items-center">
              <img src="https://img.icons8.com/color/96/000000/hospital-room.png" alt="Hospital" className="mb-4 w-24 h-24" />
              <h2 className="text-2xl font-semibold text-indigo-800 text-center mb-4">Are you a Hospital / Clinic?</h2>
              <p className="text-gray-600 text-center">Partner with us to bring top-notch medical services to more people.</p>
              <div className="mt-4 flex space-x-4">
                <button className="bg-docsoGreen text-white px-4 py-2 rounded hover:bg-middleGreen transition-colors duration-200" onClick={() => navigate('/hospital-registration')}>Register As a Hospital / Clinic</button>
              </div>
            </div>
          </div>
        </div>

      
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
