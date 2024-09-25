import React from 'react';
import { Icon } from '@iconify/react';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer id= "footer" className="bg-docsoGreen py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-5">

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Docso Logo" className="h-12 w-12 rounded-full border-2 border-white" />
          </div>
          <p className="text-sm text-gray-300">
            Your trusted partner for all healthcare needs, providing expert medical care and consultations with top professionals.
          </p>
        </div>


        <div className="flex flex-col space-y-4">
          <h2 className="font-bold text-xl text-gray-100">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white hover:underline">Home</a></li>
            <li><a href="/services" className="hover:text-white hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:text-white hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:text-white hover:underline">FAQ</a></li>
          </ul>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="font-bold text-xl text-gray-100">Contact Us</h2>
          <p className="text-sm text-gray-300"> Medical Street, Jhansi</p>
          <p className="text-sm text-gray-300">Phone: (+91) 73930 43751</p>
          <p className="text-sm text-gray-300">Email: support@docso.com</p>

          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <Icon icon="ant-design:facebook-filled" color="white" width="28px" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              <Icon icon="ant-design:twitter-circle-filled" color="white" width="28px" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
              <Icon icon="ant-design:instagram-filled" color="white" width="28px" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700">
              <Icon icon="ant-design:linkedin-filled" color="white" width="28px" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center border-t border-gray-700 pt-5">
        <p className="text-sm text-gray-400">&copy; 2024 Docso. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
