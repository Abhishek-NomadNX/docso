import React from "react";
import { useNavigate } from 'react-router-dom';

export const Header = (props) => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/home');
  };

  return (
    <header id="header" className="relative bg-cover bg-center h-screen w-full overflow-hidden">
      <div className="intro h-full flex items-center justify-center">
        <div className="overlay bg-opacity-50 absolute inset-0 bg-black"></div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <div className="intro-text text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {props.data ? props.data.title : "Loading"}
            </h1>
            <p className="text-lg md:text-xl">
              {props.data ? props.data.paragraph : "Loading"}
            </p>
            <button
              className="mt-8 px-6 py-3 text-lg font-semibold bg-docsoGreen hover:bg-darkGreen text-white rounded-full transition duration-300"
              onClick={handleRegisterClick}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};