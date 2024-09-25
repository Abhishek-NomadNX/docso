import React, { useState } from 'react';
import ProgressBar from '../ProgressBar';
import Navbar from '../Navbar';
import { doctorColleges } from '../../utils/doctorColleges.js';
import { doctorDegrees } from '../../utils/doctorDegrees.js';

const Step2 = ({ formData, handleChange, handleNext, handlePrev, setFormData }) => {
  const [isDegreeOther, setIsDegreeOther] = useState(formData.degree === 'Others');
  const [isCollegeOther, setIsCollegeOther] = useState(formData.college === 'Others');
  const [selectedDegrees, setSelectedDegrees] = useState(formData.degree || []);
  const [otherDegree, setOtherDegree] = useState('');
  const [errors, setErrors] = useState({});

  const handleDegreeSelect = (degree) => {
    if (degree === "Others") {
      setIsDegreeOther(true);
    } else if (!selectedDegrees.includes(degree)) {
      const updatedDegrees = [...selectedDegrees, degree];
      setSelectedDegrees(updatedDegrees);
      setFormData((prevData) => ({ ...prevData, degree: updatedDegrees }));
    }
  };

  const handleOtherDegreeSubmit = () => {
    if (otherDegree && !selectedDegrees.includes(otherDegree)) {
      const updatedDegrees = [...selectedDegrees, otherDegree];
      setSelectedDegrees(updatedDegrees);
      setFormData({ ...formData, degree: updatedDegrees });
    }
    setIsDegreeOther(false);
    setOtherDegree('');
  };

  const removeDegree = (index) => {
    const updatedDegrees = selectedDegrees.filter((_, i) => i !== index);
    setSelectedDegrees(updatedDegrees);
    setFormData({ ...formData, degree: updatedDegrees });
  };

  const handleCollegeChange = (e) => {
    const value = e.target.value;
    setIsCollegeOther(value === 'Others');
    handleChange(e);
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedDegrees.length === 0) newErrors.degree = 'Degree is required.';
    if (isDegreeOther && !otherDegree) newErrors.otherDegree = 'Other Degree is required.';
    if (!formData.college) newErrors.college = 'College is required.';
    if (isCollegeOther && !formData.otherCollege) newErrors.otherCollege = 'Other College is required.';
    if (!formData.completionYear) {
      newErrors.completionYear = "Completion Year is required.";
    } else if (
      !/^\d{4}$/.test(formData.completionYear) || // Check if it's a 4-digit number
      parseInt(formData.completionYear) < 1900 || // Add a reasonable year range
      parseInt(formData.completionYear) > new Date().getFullYear()
    ) {
      newErrors.completionYear= "Completion Year must be a valid year.";
    }
    if (!formData.experience) {newErrors.experience = 'Experience is required.';}
    else if (parseInt(formData.experience)>100){
      newErrors.experience = 'Enter valid range.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  return (
    <div>
      <Navbar showLogin={false} showLogout={false} showOther={false} />
      <ProgressBar step={2} totalSteps={8} />
      <div className="w-full min-h-screen bg-lightGreen flex items-center justify-center rounded-lg shadow-md">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-middleGreen text-left p-3">
            Educational Qualification
          </h3>

          <div className="space-y-4 text-left p-6">
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Degree
              </label>
              <select
                id="degree"
                name="degree"
                onChange={(e) => handleDegreeSelect(e.target.value)}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.degree ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-middleGreen'
                }`}
              >
                <option value="">Select Degree</option>
                {doctorDegrees.map((degree, index) => (
                  <option key={index} value={degree}>
                    {degree}
                  </option>
                ))}
                <option value="Others">Others</option>
              </select>
              {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}

              <div className="flex flex-wrap mb-2 mt-2">
                {selectedDegrees.map((degree, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 m-1 text-sm font-semibold bg-lightGreen text-middleGreen rounded-full shadow-sm"
                  >
                    {degree}
                    <button
                      type="button"
                      onClick={() => removeDegree(index)}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {isDegreeOther && (
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={otherDegree}
                    onChange={(e) => setOtherDegree(e.target.value)}
                    placeholder="Specify Degree"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen flex-grow mr-2"
                  />
                  <button
                    type="button"
                    onClick={handleOtherDegreeSubmit}
                    className="px-4 py-2 bg-middleGreen text-white rounded-md shadow-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>


        <div>
          <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-2">
            Select Your College
          </label>
          <select
            id="college"
            name="college"
            value={formData.college}
            onChange={handleCollegeChange}
            required
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
              errors.college ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-middleGreen'
            }`}
          >
            <option value="">Select College</option>
            {doctorColleges.map((college, index) => (
              <option key={index} value={college}>
                {college}
              </option>
            ))}
            <option value="Others">Others</option>
          </select>
          {errors.college && <p className="text-red-500 text-sm mt-1">{errors.college}</p>}
          {isCollegeOther && (
            <div className="mt-2">
              <label htmlFor="otherCollege" className="block text-sm font-medium text-gray-700 mb-2">
                Specify College
              </label>
              <input
                type="text"
                id="otherCollege"
                name="otherCollege"
                placeholder="Specify College"
                value={formData.otherCollege || ''}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.otherCollege ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-middleGreen'
                }`}
              />
              {errors.otherCollege && <p className="text-red-500 text-sm mt-1">{errors.otherCollege}</p>}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="completionYear" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Completion Year
          </label>
          <input
            type="text"
            id="completionYear"
            name="completionYear"
            placeholder="Completion Year"
            value={formData.completionYear}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
              errors.completionYear ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-middleGreen'
            }`}
          />
          {errors.completionYear && <p className="text-red-500 text-sm mt-1">{errors.completionYear}</p>}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Experience (in years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            placeholder="Experience (in years)"
            value={formData.experience}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
              errors.experience ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-middleGreen'
            }`}
          />
          {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
        </div>
      </div>

      <div className="mt-6 flex space-x-2 justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="bg-gray-400 text-white px-6 mb-7  py-2 ml-6 rounded-md hover:bg-gray-500 transition duration-300"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="bg-docsoGreen text-white px-6 mb-7  py-2 mr-6 rounded-md hover:bg-middleGreen transition duration-300"
        >
          Save and go to the Next Section
        </button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Step2;
