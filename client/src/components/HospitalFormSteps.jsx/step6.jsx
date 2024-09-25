import React from 'react';
import Navbar from '../Navbar';
import ProgressBar from '../ProgressBar2'; 

const Step6 = ({ formData, handleChange, handleNext, handlePrev }) => (
  <div className="min-h-screen bg-lightGreen">
    <Navbar showLogin={false} showLogout={false} />
    <ProgressBar step={6} totalSteps={7} />
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-docsoGreen mb-6">Insurance Claim Information</h2>
      <p className="text-gray-700 mb-8">
        Please let us know if insurance claims are available for the services provided by your hospital.
        This information will help us ensure that patients can receive the necessary assistance and coverage.
      </p>
      
      <div className="mb-8">
        <label className="block text-docsoGreen font-semibold mb-4">Is insurance claim available?</label>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="insuranceClaimYes"
            name="insuranceClaim"
            value="yes"
            checked={formData.insuranceClaim === 'yes'}
            onChange={handleChange}
            className="mr-3"
            required
          />
          <label htmlFor="insuranceClaimYes" className="text-gray-700">Yes</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="insuranceClaimNo"
            name="insuranceClaim"
            value="no"
            checked={formData.insuranceClaim === 'no'}
            onChange={handleChange}
            className="mr-3"
            required
          />
          <label htmlFor="insuranceClaimNo" className="text-gray-700">No</label>
        </div>
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
          onClick={handleNext}
          className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:middleGreen focus:outline-none focus:ring-2 focus:ring-middleGreen"
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

export default Step6;
