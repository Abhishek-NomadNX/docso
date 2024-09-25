import React from 'react';
import Navbar from '../Navbar';
import ProgressBar from '../ProgressBar';

const Step8 = ({ formData, handleChange, handlePrev }) => (
  <div className="min-h-screen flex flex-col bg-lightGreen">
    <Navbar showLogin={false} showLogout={false} showOther={false} />
    <div className="flex-1 flex flex-col items-center">
      <ProgressBar step={8} totalSteps={8} />
      
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg mt-8">
        <h3 className="text-2xl font-semibold text-middleGreen mb-6 text-center">
          Consultancy Fees
        </h3>
        
        <p className="text-gray-700 mb-4 text-center">
          Please enter your consultancy fees. This will help patients understand the cost of your services upfront.
        </p>

        <div className="space-y-4 text-left w-full max-w-md mx-auto">
          <div>
            <label htmlFor="consultancyFees" className="block text-sm font-medium text-gray-700 mb-2">
              Consultancy Fees (in Rupees)
            </label>
            <input
              type="text"
              id="consultancyFees"
              name="consultancyFees"
              placeholder="Enter your consultancy fees"
              value={formData.consultancyFees}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
            />
          </div>
        </div>

        <div className="mt-6 flex  justify-between w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-docsoGreen text-white px-6 py-2 rounded-md hover:bg-middleGreen transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Step8;
