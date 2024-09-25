import React, { useState, useEffect } from 'react';
import ProgressBar from '../ProgressBar';
import { State, City } from 'country-state-city';
import Navbar from '../Navbar';
import MapLocationPicker from '../MapComponent';

const Step3 = ({ formData, handleChange, handleChange2, handleNext, handlePrev }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default center (India)
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
    // if (!formData.hospitalId) newErrors.hospitalId = 'Hospital ID is required.';
    if (!formData.state) newErrors.state = 'State is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.landmark) newErrors.landmark = 'Landmark is required.';

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
            
              {/* Hospital ID
              <div>
                <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700 mb-2">Enter Your Hospital / Clinic Id</label>
                <input
                  type="text"
                  name="hospitalId"
                  placeholder="Hospital / Clinic Unique ID"
                  value={formData.hospitalId}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.hospitalId ? 'border-red-500 focus:ring-red-500' : 'border-green-300 focus:ring-docsoGreen'
                  }`}
                />
                {errors.hospitalId && <p className="text-red-500 text-sm mt-1">{errors.hospitalId}</p>}
              </div> */}

             
              {/* State */}
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

              {/* City */}
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

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.address ? 'border-red-500 focus:ring-red-500' : 'border-green-300 focus:ring-docsoGreen'
                  }`}
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
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.landmark ? 'border-red-500 focus:ring-red-500' : 'border-green-300 focus:ring-docsoGreen'
                  }`}
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
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.pincode ? 'border-red-500 focus:ring-red-500' : 'border-green-300 focus:ring-docsoGreen'
                  }`}
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

          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-docsoGreen"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              className="px-4 py-2 bg-docsoGreen text-white rounded-lg hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-docsoGreen"
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
