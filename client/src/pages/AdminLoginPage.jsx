import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = ({ setAdminAuthenticated }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') { 
      setAdminAuthenticated(true);
      navigate('/admin');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
      <h1 className="text-3xl font-semibold text-middleGreen mb-6 text-center">
        Admin Login
      </h1>
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-middleGreen"
      />
      
      <button
        onClick={handleLogin}
        className="w-full bg-docsoGreen text-white py-3 rounded-lg hover:bg-middleGreen transition duration-300"
      >
        Login
      </button>
    </div>
  </div>
  );
};

export default AdminLoginPage;
