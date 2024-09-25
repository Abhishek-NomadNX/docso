import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Header } from "../components/Header";
import { Services } from '../components/Services';
import JsonData from "../data/data.json";
import "../App.css";
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import HospitalCard from '../components/HospitalCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

function Landingpage() {
  const [landingPageData, setLandingPageData] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch categories from your backend
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/categories/get-six-categories`);
      const data = await response.json();
      setCategories(data); // Set fetched categories to state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/doctors/all`);
        console.log('Doctors API response:', response.data); 
        setDoctors(Array.isArray(response.data) ? response.data.filter(doctor => doctor.isApproved).slice(0, 10) : []); 
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/hospitals/all-hospitals`);
        setHospitals(Array.isArray(response.data) ? response.data.slice(0, 10) : []); 
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    // Call functions to fetch data
    fetchDoctors();
    fetchHospitals();
    fetchCategories(); // Move this here, inside the useEffect

    // Load local JSON data
    setLandingPageData(JsonData);
  }, []);

  const getSliderSettings = (items) => {
    const slidesToShow = items.length < 3 ? items.length : 3;
    return {
      dots: items.length > 1,
      infinite: items.length > 1,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      centerMode: false, 
      centerPadding: '0',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: items.length < 2 ? items.length : 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false, 
          },
        },
      ],
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">
      <Navbar showOther={true} showR={true}  />
      <Header data={landingPageData.header} />
      <Services data={categories} />
      
      
      {/* Doctor and Hospital Section */}
      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <h2 className="text-4xl sm:text-3xl text-center font-bold text-docsoGreen m-16 border-b border-gray-300">MEET OUR DOCTORS</h2>
        {doctors.length > 0 ? (
          <Slider {...getSliderSettings(doctors)}>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600">No doctors available</p>
        )}

        <h2 className="text-4xl sm:text-3xl text-center font-bold text-docsoGreen mt-16 m-10 border-b border-gray-300">OUR REGISTERED HOSPITALS</h2>
        {hospitals.length > 0 ? (
          <Slider {...getSliderSettings(hospitals)}>
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital._id} hospital={hospital} />
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600">No hospitals available</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Landingpage;
