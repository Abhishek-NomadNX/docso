import React, { useState, useEffect } from 'react';
import ProgressBar from '../ProgressBar';
import { State, City } from 'country-state-city';
import Navbar from '../Navbar';
import MapLocationPicker from '../MapComponent';

const Step3 = ({ formData, handleChange,handleChange2, handleNext, handlePrev , latitude, longitude, locationText }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [errors, setErrors] = useState({});
  
  // Fetch states of India when component mounts
  useEffect(() => {
    const indianStates = State.getStatesOfCountry('IN');
    setStates(indianStates);
  }, []);

  // Fetch cities for the selected state
  useEffect(() => {
    if (selectedState) {
      const stateCities = City.getCitiesOfState('IN', selectedState);
      setCities(stateCities);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  // Update map center based on selected city
  useEffect(() => {
    if (selectedCity) {
      const city = cities.find(c => c.name === selectedCity);
      if (city) {
        setMapCenter({ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) });
      }
    }
  }, [selectedCity, cities]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.hospitalId) newErrors.hospitalId = 'Hospital ID is required.';
    if (!formData.establishmentName) newErrors.establishmentName = 'Establishment name is required.';
    if (!formData.state) newErrors.state = 'State is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.landmark) newErrors.landmark = 'Landmark is required.';
    if (!formData.pincode) {
      newErrors.pincode = "pincode is required.";
    } else if (
      !/^\d{6}$/.test(formData.pincode)  // Check if it's a 4-digit number
    ){
      newErrors.pincode = "Enter valid pincode.";
    }
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next button click
  const handleNextClick = () => {
    if (validateForm()) {
      handleNext();
      console.log('Current formData:', formData);
    }
  };

  

  return (
    <div>
    <Navbar showLogin={false} showLogout={false} showOther={false} />
    <ProgressBar step={3} totalSteps={8} />
    <div className="w-full min-h-screen bg-lightGreen flex items-center justify-center rounded-lg shadow-md">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-middleGreen text-left p-3">Establishment Basic Details</h3>
        <div className="min-w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-6 space-y-4 text-left">
            {/* Hospital ID */}
            <div>
              <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700 mb-2">Enter Your Hospital Id</label>
              <input
                type="text"
                name="hospitalId"
                placeholder="Hospital Unique ID"
                value={formData.hospitalId}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
              {errors.hospitalId && <p className="text-red-500 text-sm mt-1">{errors.hospitalId}</p>}
            </div>
  
            {/* Establishment Name */}
            <div>
              <label htmlFor="establishmentName" className="block text-sm font-medium text-gray-700 mb-2">Enter Name of Establishment</label>
              <input
                type="text"
                name="establishmentName"
                placeholder="Establishment Name"
                value={formData.establishmentName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
              {errors.establishmentName && <p className="text-red-500 text-sm mt-1">{errors.establishmentName}</p>}
            </div>
  
            {/* State & City */}
            <div className="mb-4">
              <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedState(e.target.value);
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.state ? 'border-red-500 focus:ring-red-500' : 'border-green-300 focus:ring-docsoGreen'
                }`}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
  
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">City</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedCity(e.target.value);
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.city ? 'border-red-500 focus:ring-red-500' : 'border-green-300 focus:ring-docsoGreen'
                }`}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
  
            {/* Address Fields */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
  
            {/* Landmark */}
            <div>
              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-2">Landmark
              <span className='text-xs text-gray-600  font-normal'> ( Pin exact location after entering landmark... )
              </span>  
                 </label>
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
              {errors.landmark && <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>}
            </div>
  
            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>
          </div>
  
          {/* Map Section */}
          <div className=" lg:w-1/2 p-6 flex flex-col items-center justify-center overflow-auto">
  <div className=" w-full h-[200px] sm:h-[400px] lg:h-full border border-gray-300 rounded-lg shadow-lg">
    <MapLocationPicker
      landmark={formData.landmark}
      city={formData.city}
      handleChange={handleChange2}
    />
  </div>
</div>

        </div>
  
        <div className="flex min-w-full justify-between items-center py-4 px-8 bg-white border-t border-gray-200">
          <button
            onClick={handlePrev}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
          >
            Previous
          </button>
  
          <button
            onClick={handleNextClick}
            className="bg-middleGreen text-white px-6 py-2 rounded-md hover:bg-middleGreen"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Step3;