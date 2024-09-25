import React from 'react';
import { useState } from 'react';
import Navbar from '../Navbar';
import ProgressBar from '../ProgressBar2'; 

const Step7 = ({ formData, handleChange, handleSubmit, handlePrev }) => {
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // Phone number validation (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.contactDetails)) {
      newErrors.contactDetails = 'Phone number must be 10 digits.';
    }
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    if (validateForm()) {
      handleSubmit(e); // Call handleSubmit to proceed with form submission
    }
  };


  return(
  <div className="min-h-screen bg-lightGreen">
    <Navbar showLogin={false} showLogout={false} />
    <ProgressBar step={7} totalSteps={7} />
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
     

      <h2 className="text-2xl font-bold text-docsoGreen mb-6">Final Step: Contact Information</h2>
      <p className="text-gray-700 mb-8">
        Please provide the contact details for the hospital. This information will be used for further communication and inquiries.
      </p>
      
      <div className="mb-8">
        <label htmlFor="contactDetails" className="block text-docsoGreen font-semibold mb-4">Phone Number</label>
        <input
          type="phone"
          id="contactDetails"
          name="contactDetails"
          placeholder="Enter phone number"
          value={formData.contactDetails}
          onChange={handleChange}
          className={`w-full p-3 border ${errors.contactDetails ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
              />
               {errors.contactDetails && <p className="text-red-500 text-sm mt-1">{errors.contactDetails}</p>}
          
      </div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={handlePrev}
          className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-middleGreen"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-middleGreen"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)};

export default Step7;
