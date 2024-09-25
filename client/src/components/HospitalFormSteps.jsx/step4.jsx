import React, { useState } from 'react';
import ProgressBar from '../ProgressBar2'; 
import Navbar from '../Navbar';

const Step4 = ({ formData, handleChange, handleNext, handlePrev }) => {
  const [errors, setErrors] = useState({});
  const [institutionType, setInstitutionType] = useState(formData.institutionType || 'Hospital'); // default to Hospital

  const validateForm = () => {
    const newErrors = {};
    if (!formData.totalDoctorStaff && formData.totalDoctorStaff !== 0) {
      newErrors.totalDoctorStaff = 'Total Doctor Staff is required.';
    }
    if (institutionType === 'Hospital' && (!formData.nursingStaff && formData.nursingStaff !== 0)) {
      newErrors.nursingStaff = 'Nursing Staff is required for hospitals.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  const handleInstitutionTypeChange = (e) => {
    setInstitutionType(e.target.value);
    handleChange(e); // Update formData with institutionType if needed
  };

  return (
    <div className="min-h-screen bg-lightGreen">
      <Navbar showLogin={false} showLogout={false} />
      <ProgressBar step={4} totalSteps={7} />
      <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">

        {/* Institution Type Selection */}
        <div className="mb-6">
          <label className="block text-docsoGreen font-semibold mb-2">Institution Type</label>
          <div>
            <label className="mr-6">
              <input
                type="radio"
                name="institutionType"
                value="Hospital"
                checked={institutionType === 'Hospital'}
                onChange={handleInstitutionTypeChange}
                className="mr-2"
              />
              Hospital
            </label>
            <label>
              <input
                type="radio"
                name="institutionType"
                value="Clinic"
                checked={institutionType === 'Clinic'}
                onChange={handleInstitutionTypeChange}
                className="mr-2"
              />
              Clinic
            </label>
          </div>
        </div>

        {/* Total Doctors */}
        <div className="m-6">
          <label htmlFor="totalDoctorStaff" className="block text-docsoGreen font-semibold mb-2">Total Doctors</label>
          <input
            type="number"
            id="totalDoctorStaff"
            name="totalDoctorStaff"
            placeholder="Enter total doctors"
            value={formData.totalDoctorStaff || ''}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.totalDoctorStaff ? 'border-red-500 focus:ring-red-500' : 'border-middleGreen focus:ring-middleGreen'
            }`}
            required
          />
          {errors.totalDoctorStaff && <p className="text-red-500 text-sm mt-1">{errors.totalDoctorStaff}</p>}
        </div>

        {/* Conditionally render nursing staff input if institution is a hospital */}
        {institutionType === 'Hospital' && (
          <div className="m-6">
            <label htmlFor="nursingStaff" className="block text-docsoGreen font-semibold mb-2">Total Nurses</label>
            <input
              type="number"
              id="nursingStaff"
              name="nursingStaff"
              placeholder="Enter total nurses"
              value={formData.nursingStaff || ''}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.nursingStaff ? 'border-red-500 focus:ring-red-500' : 'border-middleGreen focus:ring-middleGreen'
              }`}
              required
            />
            {errors.nursingStaff && <p className="text-red-500 text-sm mt-1">{errors.nursingStaff}</p>}
          </div>
        )}

        <div className="flex justify-between mt-8">
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
